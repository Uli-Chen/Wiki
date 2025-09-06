import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { stringToSlug } from "./src/utils";

// https://vitejs.dev/config/
export default () => {
  const env = loadEnv("dev", process.cwd());
  return defineConfig({
    server: {
      port: 5173,
      allowedHosts: [
        "1c3b1c00d351.ngrok-free.app", // 这里写 ngrok 给你的域名
      ],
    },
    base: `/${stringToSlug(env.VITE_TEAM_NAME)}/`,
    plugins: [react()],
  });
};
``;
