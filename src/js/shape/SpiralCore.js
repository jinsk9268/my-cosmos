import Shape from "@/js/shape/Shape.js";
import { gaussianRandom, getNoise3d } from "@/js/utils.js";

class SpiralCore extends Shape {
	/**
	 * 코어가 있는 나선 형태 생성
	 * @param {Object} param
	 * @param {number} param.qty
	 * @param {boolean} param.needTexture
	 * @param {number} param.numArms 나선 팔의 수
	 * @param {number} param.thickness 나선의 두께
	 * @param {number} param.coreXDist 코어(가운데) 영역의 x 방향 최대 거리
	 * @param {number} param.coreYDist 코어(가운데) 영역의 y 방향 최대 거리
	 * @param {number} param.outerCoreXDist 코어 외부 영역의 x 방향 최대 거리
	 * @param {number} param.outerCoreYDist 코어 외부 영역의 y 방향 최대 거리
	 * @param {number} param.armXDist 나선 팔에 적용할 x 방향 분포 범위
	 * @param {number} param.armYDist 나선 팔에 적용할 y 방향 분포 범위
	 * @param {number} param.armXMean 나선 팔의 x 평균값
	 * @param {number} param.armYMean 나선 팔의 y 평균값
	 * @param {number} param.spiral 나선 꼬임의 정도
	 * @param {number} param.arms 전체 나선의 개수 또는 반복 주기
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

	/**
	 * @param {number} startX x좌표 최소값
	 * @param {number} endX x좌표 최대값
	 * @param {number} startY y좌표 최소값
	 * @param {number} endY y좌표 최대값
	 * @returns {object} x, y 최대 최소값을 바탕으로 x, y, z 좌표 계산하여 반환
	 */
	calculateXYZ(startX, endX, startY, endY) {
		const baseX = gaussianRandom(startX, endX);
		const baseY = gaussianRandom(startY, endY);
		const baseZ = gaussianRandom(-this.thickness * 0.5, this.thickness) + this.thickness * 0.5;

		return this.calculateNoiseXYZ(baseX, baseY, baseZ);
	}

	/**
	 * @param {number} gx x좌표 기준점
	 * @param {number} gy y좌표 기준점
	 * @param {number} theta 나선 시작 각도
	 * @returns {object} 나선 형태로 변환된 x, y, z 좌표값 반환
	 */
	calculateSpiralXYZ(gx, gy, theta) {
		let radius = Math.sqrt(gx ** 2 + gy ** 2);
		theta += gx > 0 ? Math.atan(gy / gx) : Math.atan(gy / gx) + Math.PI;
		theta += (radius / this.armXDist) * this.spiral;

		const baseX = radius * Math.cos(theta);
		const baseY = radius * Math.sin(theta);
		const baseZ = getNoise3d(baseX, baseY, theta) * 0.47;

		return this.calculateNoiseXYZ(baseX, baseY, baseZ);
	}

	/**
	 * 전체 포인트 나선 좌표 생성
	 */
	generatePosition() {
		const divisor = this.numArms * 2;
		let loop1 = this.qty / divisor; // 코어 영역
		let loop2 = loop1 * 2; // 코어 외부 영역
		let loop3 = loop1 + loop2; // 나선 팔 영역

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
				// 나선 팔의 기본 좌표
				const base = this.calculateXYZ(this.armXMean, this.armXDist, this.armYMean, this.armYDist);
				// 기본 좌표를 나선형태로 전환
				const { x, y, z } = this.calculateSpiralXYZ(base.x, base.y, (j * 2 * Math.PI) / this.arms);

				this.setPositions(this.needTexture, i, x, y, z);
			}

			loop2 = loop3;
			loop3 += loop1;
		}
	}
}

export default SpiralCore;
