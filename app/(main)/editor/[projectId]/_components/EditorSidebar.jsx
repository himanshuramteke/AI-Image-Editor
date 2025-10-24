"use client";

import { useCanvas } from "@/context/context";
import {
  Crop,
  Expand,
  Eye,
  Maximize2,
  Palette,
  Sliders,
  Text,
} from "lucide-react";
import { CropContent } from "./_tools/CropContent";
import { AIEdit } from "./_tools/AIEdit";
import { TextControls } from "./_tools/TextControls";
import { AIExtenderControls } from "./_tools/AIExtenderControls";
import { BackgroundControls } from "./_tools/BackgroundControls";
import { AdjustControls } from "./_tools/AdjustControls";
import { ResizeControls } from "./_tools/ResizeControls";

const TOOL_CONFIGS = {
  resize: {
    title: "Resize",
    icon: Expand,
    description: "Change project dimensions",
  },
  crop: {
    title: "Crop",
    icon: Crop,
    description: "Crop and trim your image",
  },
  adjust: {
    title: "Adjust",
    icon: Sliders,
    description: "Brightness, contrast, and more (Manual saving required)",
  },
  background: {
    title: "Background",
    icon: Palette,
    description: "Remove or change background",
  },
  ai_extender: {
    title: "AI Image Extender",
    icon: Maximize2,
    description: "Extend image boundaries with AI",
  },
  text: {
    title: "Add Text",
    icon: Text,
    description: "Customize in Various Fonts",
  },
  ai_edit: {
    title: "AI Editing",
    icon: Eye,
    description: "Enhance image quality with AI",
  },
};

export const EditorSidebar = ({ project }) => {
  const { activeTool } = useCanvas();
  const toolConfig = TOOL_CONFIGS[activeTool];

  if (!toolConfig) {
    return null;
  }

  const Icon = toolConfig.icon;

  return (
    <div className="min-w-96 border-r flex flex-col">
      {/* Sidebar header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-white" />
          <h2 className="text-lg font-semibold text-white">
            {toolConfig.title}
          </h2>
        </div>
        <p className="text-sm text-white mt-1">{toolConfig.description}</p>
      </div>
      {/* Sidebar content */}
      <div className="flex-1 p-4 overflow-y-scroll">
        {renderToolContent(activeTool, project)}
      </div>
    </div>
  );
};

function renderToolContent() {
  switch (activeTool) {
    case "crop":
      return <CropContent />;
    case "resize":
      return <ResizeControls />;
    case "adjust":
      return <AdjustControls />;
    case "background":
      return <BackgroundControls />;
    case "ai_extender":
      return <AIExtenderControls />;
    case "text":
      return <TextControls />;
    case "ai_edit":
      return <AIEdit />;
    default:
      return <div className="text-white">Select a tool to get started.</div>;
  }
}
