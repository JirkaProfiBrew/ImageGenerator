"use client";

import { useRef } from "react";
import { FileText, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CSVUploaderProps {
  onFileSelect: (file: File) => void;
  fileName?: string;
  rowCount?: number;
}

export function CSVUploader({ onFileSelect, fileName, rowCount }: CSVUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }

  function handleClick() {
    inputRef.current?.click();
  }

  if (fileName) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
          <FileText className="h-8 w-8 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{fileName}</p>
            {rowCount !== undefined && (
              <p className="text-xs text-muted-foreground">
                {rowCount} {rowCount === 1 ? "row" : "rows"} detected
              </p>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleClick}>
            Change file
          </Button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />

        <a
          href="/templates/bulk-upload-template.csv"
          download
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <Download className="h-3.5 w-3.5" />
          Download CSV template
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleClick}
        className="flex w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 px-6 py-10 text-center transition-colors hover:border-primary/50 hover:bg-muted"
      >
        <Upload className="h-10 w-10 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Click to upload a CSV file</p>
          <p className="mt-1 text-xs text-muted-foreground">
            CSV files with product_name, description, and background columns
          </p>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
      />

      <a
        href="/templates/bulk-upload-template.csv"
        download
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <Download className="h-3.5 w-3.5" />
        Download CSV template
      </a>
    </div>
  );
}
