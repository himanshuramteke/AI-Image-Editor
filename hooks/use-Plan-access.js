import { useAuth } from "@clerk/nextjs";

export const usePlanAccess = () => {
  const { has } = useAuth();

  const isPro = has?.({ plan: "pro" }) || false;
  const isFree = !isPro;

  //Define which tools are available for each plan
  const planAccess = {
    // Free plan tools
    resize: true,
    crop: true,
    adjust: true,
    text: true,

    // Pro-only tools
    background: isPro,
    change_background: isPro,
    ai_extender: isPro,
    ai_edit: isPro,
  };

  //Helper funtion to check if user has access to specific tool
  const hasAccess = (toolId) => {
    return planAccess[toolId] === true;
  };

  // Get restricted tools that user doesn't have access to
  const getRestrictedTools = () => {
    return Object.entries(planAccess)
      .filter(([_, hasAccess]) => !hasAccess)
      .map(([toolId]) => toolId);
  };

  //check if user has reached the project limit
  const canCreateProject = (currentProjectUser) => {
    if (isPro) return true;

    return currentProjectUser < 3; //Free limit
  };

  //check if user has reached exports limit
  const canExport = (currentExportsThisMonth) => {
    if (isPro) return true;
    return currentExportsThisMonth < 20;
  };

  return {
    userPlan: isPro ? "pro" : "free_user",
    isPro,
    isFree,
    hasAccess,
    planAccess,
    getRestrictedTools,
    canCreateProject,
    canExport,
  };
};
