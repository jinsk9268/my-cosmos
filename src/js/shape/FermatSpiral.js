import Shape from "@/js/shape/Shape.js";
import { gaussianRandom } from "@/js/utils.js";

class FermatSpiral extends Shape {
	/**
	 * 페르마 나선 형태 생성
	 * @param {Object} param
	 * @param {number} param.qty
	 * @param {number} param.thetaOffset 각도 기본 값
	 * @param {number} param.radiusMin 나선의 최소 반지름
	 * @param {number} [param.scale] 나선 크기 조정
	 * @param {boolean} param.twoWay true면 양쪽 나선, false면 한쪽 나선
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

	/**
	 * @param {number} idx
	 * @returns {number} 각 포인트의 나선형 각도 결정하여 반환
	 */
	calculateTheta(idx) {
		return idx * this.thetaOffset * (this.twoWay ? (idx % 2 === 0 ? 1 : -1) : 1);
	}

	/**
	 * @param {number} theta
	 * @returns {number} 각 포인트의 반지름 계산하여 반환
	 */
	calculateRadius(theta) {
		const radius = Math.sqrt(Math.abs(theta));
		const normalizedRadius = (radius - this.radiusMin) / (this.radiusMax - this.radiusMin);
		const scaledRadius = normalizedRadius * this.scale;

		return scaledRadius;
	}

	/**
	 * @param {number} radius
	 * @param {number} theta
	 * @returns {object} 반지름과 각도를 기반으로 x, y, z 좌표값 계산하여 반환
	 */
	calculateXYZ(radius, theta) {
		const baseX = radius * Math.cos(theta) + gaussianRandom();
		const baseY = radius * Math.sin(theta);
		const baseZ = gaussianRandom(-0.5, 1);

		return this.calculateNoiseXYZ(baseX, baseY, baseZ);
	}

	/**
	 * 전체 포인트의 좌표 지정
	 */
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
