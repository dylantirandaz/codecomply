"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface PdfUploaderProps {
  onExtracted: (data: Record<string, unknown>) => void;
}

export function PdfUploader({ onExtracted }: PdfUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setFileName(file.name);
      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Upload failed");
        }

        onExtracted(data.extractedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onExtracted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer border-2 border-dashed px-8 py-16 text-center transition-colors ${
        isDragActive
          ? "border-stone-400 bg-stone-50"
          : "border-stone-300 bg-white hover:border-stone-400"
      }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
            Processing
          </p>
          <p className="mt-2 font-serif text-lg text-stone-700">
            Extracting from {fileName}
          </p>
          <div className="mx-auto mt-4 flex justify-center gap-1">
            <div className="h-1 w-5 animate-pulse bg-stone-400" />
            <div className="h-1 w-5 animate-pulse bg-stone-300 delay-100" />
            <div className="h-1 w-5 animate-pulse bg-stone-200 delay-200" />
          </div>
        </div>
      ) : isDragActive ? (
        <p className="font-serif text-lg text-stone-700">
          Release to upload
        </p>
      ) : (
        <div>
          <svg
            className="mx-auto h-8 w-8 text-stone-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <p className="mt-4 text-sm text-stone-600">
            Drop a building permit or site plan here
          </p>
          <p className="mt-1 text-[11px] text-stone-400">
            PDF format, up to 10 MB
          </p>
        </div>
      )}
      {error && (
        <p className="mt-4 text-[12px] text-red-800">{error}</p>
      )}
    </div>
  );
}
