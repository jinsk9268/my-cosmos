import Shape from "@/js/shape/Shape.js";

class Sphere extends Shape {
	/**
	 * 황금각 및 페르마 나선 알고리즘을 적용하여 균등한 분포를 가진 구 생성
	 * @param {Object} param
	 * @param {number} param.qty
	 * @param {number} param.radius
	 * @param {boolean} param.needTexture
	 */
	constructor({ qty, radius, needTexture }) {
		super({ qty, needTexture });
		this.radius = radius;
	}

	/**
	 * @param {number} idx
	 * @returns {Object} 위도(phi), 경도(theta) 객체 반환
	 */
	calculatePhiAndTheta(idx) {
		const phi = Math.acos(-1 + (2 * idx) / this.qty);
		const theta = Math.sqrt(this.qty * Math.PI) * phi;

		return { phi, theta };
	}

	/**
	 * @param {number} phi
	 * @param {number} theta
	 * @returns {Object} x, y, z 좌표 객체 반환
	 */
	calculateXYZ(phi, theta) {
		const x = this.radius * Math.sin(phi) * Math.cos(theta);
		const y = this.radius * Math.sin(phi) * Math.sin(theta);
		const z = this.radius * Math.cos(phi);

		return { x, y, z };
	}

	generatePosition() {
		for (let i = 0; i < this.qty; i++) {
			const { phi, theta } = this.calculatePhiAndTheta(i);
			const { x, y, z } = this.calculateXYZ(phi, theta);

			this.setPositions(this.needTexture, i, x, y, z);
		}
	}
}

export default Sphere;
