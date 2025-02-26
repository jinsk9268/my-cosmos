import Camera from "@/js/gl/Camera.js";

class CameraEvent {
	/**
	 * 카메라 관련 이벤트
	 * @param {Camera} camera
	 */
	constructor(camera) {
		this.cosmosCanvas = document.getElementById("cosmos-canvas");
		this.camera = camera;

		this.initCameraVars();
	}

	initCameraVars() {
		this.isDrag = false;
		this.prevTouch = { x: 0, y: 0 };
		this.prevTouchDistance = 0;
	}

	handleMousedown() {
		this.isDrag = true;
	}

	/**
	 * @param {MouseEvent} e
	 */
	handleMousemove(e) {
		if (this.isDrag) {
			this.camera.translateXY(e.movementX, e.movementY);
		}
	}

	handleMouseup() {
		this.isDrag = false;
	}

	/**
	 * @param {TouchEvent} e
	 */
	handleTouchmove(e) {
		const touchPoint = e.touches.length;

		if (touchPoint === 1) {
			const { clientX, clientY } = e.touches[0];
			const deltaX = clientX - this.prevTouch.x;
			const deltaY = clientY - this.prevTouch.y;
			this.camera.translateXY(deltaX, deltaY);

			this.prevTouch.x = clientX;
			this.prevTouch.y = clientY;
		} else if (touchPoint === 2) {
			e.preventDefault(); // 브라우저 확대 축소 방지
			const [touch1, touch2] = e.touches;
			const currentDist = Math.hypot(
				touch2.clientX - touch1.clientX,
				touch2.clientX - touch2.clientY,
			);

			if (this.prevTouchDistance) {
				const delta = currentDist - this.prevTouchDistance;
				this.camera.zoomZ(this.camera.zoomOffset * (delta >= 0 ? -1 : 1));
			}

			this.prevTouchDistance = currentDist;
		}
		this.camera.lookAt();
	}

	addEventListeners() {
		// 카메라 관련 이벤트 (마우스)
		this.cosmosCanvas.addEventListener("mousedown", this.handleMousedown.bind(this));
		this.cosmosCanvas.addEventListener("mousemove", (e) => this.handleMousemove(e));
		this.cosmosCanvas.addEventListener("mouseup", this.handleMouseup.bind(this));
		this.cosmosCanvas.addEventListener("wheel", (e) => this.zoomZ(e.deltaZ));

		// 카메라 관련 이벤트 (터치)
		this.cosmosCanvas.addEventListener("touchmove", (e) => this.handleTouchmove(e), {
			passive: false,
		});
	}
}

export default CameraEvent;
