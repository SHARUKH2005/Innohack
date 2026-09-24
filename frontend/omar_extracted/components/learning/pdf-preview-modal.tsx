"use client";

import { useState } from "react";
import { X, Download, FileText, ExternalLink, ChevronLeft, ChevronRight, Check, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonResource } from "@/lib/learning-data";

interface PdfPreviewModalProps {
  resource: LessonResource | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PdfPreviewModal({ resource, isOpen, onClose }: PdfPreviewModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [downloaded, setDownloaded] = useState(false);
  const totalPages = 4;

  if (!isOpen || !resource) return null;

  const handleDownload = () => {
    setDownloaded(true);
    // Simulate real download
    const blob = new Blob(
      [
        `BlockLearnX Web3 Education Protocol - Document: ${resource.title}\n\n` +
        `Description: ${resource.description}\n` +
        `Cryptographic Verification: SHA-256 Verified\n` +
        `Date Generated: ${new Date().toLocaleDateString()}\n\n` +
        `Contents:\n1. Core Concepts & Architecture\n2. Syntax & Opcodes Reference\n3. Security & CEI Guidelines\n4. Verified Exercises`
      ],
      { type: "application/pdf" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = resource.title.replace(/\s+/g, "_");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full flex flex-col h-[85vh] overflow-hidden">
        
        {/* Header bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/30 shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm sm:text-base text-white truncate">{resource.title}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span>{resource.size}</span>
                <span>•</span>
                <span className="uppercase text-blue-400 font-semibold">{resource.type}</span>
                <span>•</span>
                <span className="text-emerald-400">Verified On-Chain Asset</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={handleDownload}
              size="sm"
              className="bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold gap-1.5 h-9"
            >
              {downloaded ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-300" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </Button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PDF Simulated Viewer Document */}
        <div className="flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-8 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 w-full max-w-2xl min-h-[500px] p-8 sm:p-12 flex flex-col justify-between">
            
            {/* Document Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌲</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Stanford Online / BlockLearnX</p>
                    <p className="text-sm font-black text-slate-900">Official Course Handout</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#0056D2]">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>

              {/* Page Content based on current page */}
              <div className="mt-8 space-y-4">
                <h4 className="text-xl font-black text-slate-900">{resource.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{resource.description}</p>

                {currentPage === 1 && (
                  <div className="space-y-4 mt-6">
                    <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 space-y-2">
                      <p className="font-bold text-blue-900">Key Architectural Principles:</p>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600">
                        <li>Deterministic opcode execution in 256-bit EVM words.</li>
                        <li>Non-custodial, cryptographic account signature validation.</li>
                        <li>Gas metering: SSTORE (20k/5k gas) vs SLOAD (2.1k/100 gas) optimization rules.</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs">
                      <p className="text-slate-400">// EVM Memory Hierarchy</p>
                      <p className="text-amber-400">Storage: Persistent 32-byte key-value pairs (Expensive)</p>
                      <p className="text-emerald-400">Memory: Linear volatile memory allocated per tx (Moderate)</p>
                      <p className="text-blue-400">Calldata: Read-only external input buffer (Cheapest)</p>
                    </div>
                  </div>
                )}

                {currentPage === 2 && (
                  <div className="space-y-4 mt-6">
                    <h5 className="font-bold text-sm text-slate-900">Function Visibility & State Modifiers</h5>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                        <p className="font-bold text-[#0056D2]">public</p>
                        <p className="text-slate-500 mt-1">Can be called from internal contract context and external transactions.</p>
                      </div>
                      <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                        <p className="font-bold text-[#0056D2]">external</p>
                        <p className="text-slate-500 mt-1">Only callable externally. Most gas efficient when passing large arrays.</p>
                      </div>
                      <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                        <p className="font-bold text-[#0056D2]">view</p>
                        <p className="text-slate-500 mt-1">Promise not to modify Ethereum state. Reads storage free of charge outside tx.</p>
                      </div>
                      <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                        <p className="font-bold text-[#0056D2]">pure</p>
                        <p className="text-slate-500 mt-1">Promise not to read or write storage. Mathematical calculations only.</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentPage === 3 && (
                  <div className="space-y-4 mt-6">
                    <h5 className="font-bold text-sm text-slate-900">Security Checkpoints &amp; CEI Pattern</h5>
                    <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-xs text-emerald-900 space-y-2">
                      <p className="font-bold">Checks-Effects-Interactions Pattern:</p>
                      <p>1. Check inputs and sender permissions using \`require\` or custom errors.</p>
                      <p>2. Apply all internal state changes (e.g. balance updates) BEFORE external calls.</p>
                      <p>3. Perform external message calls, token transfers, or ETH forwarding last.</p>
                    </div>
                  </div>
                )}

                {currentPage === 4 && (
                  <div className="space-y-4 mt-6">
                    <h5 className="font-bold text-sm text-slate-900">Verification &amp; Accreditation</h5>
                    <p className="text-xs text-slate-600">
                      This material is cryptographically bound to the BlockLearnX learning credentials framework. Students completing this curriculum are eligible to claim verifiable soulbound NFT badges.
                    </p>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-500">
                      Doc Hash: 0x8a72b94f1c30d9e8...c99a (SHA-256)
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Document Footer */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
              <span>BlockLearnX Academy • Open Syllabus</span>
              <span>Document ID: BLX-RES-{(resource.id).substring(0, 8)}</span>
            </div>
          </div>
        </div>

        {/* Bottom Pagination Bar */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 px-3 text-xs"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="text-xs text-slate-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 px-3 text-xs"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <Button
            onClick={handleDownload}
            variant="ghost"
            size="sm"
            className="text-xs text-[#0056D2] hover:text-[#00419e] font-semibold"
          >
            <Printer className="h-4 w-4 mr-1.5" />
            Save / Print
          </Button>
        </div>

      </div>
    </div>
  );
}
