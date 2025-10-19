"use client";

import { useCanvas } from "@/context/context";

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

function renderToolContent() {}
