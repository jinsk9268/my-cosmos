import { mat4 } from "gl-matrix";
import { PERSPECTIVE_CAMERA } from "@/js/constants.js";

const {
	FOV,
	NEAR,
	FAR,
	EYE_START,
	CENTER,
	UP,
	SPEED_RATE,
	ZOOM_NEAR,
	ZOOM_FAR,
	ZOOM_OFFSET,
	Z_SPEED_FACTOR,
} = PERSPECTIVE_CAMERA;

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
		this.zoomNear = ZOOM_NEAR;
		this.zoomFar = ZOOM_FAR;
		this.zoomOffset = ZOOM_OFFSET;

		this.initCameraAspect(gl);
		this.initCamerSetting();
		this.initializeCamera();
	}

	/**
	 * @param {WebGL2RenderingContext} gl
	 */
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
	translateXY(deltaX, deltaY) {
		this.cameraPos[0] += deltaX * this.speed;
		this.cameraPos[1] += deltaY * this.speed;
		this.lookAt();
	}

	/**
	 * @param {number} delta
	 */
	zoomZ(delta) {
		const newZ = this.cameraPos[2] + delta;
		this.cameraPos[2] = Math.max(this.zoomNear, Math.min(newZ, this.zoomFar));

		this.lookAt();
	}

	/**
	 * @param {number} uTime
	 */
	updateZ(uTime) {
		this.cameraPos[2] = this.cameraPos[2] + uTime * Z_SPEED_FACTOR;
		this.lookAt();
	}
}

export default Camera;
