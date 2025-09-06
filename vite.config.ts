import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { stringToSlug } from "./src/utils";

export default () => {
  const env = loadEnv("dev", process.cwd());
  const teamSlug = stringToSlug(env.VITE_TEAM_NAME || "Wiki");

  return defineConfig({
    base: `/${teamSlug}/`, // 动态 base
    plugins: [react()],
  });
};
