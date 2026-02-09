"use client";

import { ImageCard } from "@/components/results/image-card";
import type { GeneratedImage } from "@/lib/types";

interface ImageSelectionGridProps {
  images: GeneratedImage[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onDownload: (id: string) => void;
  onRegenerate: (id: string) => void;
}

export function ImageSelectionGrid({
  images,
  selectedIds,
  onSelectionChange,
  onDownload,
  onRegenerate,
}: ImageSelectionGridProps) {
  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          selected={selectedIds.includes(image.id)}
          onSelect={handleSelect}
          onDownload={onDownload}
          onRegenerate={onRegenerate}
        />
      ))}
    </div>
  );
}
