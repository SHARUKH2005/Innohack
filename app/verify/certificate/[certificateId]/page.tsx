interface CertificatePageProps {
  params: Promise<{
    certificateId: string;
  }>;
}

interface CertificateData {
  id: string;
  user_id: string;
  course_id: string;
  certificate_id: string;
  token_id: string;
  metadata_cid: string;
  certificate_cid: string;
  tx_hash: string;
  issued_at: string;
}

interface VerificationResponse {
  valid: boolean;
  certificate?: CertificateData;
  message?: string;
}

export default async function CertificateVerificationPage({
  params,
}: CertificatePageProps) {
  const { certificateId } = await params;

  const backendURL =
    process.env.BACKEND_URL || "http://localhost:5000";

  let result: VerificationResponse;

  try {
    const response = await fetch(
      `${backendURL}/api/certificates/verify/${encodeURIComponent(
        certificateId
      )}`,
      {
        cache: "no-store",
      }
    );

    result = await response.json();
  } catch {
    result = {
      valid: false,
      message: "Unable to connect to certificate verification service.",
    };
  }

  if (!result.valid || !result.certificate) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl rounded-2xl border border-red-500/30 bg-slate-900 p-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Certificate Not Found
          </h1>

          <p className="mt-4 text-slate-400">
            {result.message ||
              "This certificate could not be verified."}
          </p>

          <p className="mt-6 break-all font-mono text-sm text-slate-500">
            {certificateId}
          </p>
        </div>
      </main>
    );
  }

  const certificate = result.certificate;

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="text-center">
          <p className="text-sm font-medium tracking-widest text-emerald-400 uppercase">
            BlockLearnX
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white">
            Certificate Verified
          </h1>

          <p className="mt-2 text-slate-400">
            This certificate exists in the BlockLearnX certificate registry.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6">
          <p className="text-sm text-slate-400">
            Certificate ID
          </p>

          <p className="mt-2 break-all font-mono text-lg text-white">
            {certificate.certificate_id}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-slate-800 p-5">
            <p className="text-sm text-slate-400">
              Token ID
            </p>
            <p className="mt-2 font-mono text-white">
              #{certificate.token_id}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <p className="text-sm text-slate-400">
              Blockchain
            </p>
            <p className="mt-2 font-semibold text-white">
              Ethereum Sepolia
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-5 md:col-span-2">
            <p className="text-sm text-slate-400">
              Transaction Hash
            </p>
            <p className="mt-2 break-all font-mono text-sm text-white">
              {certificate.tx_hash}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <p className="text-sm text-slate-400">
              Metadata CID
            </p>
            <p className="mt-2 break-all font-mono text-sm text-white">
              {certificate.metadata_cid}
            </p>
          </div>

          <div className="rounded-xl bg-slate-800 p-5">
            <p className="text-sm text-slate-400">
              Certificate CID
            </p>
            <p className="mt-2 break-all font-mono text-sm text-white">
              {certificate.certificate_cid}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <span className="inline-flex rounded-full bg-emerald-500/15 px-5 py-2 text-sm font-semibold text-emerald-400">
            ✓ Blockchain Certificate Verified
          </span>
        </div>
      </div>
    </main>
  );
}
