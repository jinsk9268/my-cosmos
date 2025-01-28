import { mat4 } from "gl-matrix";
import { PERSPECTIVE_CAMERA } from "@/js/constants";

const { FOV, NEAR, FAR, EYE, CENTER, UP, SPEED_RATE, ZOOM_MIN, ZOOM_MAX, ZOOM_OFFSET } =
	PERSPECTIVE_CAMERA;

class Camera {
	/**
	 *
	 * @param {WebGL2RenderingContext} gl
	 */
	constructor(gl) {
		this.projectionMatrix = mat4.create();
		this.viewMatrix = mat4.create();
		this.viewWithoutTranslateMatrix = mat4.create();
		this.aspect = gl.canvas.width / gl.canvas.height;

		this.initCameraVars();

		this.perspective();
		this.lookAt();
	}

	initCameraVars() {
		this.fov = FOV;
		this.near = NEAR;
		this.far = FAR;

		this.cameraPos = EYE;
		this.targetPos = CENTER;
		this.up = UP;

		this.speed = SPEED_RATE;
		this.zoomMin = ZOOM_MIN;
		this.zoomMax = ZOOM_MAX;
		this.zoomOffset = ZOOM_OFFSET;
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
}

export default Camera;
