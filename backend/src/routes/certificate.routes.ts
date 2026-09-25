import { Router } from "express";
import { supabase } from "../config/supabase";
import { issueBlockchainCertificate } from "../services/certificateIntegrationService";

const router = Router();

router.post("/issue", async (req, res) => {
  try {
    const { userId, courseId, assessmentId, verificationCode, studentName } = req.body;

    if (!userId || !courseId || !assessmentId) {
      return res.status(400).json({
        error: "userId, courseId, and assessmentId are required",
      });
    }

    if (studentName && typeof studentName === "string" && studentName.trim()) {
      await supabase.from("users").update({ name: studentName.trim() }).eq("id", userId);
    }

    const code = verificationCode || `BLX-${Date.now()}`;
    const result = await issueBlockchainCertificate(
      userId,
      courseId,
      assessmentId,
      code
    );

    return res.json(result);
  } catch (error) {
    console.error("Certificate issuance error:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Certificate issuance failed",
    });
  }
});

router.post("/update-name", async (req, res) => {
  try {
    const { userId, certificateId, studentName } = req.body;

    if (!studentName || typeof studentName !== "string" || !studentName.trim()) {
      return res.status(400).json({ error: "Student name is required" });
    }

    const trimmedName = studentName.trim();

    if (userId) {
      await supabase.from("users").update({ name: trimmedName }).eq("id", userId);
    }

    if (certificateId) {
      const fs = await import("fs/promises");
      const path = await import("path");
      const safeCertificateId = String(certificateId).replace(/[^a-zA-Z0-9-_]/g, "_");
      const generatedPath = path.join(process.cwd(), "generated", "certificates", `${safeCertificateId}.svg`);
      try {
        await fs.unlink(generatedPath);
      } catch {
        // file didn't exist or already removed
      }
    }

    return res.json({
      success: true,
      studentName: trimmedName,
      message: "Student name updated successfully",
    });
  } catch (error) {
    console.error("Error updating certificate student name:", error);
    return res.status(500).json({ error: "Failed to update student name" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from("certificates")
      .select("*, courses(*)")
      .eq("user_id", userId)
      .order("issued_at", { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json(data || []);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch user certificates" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from("certificates")
      .select("*, courses(*)")
      .eq("user_id", userId)
      .order("issued_at", { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json(data || []);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch user certificates" });
  }
});

router.get("/verify/:certificateId", async (req, res) => {
  try {
    const { certificateId } = req.params;

    if (!certificateId) {
      return res.status(400).json({
        error: "Certificate ID is required",
      });
    }

    const { data, error } = await supabase
      .from("certificates")
      .select(`
        id,
        user_id,
        course_id,
        certificate_id,
        token_id,
        metadata_cid,
        certificate_cid,
        tx_hash,
        issued_at
      `)
      .eq("certificate_id", certificateId)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    if (!data) {
      return res.status(404).json({
        valid: false,
        message: "Certificate not found",
      });
    }

    return res.json({
      valid: true,
      certificate: data,
    });
  } catch (error) {
    console.error("Certificate verification error:", error);

    return res.status(500).json({
      error: "Certificate verification failed",
    });
  }
});

router.get(["/svg/:certificateId", "/:certificateId/svg"], async (req, res) => {
  try {
    const rawCertId = req.params.certificateId;

    if (!rawCertId) {
      return res.status(400).send("Certificate ID is required");
    }

    const certificateId = Array.isArray(rawCertId) ? rawCertId[0] : String(rawCertId);
    const customName = typeof req.query.name === "string" && req.query.name.trim() 
      ? req.query.name.trim() 
      : typeof req.query.studentName === "string" && req.query.studentName.trim()
      ? req.query.studentName.trim()
      : null;
    const forceRefresh = req.query.refresh === "true" || !!customName;

    const fs = await import("fs/promises");
    const path = await import("path");
    const { generateCertificate } = await import("../services/certificateGeneratorService");
    const { generateQRCodeDataURI } = await import("../services/qrService");

    const safeCertificateId = certificateId.replace(/[^a-zA-Z0-9-_]/g, "_");
    const generatedPath = path.join(process.cwd(), "generated", "certificates", `${safeCertificateId}.svg`);

    // Check if SVG already exists on disk (unless forceRefresh is true)
    if (!forceRefresh) {
      try {
        const svgOnDisk = await fs.readFile(generatedPath, "utf-8");
        res.setHeader("Content-Type", "image/svg+xml");
        return res.send(svgOnDisk);
      } catch {
        // SVG file not on disk, fetch database details to generate
      }
    }

    // Query database for certificate record by certificate_id, id, or token_id
    let { data: cert, error: certError } = await supabase
      .from("certificates")
      .select("*, courses(*)")
      .or(`certificate_id.eq.${certificateId},id.eq.${certificateId},token_id.eq.${certificateId}`)
      .maybeSingle();

    if (!cert) {
      // Fallback: search by user_id or course_id
      const { data: altCert } = await supabase
        .from("certificates")
        .select("*, courses(*)")
        .or(`user_id.eq.${certificateId},course_id.eq.${certificateId}`)
        .order("issued_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      cert = altCert;
    }

    let studentName = customName || "Learner";
    let courseName = "BlockLearnX Course";
    let score = 100;
    let code = cert?.certificate_id || certificateId;
    let tokenId = cert?.token_id || "1";
    let txHash = cert?.tx_hash || "0x7fe6ff2b8d9a052573c522152258016a232e977842212ca0745af01b1a8e5ad1";
    let dateStr = cert?.issued_at ? new Date(cert.issued_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
    let contractAddress = "0x4573664Fb1a4caB09e870d5A6af3afEcFcCD3eC1";

    if (cert) {
      if (cert.courses?.title) {
        courseName = cert.courses.title;
      }
      if (cert.user_id && !customName) {
        const { data: user } = await supabase.from("users").select("name").eq("id", cert.user_id).maybeSingle();
        if (user?.name) studentName = user.name;
      }
      if (cert.course_id && cert.user_id) {
        const { data: assessment } = await supabase
          .from("assessments")
          .select("score")
          .eq("user_id", cert.user_id)
          .eq("course_id", cert.course_id)
          .order("evaluated_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (assessment?.score != null) score = Number(assessment.score);
      }
    } else {
      // If no certificate row, check if course exists
      const { data: course } = await supabase.from("courses").select("title").eq("id", certificateId).maybeSingle();
      if (course?.title) courseName = course.title;

      // Try fetching learner default name if customName is not provided
      if (!customName) {
        const { data: users } = await supabase.from("users").select("name").eq("role", "learner").limit(1).maybeSingle();
        if (users?.name) studentName = users.name;
      }
    }

    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
    const verificationURL = `${frontendURL}/verify/certificate/${encodeURIComponent(code)}`;
    const qrCodeDataURI = await generateQRCodeDataURI(verificationURL);

    const svgPath = await generateCertificate({
      studentName,
      courseName,
      score,
      certificateId: code,
      completionDate: dateStr,
      tokenId,
      contractAddress,
      blockchain: "Ethereum Sepolia",
      transactionHash: txHash,
      metadataURI: cert?.metadata_cid ? `ipfs://${cert.metadata_cid}` : verificationURL,
      certificateURI: cert?.certificate_cid ? `ipfs://${cert.certificate_cid}` : verificationURL,
      verificationURL,
      qrCodeDataURI,
    });

    const newSvg = await fs.readFile(svgPath, "utf-8");
    res.setHeader("Content-Type", "image/svg+xml");
    return res.send(newSvg);
  } catch (error) {
    console.error("Failed to render/generate certificate SVG:", error);
    return res.status(500).send("Certificate SVG generation error");
  }
});

export default router;