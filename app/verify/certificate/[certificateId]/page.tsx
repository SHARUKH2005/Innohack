"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Download, ExternalLink, Edit3, ArrowLeft, RefreshCw, Check } from "lucide-react";

interface CertificateVerificationPageProps {
  params: Promise<{
    certificateId: string;
  }>;
}

export default function CertificateVerificationPage({ params }: CertificateVerificationPageProps) {
  const [certCode, setCertCode] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [certificate, setCertificate] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [studentName, setStudentName] = useState("Sharukh Sameer");
  const [updatingName, setUpdatingName] = useState(false);
  const [nameUpdatedSuccess, setNameUpdatedSuccess] = useState(false);
  const [svgVersion, setSvgVersion] = useState(Date.now());

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    async function init() {
      const resolvedParams = await params;
      const id = resolvedParams.certificateId;
      setCertCode(id);

      try {
        const response = await fetch(`${BACKEND_URL}/api/certificates/verify/${encodeURIComponent(id)}`, { cache: "no-store" });
        const resData = await response.json();

        if (response.ok && resData.valid) {
          setValid(true);
          setCertificate(resData.certificate);
          if (resData.certificate?.user_id) {
            try {
              const uRes = await fetch(`${BACKEND_URL}/api/users`);
              if (uRes.ok) {
                const users = await uRes.json();
                const u = users.find((usr: any) => usr.id === resData.certificate.user_id);
                if (u?.name) setStudentName(u.name);
              }
            } catch (e) {
              console.error("User name fetch error:", e);
            }
          }
        } else {
          setValid(false);
          setErrorMsg(resData.message || "This certificate could not be verified in the registry.");
        }
      } catch (err) {
        setValid(false);
        setErrorMsg("Unable to connect to certificate verification service.");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [params]);

  const handleUpdateName = async () => {
    const enteredName = prompt("Enter your full name for this official certificate:", studentName);
    if (!enteredName || !enteredName.trim()) return;

    const trimmed = enteredName.trim();
    setStudentName(trimmed);
    setUpdatingName(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/certificates/update-name`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: certificate?.user_id,
          certificateId: certCode,
          studentName: trimmed,
        }),
      });

      if (res.ok) {
        setNameUpdatedSuccess(true);
        setSvgVersion(Date.now());
        setTimeout(() => setNameUpdatedSuccess(false), 3000);
      }
    } catch (e) {
      console.error("Failed to update certificate name:", e);
    } finally {
      setUpdatingName(false);
    }
  };

  const svgUrl = `${BACKEND_URL}/api/certificates/svg/${encodeURIComponent(certCode)}?v=${svgVersion}&name=${encodeURIComponent(studentName)}`;

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mb-3" />
        <p className="text-sm font-semibold text-slate-400">Verifying Blockchain Credential...</p>
      </main>
    );
  }

  if (!valid || !certificate) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-xl rounded-2xl border border-red-500/30 bg-slate-900 p-8 text-center shadow-2xl">
          <h1 className="text-3xl font-bold text-white">Certificate Not Found</h1>
          <p className="mt-4 text-slate-400">{errorMsg || "This certificate could not be verified."}</p>
          <p className="mt-6 break-all font-mono text-sm text-slate-500">{certCode}</p>
          <Link href="/nfts" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Return to NFT Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 py-12">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
        
        <div className="flex items-center justify-between">
          <Link href="/nfts" className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to collection
          </Link>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            ✓ Blockchain Verified
          </span>
        </div>

        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
            BlockLearnX Official Protocol
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-black text-white tracking-tight">
            Verified Blockchain Certificate
          </h1>
          <p className="mt-2 text-slate-400 text-sm max-w-lg mx-auto">
            Issued to <strong className="text-white">{studentName}</strong> • Cryptographically anchored on Ethereum Sepolia.
          </p>
        </div>

        {/* Real Vector SVG Certificate Container */}
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-2xl text-center group">
          <img
            src={svgUrl}
            alt="BlockLearnX Verified Certificate"
            className="w-full h-auto max-h-[540px] object-contain mx-auto"
          />

          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleUpdateName}
              disabled={updatingName}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 shadow-md transition-all"
            >
              {updatingName ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Edit3 className="h-4 w-4" />}
              {nameUpdatedSuccess ? "✓ Name Updated!" : "Generate with My Name"}
            </button>

            <a
              href={svgUrl}
              download={`BlockLearnX-Certificate-${studentName.replace(/\s+/g, "_")}.svg`}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 shadow-md transition-all"
            >
              <Download className="h-4 w-4" /> Download SVG Certificate
            </a>

            <a
              href={`https://sepolia.etherscan.io/tx/${certificate.tx_hash}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-2.5 transition-all"
            >
              Sepolia Etherscan <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Certificate Metadata Grid */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
            Verification Code / Certificate ID
          </p>
          <p className="mt-1 break-all font-mono text-lg font-bold text-white">
            {certificate.certificate_id}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 text-xs">
          <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-800">
            <p className="text-slate-400 font-medium">Student Name</p>
            <p className="mt-1 font-bold text-white text-base">{studentName}</p>
          </div>

          <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-800">
            <p className="text-slate-400 font-medium">Token ID</p>
            <p className="mt-1 font-mono font-bold text-emerald-400 text-base">#{certificate.token_id}</p>
          </div>

          <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-800 md:col-span-2">
            <p className="text-slate-400 font-medium">Transaction Hash</p>
            <p className="mt-1 break-all font-mono text-emerald-300 text-xs">{certificate.tx_hash}</p>
          </div>

          <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-800">
            <p className="text-slate-400 font-medium">Metadata CID</p>
            <p className="mt-1 break-all font-mono text-white text-xs">{certificate.metadata_cid}</p>
          </div>

          <div className="rounded-xl bg-slate-800/80 p-4 border border-slate-800">
            <p className="text-slate-400 font-medium">Certificate SVG CID</p>
            <p className="mt-1 break-all font-mono text-white text-xs">{certificate.certificate_cid}</p>
          </div>
        </div>

      </div>
    </main>
  );
}


