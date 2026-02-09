"use client";

import { Download, RefreshCw, Trash2, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GeneratedImage } from "@/lib/types";

interface ImageCardProps {
  image: GeneratedImage;
  selected: boolean;
  onSelect: (id: string) => void;
  onDownload: (id: string) => void;
  onRegenerate: (id: string) => void;
}

export function ImageCard({
  image,
  selected,
  onSelect,
  onDownload,
  onRegenerate,
}: ImageCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-lg border transition-shadow hover:shadow-lg",
        selected && "ring-2 ring-primary"
      )}
    >
      {/* Checkbox */}
      <div className="absolute left-2 top-2 z-10">
        <Checkbox
          checked={selected}
          onCheckedChange={() => onSelect(image.id)}
          aria-label={`Select ${image.productName}`}
        />
      </div>

      {/* Image placeholder */}
      <div className="aspect-square bg-muted flex items-center justify-center">
        <ImageIcon className="h-10 w-10 text-muted-foreground" />
      </div>

      {/* Footer */}
      <CardContent className="flex items-center justify-between p-3">
        <span className="text-sm font-medium truncate mr-2">
          {image.productName}
        </span>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDownload(image.id)}
            aria-label="Download"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRegenerate(image.id)}
            aria-label="Regenerate"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
