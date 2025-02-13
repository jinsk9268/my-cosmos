import Shape from "@/js/shape/Shape.js";
import { gaussianRandom } from "@/js/utils.js";

class FermatSpiral extends Shape {
	/**
	 * 페르마 나선 형태 생성
	 * @param {Object} param
	 * @param {number} param.qty
	 * @param {number} param.thetaOffset
	 * @param {number} param.radiusMin
	 * @param {number} [param.scale]
	 * @param {boolean} param.twoWay
	 * @param {boolean} param.needTexture
	 */
	constructor({ qty, thetaOffset, radiusMin, scale = 1, twoWay, needTexture }) {
		super({ qty, needTexture });
		this.thetaOffset = thetaOffset;
		this.radiusMin = radiusMin;
		this.radiusMax = Math.sqrt((this.qty - 1) * this.thetaOffset);
		this.scale = scale;
		this.twoWay = twoWay;
	}

	calculateTheta(idx) {
		return idx * this.thetaOffset * (this.twoWay ? (idx % 2 === 0 ? 1 : -1) : 1);
	}

	calculateRadius(theta) {
		const radius = Math.sqrt(Math.abs(theta));
		const normalizedRadius = (radius - this.radiusMin) / (this.radiusMax - this.radiusMin);
		const scaledRadius = normalizedRadius * this.scale;

		return scaledRadius;
	}

	calculateXYZ(radius, theta) {
		const baseX = radius * Math.cos(theta) + gaussianRandom();
		const baseY = radius * Math.sin(theta);
		const baseZ = gaussianRandom(-0.5, 1);

		return this.calculateNoiseXYZ(baseX, baseY, baseZ);
	}

	generatePosition() {
		for (let i = 0; i < this.qty; i++) {
			const theta = this.calculateTheta(i);
			const radius = this.calculateRadius(theta);
			const { x, y, z } = this.calculateXYZ(radius, theta);

			this.setPositions(this.needTexture, i, x, y, z);
		}
	}
}

export default FermatSpiral;
