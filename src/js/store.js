import { createStore } from "zustand/vanilla";

export const useTextureStore = createStore((set) => ({
	textCanvasDatas: [],
	galaxyShapes: [],
	isTabletOrSmaller: false,
	setTextCanvasDatas: (data) => set({ textCanvasDatas: data }),
	setGalaxyShapes: (data) => set({ galaxyShapes: data }),
	setIsTabletOrSmaller: (data) => set({ isTabletOrSmaller: data }),
}));
