import { Router } from "express";
import { supabase } from "../config/supabase";

const router = Router();

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

export default router;