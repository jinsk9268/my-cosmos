import { useTextureStore } from "@/js/store.js";
import { getNoise3d } from "@/js/utils.js";

class Shape {
	/**
	 * 여러가지 은하 모양의 부모 클래스
	 * @param {number} qty
	 * @param {boolean} needTexture
	 */
	constructor({ qty, needTexture }) {
		this.qty = qty;
		this.needTexture = needTexture;

		if (this.needTexture) {
			this.positionTextures = new Float32Array(this.qty * 4); // x, y, z, textureIdx
		} else {
			this.positionPoints = new Float32Array(this.qty * 3); // x, y, z
		}
	}

	/**
	 * @param {number} baseX
	 * @param {number} baseY
	 * @param {number} baseZ
	 * @returns {object} x, y, z에 노이즈 값 추가하여 반환
	 */
	calculateNoiseXYZ(baseX, baseY, baseZ) {
		const noiseFactor = getNoise3d(baseX, baseY, baseZ);

		const x = baseX + noiseFactor * 0.5;
		const y = baseY + noiseFactor * 0.5;
		const z = baseZ + noiseFactor * 0.5;
		return { x, y, z };
	}

	/**
	 * @param {boolean} needTexture
	 * @param {number} idx
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	setPositions(needTexture, idx, x, y, z) {
		if (needTexture) {
			const texIdx = idx * 4;
			this.positionTextures[texIdx] = x;
			this.positionTextures[texIdx + 1] = y;
			this.positionTextures[texIdx + 2] = z;
			this.positionTextures[texIdx + 3] = idx % useTextureStore.getState().textCanvasDatas.length;
		} else {
			const texIdx = idx * 3;
			this.positionPoints[texIdx] = x;
			this.positionPoints[texIdx + 1] = y;
			this.positionPoints[texIdx + 2] = z;
		}
	}
}

export default Shape;
