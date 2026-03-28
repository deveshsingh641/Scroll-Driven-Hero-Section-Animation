import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGitHubActions && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  ...(isGitHubActions ? { output: "export" as const } : {}),
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: isGitHubActions,
  },
};

export default nextConfig;
