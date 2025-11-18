"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCanvas } from "@/context/context";
import { FabricImage } from "fabric";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export const AIChangeBackground = ({ project }) => {
  const { canvasEditor, setProcessingMessage } = useCanvas();
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { mutate: updateProject } = useConvexMutation(
    api.projects.updateProject
  );

  const getMainImage = () => {
    if (!canvasEditor) return null;
    return canvasEditor.getObjects().find((o) => o.type === "image") || null;
  };

  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const imgEl = new Image();
      imgEl.crossOrigin = "anonymous";

      imgEl.onload = () => {
        const fabricImg = new FabricImage(imgEl, {
          crossOrigin: "anonymous",
        });
        resolve(fabricImg);
      };

      imgEl.onerror = (err) => {
        console.error("Image failed to load:", err);
        reject(err);
      };

      // Force compatibility with ImageKit transformed URLs
      imgEl.src =
        url +
        (url.includes("?") ? "&" : "?") +
        "ik-sdk-version=javascript-1.0.0";
    });
  };

  const handleApplyPrompt = async () => {
    const mainImage = getMainImage();
    if (!mainImage || !project || !prompt.trim()) return;

    setProcessingMessage("Tranforming background using AI...");
    setIsProcessing(true);

    try {
      const currentImageUrl =
        project.currentImageUrl || project.originalImageUrl;

      const base = currentImageUrl.split("?")[0];

      const transformBgUrl = `${base}?tr=e-changebg-prompt-${encodeURIComponent(
        prompt
      )}`;

      console.log("Generated IK URL:", transformBgUrl);

      const processedImage = await loadImage(transformBgUrl);

      // Store the current properties before removing the old image
      const currentProps = {
        left: mainImage.left,
        top: mainImage.top,
        scaleX: mainImage.scaleX,
        scaleY: mainImage.scaleY,
        angle: mainImage.angle,
        originX: mainImage.originX,
        originY: mainImage.originY,
      };

      // Remove the old image and add the new one
      canvasEditor.remove(mainImage);
      processedImage.set(currentProps);
      canvasEditor.add(processedImage);

      // IMPORTANT: Update coordinates after replacing the image
      processedImage.setCoords();

      // Set as active object and recalculate canvas offset
      canvasEditor.setActiveObject(processedImage);
      canvasEditor.calcOffset();
      canvasEditor.requestRenderAll();

      updateProject({
        projectId: project._id,
        currentImageUrl: transformBgUrl,
      });

      console.log("Tranformed background successfully");
    } catch (error) {
      console.error("Error in changing background");
      alert("Failed to change background. Please try again.");
    }

    setIsProcessing(false);
    setProcessingMessage("");
  };

  if (!canvasEditor) {
    return (
      <div className="p-4">
        <p className="text-white/70 text-sm">Canvas not ready</p>
      </div>
    );
  }

  const mainImage = getMainImage();
  if (!mainImage) {
    return (
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-amber-400 font-medium mb-1">No Image Found</h3>
            <p className="text-amber-300/80 text-sm">
              Please add an image to the canvas first to use AI background
              change.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs text-white/70 mb-3">
          Describe how you'd like the background to look. The AI will try to
          transform the scene based on your prompt.
        </h3>
      </div>

      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. a dreamy pastel sunset with soft clouds and bokeh lights"
        className="w-full min-h-[100px] p-3 rounded bg-slate-700 border border-white/10 text-white resize-y"
      />

      <div className="flex items-center gap-2">
        <Button
          onClick={handleApplyPrompt}
          disabled={isProcessing}
          variant="primary"
          className="gap-2 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Applying...
            </>
          ) : (
            "Apply Prompt"
          )}
        </Button>
        <Button
          onClick={() => setPrompt("")}
          variant="glass"
          disabled={isProcessing}
          className="cursor-pointer"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
