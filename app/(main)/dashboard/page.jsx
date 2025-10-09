"use client";

import { useConvexQuery } from "@/hooks/use-convex-query";
import { useState } from "react";
import NewProjectModal from "./_components/NewProjectModal";

const Dashboard = () => {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  //Get the user project
  const { data: projects, isLoading } = useConvexQuery(
    api.projects.getUserProjects
  );

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Your Projects
            </h1>
            <p className="text-white/70">
              Create and manage your AI-powered image designs
            </p>
          </div>

          <Button
            onClick={() => setShowNewProjectModal(true)}
            variant="primary"
            size="lg"
            className="gap-2"
          >
            <Plus className="h-5 w-5" />
            New Project
          </Button>
        </div>

        {/* Projects Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          </div>
        ) : projects && projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <EmptyState onCreateProject={() => setShowNewProjectModal(true)} />
        )}

        {/* New Project Modal */}
        <NewProjectModal
          isOpen={showNewProjectModal}
          onClose={() => setShowNewProjectModal(false)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
