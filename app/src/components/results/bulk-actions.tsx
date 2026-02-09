"use client";

import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BulkActionsProps {
  selectedCount: number;
  totalCount: number;
  onDownloadAll: () => void;
  onRegenerateSelected: () => void;
}

export function BulkActions({
  selectedCount,
  onDownloadAll,
  onRegenerateSelected,
}: BulkActionsProps) {
  return (
    <div className="sticky bottom-0 z-50 border-t bg-card shadow-lg">
      <div className="flex items-center justify-end gap-2 p-4">
        <Button
          variant="secondary"
          disabled={selectedCount === 0}
          onClick={onRegenerateSelected}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate Selected ({selectedCount})
        </Button>
        <Button
          variant="default"
          disabled={selectedCount === 0}
          onClick={onDownloadAll}
        >
          <Download className="h-4 w-4 mr-2" />
          Download Selected
        </Button>
      </div>
    </div>
  );
}
