"use client";

import Link from "next/link";
import { CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function TestEnhancementPage() {
  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
      >
        &larr; Back to Dashboard
      </Link>

      {/* Mode toggle */}
      <div className="inline-flex rounded-lg border bg-card p-1 gap-1">
        <span className="bg-primary text-white rounded-md px-5 py-2.5 text-sm font-medium">
          Enhancement
        </span>
        <Link
          href="/test/generation"
          className="text-muted-foreground hover:text-foreground rounded-md px-5 py-2.5 text-sm font-medium"
        >
          Generation
        </Link>
      </div>

      {/* Step 1: Upload Product Image */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              1
            </span>
            Upload Product Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
            <CloudUpload className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-medium">
              Drag &amp; drop or click to upload
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              PNG, JPG up to 10MB
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Enhancement Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              2
            </span>
            Enhancement Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Operation */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Operation</label>
              <Select defaultValue="background-replacement">
                <SelectTrigger>
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="background-replacement">
                    Background Replacement
                  </SelectItem>
                  <SelectItem value="enhancement-basic">
                    Enhancement Basic
                  </SelectItem>
                  <SelectItem value="enhancement-premium">
                    Enhancement Premium
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Background description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Background Description
              </label>
              <Input placeholder="Describe the desired background..." />
            </div>

            {/* Output Ratio */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Ratio</label>
              <Select defaultValue="1:1">
                <SelectTrigger>
                  <SelectValue placeholder="Select ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">1:1</SelectItem>
                  <SelectItem value="4:3">4:3</SelectItem>
                  <SelectItem value="16:9">16:9</SelectItem>
                  <SelectItem value="original">Original</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Button size="lg" className="px-8">
          Generate 3 Variants
        </Button>
        <p className="mt-2 text-sm text-muted-foreground">
          Cost: ~3-8 credits per variant
        </p>
      </div>

      {/* Results section */}
      <Separator />

      <h2 className="text-2xl font-semibold">Compare AI Results</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* DALL-E 3 */}
        <Card>
          <div className="aspect-square rounded-t-lg bg-muted" />
          <CardContent className="space-y-3 p-6">
            <h3 className="text-lg font-semibold">DALL-E 3</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost</span>
                <span className="font-medium text-primary">8 credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quality</span>
                <span className="font-medium">Excellent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Speed</span>
                <span className="font-medium">~15s</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              Use This
            </Button>
          </CardContent>
        </Card>

        {/* Flux - highlighted best value */}
        <Card className="relative border-2 border-primary ring-2 ring-primary/20">
          <Badge className="absolute right-3 top-3">Best Value</Badge>
          <div className="aspect-square rounded-t-lg bg-muted" />
          <CardContent className="space-y-3 p-6">
            <h3 className="text-lg font-semibold">Flux</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost</span>
                <span className="font-medium text-primary">5 credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quality</span>
                <span className="font-medium">Excellent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Speed</span>
                <span className="font-medium">~10s</span>
              </div>
            </div>
            <Button className="w-full">Use This</Button>
          </CardContent>
        </Card>

        {/* Stable Diffusion */}
        <Card>
          <div className="aspect-square rounded-t-lg bg-muted" />
          <CardContent className="space-y-3 p-6">
            <h3 className="text-lg font-semibold">Stable Diffusion</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost</span>
                <span className="font-medium text-primary">3 credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quality</span>
                <span className="font-medium">Good</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Speed</span>
                <span className="font-medium">~12s</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              Use This
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom CTA box */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
        <h3 className="mb-2 text-lg font-semibold">
          Satisfied with the results?
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Scale your workflow by processing images in bulk.
        </p>
        <Button
          asChild
          className="bg-success text-success-foreground hover:bg-success/90"
        >
          <Link href="/bulk/setup">Start Bulk Enhancement</Link>
        </Button>
      </div>
    </div>
  );
}
