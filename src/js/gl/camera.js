import { mat4 } from "gl-matrix";
import { PERSPECTIVE_CAMERA } from "@/js/constants";

const { FOV, NEAR, FAR, EYE_START, CENTER, UP, SPEED_RATE, ZOOM_MIN, ZOOM_MAX, ZOOM_OFFSET } =
	PERSPECTIVE_CAMERA;

class Camera {
	/**
	 * 카메라 세팅 설정
	 * @param {WebGL2RenderingContext} gl
	 */
	constructor(gl) {
		this.fov = FOV;
		this.near = NEAR;
		this.far = FAR;
		this.speed = SPEED_RATE;
		this.zoomMin = ZOOM_MIN;
		this.zoomMax = ZOOM_MAX;
		this.zoomOffset = ZOOM_OFFSET;

		this.initCameraAspect(gl);
		this.initCamerSetting();
		this.initializeCamera();
	}

	initCameraAspect(gl) {
		this.aspect = gl.canvas.width / gl.canvas.height;
	}

	initCamerSetting() {
		this.projectionMatrix = mat4.create();
		this.viewMatrix = mat4.create();
		this.viewWithoutTranslateMatrix = mat4.create();

		this.cameraPos = EYE_START.slice();
		this.targetPos = CENTER;
		this.up = UP;
	}

	perspective() {
		mat4.perspective(this.projectionMatrix, this.fov, this.aspect, this.near, this.far);
	}

	lookAt() {
		mat4.lookAt(this.viewMatrix, this.cameraPos, this.targetPos, this.up);

		mat4.copy(this.viewWithoutTranslateMatrix, this.viewMatrix);
		this.viewWithoutTranslateMatrix[12] = 0;
		this.viewWithoutTranslateMatrix[13] = 0;
		this.viewWithoutTranslateMatrix[14] = 0;
	}

	initializeCamera() {
		this.perspective();
		this.lookAt();
	}

	/**
	 * @param {number} deltaX
	 * @param {number} deltaY
	 */
	rotateXY(deltaX, deltaY) {
		mat4.rotateX(this.viewMatrix, this.viewMatrix, deltaX * this.speed);
		mat4.rotateY(this.viewMatrix, this.viewMatrix, deltaY * this.speed);
	}

	/**
	 * @param {number} delta
	 */
	zoomZ(delta) {
		this.cameraPos[2] = Math.max(
			this.zoomMin,
			Math.min(this.cameraPos[2] + delta * this.speed, this.zoomMax),
		);

		this.lookAt();
	}

	updateZ(uTime) {
		this.cameraPos[2] = this.cameraPos[2] + uTime * 0.0005;
		this.lookAt();
	}
}

export default Camera;
