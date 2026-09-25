"use client";

import { useRef, useState, useEffect } from "react";
import {
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  FileVideo,
  Check,
  Smartphone,
  QrCode,
  RefreshCw,
  ArrowRight,
  Wifi,
  Copy,
} from "lucide-react";

interface VideoRecorderProps {
  onVideoReady: (file: File, blobUrl: string, durationSec: number) => void;
  onUpload: (file: File, blobUrl: string) => void;
}

type Tab = "upload" | "mobile" | "url";

export function VideoRecorder({ onVideoReady, onUpload }: VideoRecorderProps) {
  const [tab, setTab] = useState<Tab>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreviewUrl, setUploadedPreviewUrl] = useState<string | null>(null);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [urlSaved, setUrlSaved] = useState(false);

  // Mobile Sync State
  const [mobilePairCode] = useState("BLX-9942");
  const [isMobileConnected, setIsMobileConnected] = useState(false);
  const [isMobileUploading, setIsMobileUploading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const playbackRef = useRef<HTMLVideoElement>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (uploadedPreviewUrl && uploadedPreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(uploadedPreviewUrl);
      }
    };
  }, [uploadedPreviewUrl]);

  // Handle pre-recorded file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (uploadedPreviewUrl && uploadedPreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(uploadedPreviewUrl);
    }
    const url = URL.createObjectURL(file);
    setUploadedFile(file);
    setUploadedPreviewUrl(url);
    onUpload(file, url);
  };

  // Simulate or trigger Mobile Video Sync
  const handleSimulateMobileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setIsMobileConnected(true);
    setIsMobileUploading(true);

    setTimeout(() => {
      setIsMobileUploading(false);
      const targetFile = file || new File([], "mobile_recorded_lecture_720p.mp4", { type: "video/mp4" });
      const url = file ? URL.createObjectURL(file) : "https://images.unsplash.com/video-placeholder.mp4";
      setUploadedFile(targetFile);
      setUploadedPreviewUrl(url);
      onUpload(targetFile, url);
    }, 1500);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrlInput.trim()) return;
    setUrlSaved(true);
    const mockFile = new File([], videoUrlInput.split("/").pop() || "prerecorded_lecture.mp4", { type: "video/mp4" });
    onUpload(mockFile, videoUrlInput);
  };

  const copyMobileLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/mobile-upload?code=${mobilePairCode}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="vr-root border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-4 font-sans">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setTab("upload")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            tab === "upload"
              ? "bg-[#0056D2] text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          <Upload className="w-3.5 h-3.5" /> Upload from PC
        </button>

        <button
          type="button"
          onClick={() => setTab("mobile")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            tab === "mobile"
              ? "bg-[#0056D2] text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-300" /> 📱 Upload from Mobile (QR Code)
        </button>

        <button
          type="button"
          onClick={() => setTab("url")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            tab === "url"
              ? "bg-[#0056D2] text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" /> Video URL / S3 Link
        </button>
      </div>

      {/* ── 1. UPLOAD FROM PC TAB ── */}
      {tab === "upload" && (
        <div className="space-y-3">
          {!uploadedFile ? (
            <label className="flex flex-col items-center justify-center p-8 bg-white border-2 border-dashed border-slate-300 hover:border-[#0056D2] rounded-2xl cursor-pointer transition-all hover:bg-blue-50/50 group text-center">
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/mkv"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0056D2] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileVideo className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-900">Click to select video file from your PC</p>
              <p className="text-xs text-slate-500 mt-1">Supports MP4, WebM, MOV, AVI — Up to 2GB</p>
            </label>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
              {uploadedPreviewUrl && (
                <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden shadow-inner">
                  <video
                    ref={playbackRef}
                    src={uploadedPreviewUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Video Loaded: <strong>{uploadedFile.name}</strong></span>
                </div>
                <span className="text-slate-500 font-mono font-semibold">
                  {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                </span>
              </div>
              <label className="inline-block text-xs font-bold text-[#0056D2] hover:underline cursor-pointer">
                Replace with another PC file
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      )}

      {/* ── 2. UPLOAD FROM MOBILE PHONE VIA QR CODE ── */}
      {tab === "mobile" && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* QR Code Graphic Box */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-slate-800 text-center space-y-2">
              <div className="w-32 h-32 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                {/* Visual SVG QR Code */}
                <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100">
                  <path fill="currentColor" d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M22,22 h6 v6 h-6 z" />
                  <path fill="currentColor" d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M72,22 h6 v6 h-6 z" />
                  <path fill="currentColor" d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M22,72 h6 v6 h-6 z" />
                  <path fill="currentColor" d="M50,50 h10 v10 h-10 z M70,50 h20 v10 h-20 z M50,70 h20 v20 h-20 z M80,80 h10 v10 h-10 z" />
                </svg>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                Pairing Code: <span className="text-amber-400 font-bold">{mobilePairCode}</span>
              </span>
            </div>

            {/* Mobile Scan Instructions & Actions */}
            <div className="space-y-3 flex-1">
              <div>
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase rounded-full border border-amber-300">
                  📱 Mobile Direct Upload Sync
                </span>
                <h4 className="text-base font-extrabold text-slate-900 mt-1">
                  Upload Video from Mobile Phone to PC
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                  Scan this QR code with your mobile camera to instantly pick or record a video on your phone. It will automatically upload to this lesson on your PC!
                </p>
              </div>

              {/* Status Indicator */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> Mobile Sync Channel:
                  </span>
                  <span className="font-bold font-mono text-emerald-600">READY</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Target PC IP: <code>http://localhost:3000/mobile-sync</code>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <label className="px-4 py-2 bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer inline-flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" /> Select Mobile File / Transfer
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleSimulateMobileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={copyMobileLink}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" /> {copiedLink ? "Link Copied!" : "Copy Mobile Link"}
                </button>
              </div>
            </div>
          </div>

          {/* Live Mobile Syncing State */}
          {isMobileUploading && (
            <div className="p-4 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs font-bold flex items-center gap-3 animate-in fade-in">
              <RefreshCw className="w-5 h-5 text-[#0056D2] animate-spin shrink-0" />
              <div>
                <div>Receiving pre-recorded video stream from Mobile Phone...</div>
                <div className="text-[11px] text-blue-600 font-normal">Transferring to PC course lesson database...</div>
              </div>
            </div>
          )}

          {/* Sync Success Preview */}
          {uploadedFile && isMobileConnected && !isMobileUploading && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>✓ Successfully synced mobile video: <strong>{uploadedFile.name}</strong></span>
              </div>
              {uploadedPreviewUrl && (
                <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden mt-2">
                  <video src={uploadedPreviewUrl} controls className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── 3. EXTERNAL URL TAB ── */}
      {tab === "url" && (
        <form onSubmit={handleUrlSubmit} className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Pre-Recorded Video URL (Vimeo, AWS S3, HLS stream)</label>
            <input
              type="url"
              value={videoUrlInput}
              onChange={(e) => setVideoUrlInput(e.target.value)}
              placeholder="https://my-bucket.s3.amazonaws.com/prerecorded_lesson_1.mp4"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0056D2]"
              required
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Attach Video Link
          </button>

          {urlSaved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" /> Video URL attached successfully!
            </div>
          )}
        </form>
      )}
    </div>
  );
}
