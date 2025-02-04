import { createStore } from "zustand/vanilla";

export const useTextureStore = createStore((set) => ({
	textCanvasDatas: [],
	galaxyShapes: [],
	setTextCanvasDatas: (data) => set({ textCanvasDatas: data }),
	setGalaxyShapes: (data) => set({ galaxyShapes: data }),
}));
