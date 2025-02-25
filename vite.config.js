import { defineConfig } from "vite";
import path from "path";
import glsl from "vite-plugin-glsl";

export default defineConfig({
	base: "/my-cosmos/",
	build: {
		rollupOptions: {
			input: {
				main: "index.html",
				homeBackground: "home-background.html",
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	server: {
		host: "0.0.0.0",
		port: 5174,
	},
	plugins: [glsl()],
});
