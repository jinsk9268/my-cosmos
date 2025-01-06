import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	base: "/my-cosmos/",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	server: {
		host: "0.0.0.0",
		port: 5174,
	},
});
