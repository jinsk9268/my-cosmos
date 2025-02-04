import Shape from "@/js/shape/Shape.js";
import { gaussianRandom } from "../utils";

class SpiralCore extends Shape {
	/**
	 * @param {Object} param
	 * @param {number} param.qty
	 * @param {boolean} param.needTexture
	 * @param {number} param.numArms
	 * @param {number} param.thickness
	 * @param {number} param.coreXDist
	 * @param {number} param.coreYDist
	 * @param {number} param.outerCoreXDist
	 * @param {number} param.outerCoreYDist
	 * @param {number} param.armXDist
	 * @param {number} param.armYDist
	 * @param {number} param.armXMean
	 * @param {number} param.armYMean
	 * @param {number} param.spiral
	 * @param {number} param.arms
	 */
	constructor({
		qty,
		needTexture,
		numArms,
		thickness,
		coreXDist,
		coreYDist,
		outerCoreXDist,
		outerCoreYDist,
		armXDist,
		armYDist,
		armXMean,
		armYMean,
		spiral,
		arms,
	}) {
		super({ qty, needTexture });
		this.numArms = numArms;
		this.thickness = thickness;
		this.coreXDist = coreXDist;
		this.coreYDist = coreYDist;
		this.outerCoreXDist = outerCoreXDist;
		this.outerCoreYDist = outerCoreYDist;
		this.armXDist = armXDist;
		this.armYDist = armYDist;
		this.armXMean = armXMean;
		this.armYMean = armYMean;
		this.spiral = spiral;
		this.arms = arms;
	}

	calculateXYZ(startX, endX, startY, endY) {
		const x = gaussianRandom(startX, endX);
		const y = gaussianRandom(startY, endY);
		const z = gaussianRandom(0, this.thickness);

		return { x, y, z };
	}

	calculateSpiralXYZ(gx, gy, gz, offset) {
		let radius = Math.sqrt(gx ** 2 + gy ** 2);
		let theta = offset;
		theta += gx > 0 ? Math.atan(gy / gx) : Math.atan(gy / gx) + Math.PI;
		theta += (radius / this.armXDist) * this.spiral;

		return { x: radius * Math.cos(theta), y: radius * Math.sin(theta), z: gz };
	}

	generatePosition() {
		const divisor = this.numArms * 2;
		let loop1 = this.qty / divisor;
		let loop2 = loop1 * 2;
		let loop3 = loop1 + loop2;

		for (let i = 0; i < loop1; i++) {
			const { x, y, z } = this.calculateXYZ(0, this.coreXDist, 0, this.coreYDist);
			this.setPositions(this.needTexture, i, x, y, z);
		}

		for (let i = loop1; i < loop2; i++) {
			const { x, y, z } = this.calculateXYZ(0, this.outerCoreXDist, 0, this.outerCoreYDist);
			this.setPositions(this.needTexture, i, x, y, z);
		}

		for (let j = 0; j < this.numArms; j++) {
			for (let i = loop2; i < loop3; i++) {
				const base = this.calculateXYZ(this.armXMean, this.armXDist, this.armYMean, this.armYDist);
				const { x, y, z } = this.calculateSpiralXYZ(
					base.x,
					base.y,
					base.z,
					(j * 2 * Math.PI) / this.arms,
				);

				this.setPositions(this.needTexture, i, x, y, z);
			}

			loop2 = loop3;
			loop3 += loop1;
		}
	}
}

export default SpiralCore;
