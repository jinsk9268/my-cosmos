import { mat4 } from "gl-matrix";
import { CAMERA } from "@/js/constants";

const projectionMatrix = mat4.create();
const viewMatrix = mat4.create();
const viewWithoutTranslateMatrix = mat4.clone(viewMatrix);
const cameraView = { cameraPos: CAMERA.EYE, targetPos: CAMERA.CENTER, up: CAMERA.UP };

// 카메라 세팅과 조작 ---------------------
/**
 * @param {number} fov 카메라 시야 각도
 * @param {number} aspect 화면 비율
 * @param {number} near 근거리 초점
 * @param {number} far 원거리 초점
 */
function perspective({ fov = CAMERA.FOV, aspect, near = CAMERA.NEAR, far = CAMERA.FAR }) {
	mat4.perspective(projectionMatrix, fov, aspect, near, far);
}

/**
 * @param {object} [param]
 * @param {number[]} param.cameraPos 카메라 위치
 * @param {number[]} param.targetPos 바라보는 지점
 * @param {number[]} param.up 카메라 위쪽 방향
 */
function view() {
	const { cameraPos, targetPos, up } = cameraView;
	mat4.lookAt(viewMatrix, cameraPos, targetPos, up);

	mat4.copy(viewWithoutTranslateMatrix, viewMatrix);
	viewWithoutTranslateMatrix[12] = 0;
	viewWithoutTranslateMatrix[13] = 0;
	viewWithoutTranslateMatrix[14] = 0;
}

function rotateXY(deltaX, deltaY) {
	mat4.rotateX(viewMatrix, viewMatrix, deltaX * CAMERA.SPEED_RATE);
	mat4.rotateY(viewMatrix, viewMatrix, deltaY * CAMERA.SPEED_RATE);
}

function zoomZ(delta) {
	cameraView.cameraPos[2] = Math.max(
		CAMERA.ZOOM_MIN,
		Math.min(cameraView.cameraPos[2] + delta * CAMERA.SPEED_RATE, CAMERA.ZOOM_MAX),
	);
	view();
}

// 이벤트 리스너 ---------------------
// 마우스
let isDrag = false;
function handleMousedown() {
	isDrag = true;
}

function handleMousemove(e) {
	if (isDrag) {
		rotateXY(e.movementX, e.movementY);
	}
}

function handleMouseup() {
	isDrag = false;
}

// 터치
const prevTouch = { x: 0, y: 0 };
let prevTouchDistance = 0;

function handleTouchmove(e) {
	const touchPoint = e.touches.length;

	// 회전
	if (touchPoint === 1) {
		const { clientX, clientY } = e.touches[0];
		const deltaX = clientX - prevTouch.x;
		const deltaY = clientY - prevTouch.y;
		rotateXY(deltaX, deltaY);

		prevTouch.x = clientX;
		prevTouch.y = clientY;
	} else if (touchPoint === 2) {
		e.preventDefault(); // 브라우저 확대 축소 방지
		const [touch1, touch2] = e.touches;
		const currentDist = Math.hypot(
			touch2.clientX - touch1.clientX,
			touch2.clientX - touch2.clientY,
		);

		if (prevTouchDistance) {
			const delta = currentDist - prevTouchDistance;
			zoomZ(delta > 0 ? -CAMERA.ZOOM_OFFSET : CAMERA.ZOOM_OFFSET);
		}

		prevTouchDistance = currentDist;
	}
}

const camera = {
	projectionMatrix,
	viewMatrix,
	viewWithoutTranslateMatrix,
	perspective,
	view,
	handleMousedown,
	handleMousemove,
	handleMouseup,
	handleWheel: zoomZ,
	handleTouchmove,
};

export default camera;
