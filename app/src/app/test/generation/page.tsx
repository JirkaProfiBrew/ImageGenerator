"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function TestGenerationPage() {
  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to Dashboard
      </Link>

      {/* Mode toggle */}
      <div className="inline-flex items-center rounded-lg border bg-muted p-1">
        <Link
          href="/test/enhancement"
          className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Enhancement
        </Link>
        <span className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white">
          Generation
        </span>
      </div>

      {/* Step 1 - Describe Your Image */}
      <div className="rounded-lg border bg-card p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            1
          </div>
          <h2 className="text-xl font-semibold">Describe Your Image</h2>
        </div>

        {/* Prompt textarea */}
        <div className="space-y-2">
          <label
            htmlFor="prompt"
            className="text-sm font-medium leading-none"
          >
            Prompt
          </label>
          <Textarea
            id="prompt"
            rows={4}
            placeholder="e.g., Professional product photo of a blue ceramic coffee mug on a marble countertop, soft studio lighting, white background"
          />
        </div>

        {/* Parameter grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Style</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realistic">Realistic</SelectItem>
                <SelectItem value="artistic">Artistic</SelectItem>
                <SelectItem value="minimalist">Minimalist</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Background
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select background" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
                <SelectItem value="transparent">Transparent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Aspect Ratio
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1">1:1 Square</SelectItem>
                <SelectItem value="4:3">4:3</SelectItem>
                <SelectItem value="16:9">16:9</SelectItem>
                <SelectItem value="9:16">9:16 Portrait</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-2">
        <Button size="lg" className="px-10 text-base">
          Generate 3 Variants
        </Button>
        <p className="text-sm text-muted-foreground">
          Cost: ~3-15 credits per variant
        </p>
      </div>

      <Separator />

      {/* Results section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Compare AI Results</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* DALL-E 3 */}
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <h3 className="text-lg font-semibold">DALL-E 3</h3>
            <div className="flex aspect-square items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
              Image placeholder
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Credits</span>
                <span className="font-medium">15 credits</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Quality</span>
                <span className="font-medium">Excellent</span>
              </div>
              <div className="rounded bg-muted px-3 py-1.5 text-center text-xs italic">
                Best for realism
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Speed</span>
                <span className="font-medium">~20s</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              Use This
            </Button>
          </div>

          {/* Flux - highlighted */}
          <div className="relative rounded-lg border-2 border-primary bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Flux</h3>
              <Badge>Best Value</Badge>
            </div>
            <div className="flex aspect-square items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
              Image placeholder
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Credits</span>
                <span className="font-medium">10 credits</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Quality</span>
                <span className="font-medium">Very Good</span>
              </div>
              <div className="rounded bg-muted px-3 py-1.5 text-center text-xs italic">
                Best value
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Speed</span>
                <span className="font-medium">~10s</span>
              </div>
            </div>
            <Button className="w-full">Use This</Button>
          </div>

          {/* Stable Diffusion */}
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <h3 className="text-lg font-semibold">Stable Diffusion</h3>
            <div className="flex aspect-square items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
              Image placeholder
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Credits</span>
                <span className="font-medium">6 credits</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Quality</span>
                <span className="font-medium">Good</span>
              </div>
              <div className="rounded bg-muted px-3 py-1.5 text-center text-xs italic">
                Most affordable
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Speed</span>
                <span className="font-medium">~15s</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              Use This
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-lg border bg-card p-10 text-center space-y-4">
        <h3 className="text-xl font-semibold">
          Satisfied? Start Bulk Generation
        </h3>
        <p className="text-sm text-muted-foreground">
          Scale your chosen model across all your products with a single click.
        </p>
        <Button
          asChild
          className="bg-success text-white hover:bg-success/90"
          size="lg"
        >
          <Link href="/bulk/setup">Start Bulk Generation</Link>
        </Button>
      </div>
    </div>
  );
}
