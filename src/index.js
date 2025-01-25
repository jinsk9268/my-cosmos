import Canvas from "@/js/Canvas.js";
import GLPipeline from "@/js/gl/GLPipeline.js";
import cosmosVertexSource from "@/shaders/cosmosVertexShader.glsl";
import cosmosFragmentSource from "@/shaders/cosmosFragmentShader.glsl";
import camera from "@/js/gl/camera.js";
import model from "@/js/gl/model.js";
import { domElements, switchScreen, isHashCosmos, events } from "@/js/screenEvents.js";
import { LOCATION_HASH } from "@/js/constants.js";
import { numArrToF32Arr } from "./js/gl/glUtils";

import "@/style/style.scss";

// 캔버스 ---------------------
const canvas = new Canvas("cosmos-canvas");
canvas.setCanvasSize();
const gl = canvas.gl;

// 카메라 ---------------------
camera.perspective({ aspect: canvas.aspect });
camera.view();
model.translate();

// GL 생성 ---------------------
// 프로그램 생성
const cosmosGL = new GLPipeline(gl, cosmosVertexSource, cosmosFragmentSource);
cosmosGL.useProgram();

// 버퍼 생성 - 테스트용
const testVertices = numArrToF32Arr(
	[
		[0.0, 0.5, 0.0], // 위
		[-0.5, -0.5, 0.0], // 왼쪽
		[0.5, -0.5, 0.0], // 오른쪽
	].flat(),
);
cosmosGL.createBuffer({ data: testVertices });

// vertex array 생성
const cosmosPositionLocation = cosmosGL.getAttribLocation("a_position");
cosmosGL.createVertexArray({ location: cosmosPositionLocation, size: 3, type: gl.FLOAT });

// 유니폼
const uProjectionMatLocation = cosmosGL.getUniformLocation("u_projection_mat");
const uViewMatLocation = cosmosGL.getUniformLocation("u_view_mat");
const uModelMatLocation = cosmosGL.getUniformLocation("u_model_mat");

// 랜더
function render() {
	let then = document.timeline.currentTime;

	function frame(now) {
		const delta = now - then;

		if (delta >= canvas.interval) {
			gl.clearColor(0, 0, 0, 1);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			gl.uniformMatrix4fv(uProjectionMatLocation, false, camera.projectionMatrix);
			gl.uniformMatrix4fv(uViewMatLocation, false, camera.viewMatrix);
			gl.uniformMatrix4fv(uModelMatLocation, false, model.modelMatrix);

			cosmosGL.bindAndDrawArrays({ module: gl.TRIANGLES, count: 3 });

			then = now - (delta % canvas.interval);
		}

		requestAnimationFrame(frame);
	}

	requestAnimationFrame(frame);
}

// 이벤트 리스너 등록 ---------------------
// screen 관련 이벤트
window.addEventListener("DOMContentLoaded", events.handleLoad);
window.addEventListener("load", events.handleLoad);
window.addEventListener("resize", () => events.handleResize(canvas));
window.addEventListener("hashchange", events.handleHashChange);
domElements.name.addEventListener("input", (e) => events.handleInput(e));
domElements.inputCompleteBtn.addEventListener("click", events.handleBtnClick);

// 카메라 관련 이벤트 (마우스)
domElements.myCosmos.addEventListener("mousedown", camera.handleMousedown);
domElements.myCosmos.addEventListener("mousemove", (e) => camera.handleMousemove(e));
domElements.myCosmos.addEventListener("mouseup", camera.handleMouseup);
domElements.myCosmos.addEventListener("wheel", (e) => camera.handleWheel(e.deltaZ));

// 카메라 관련 이벤트 (터치)
domElements.myCosmos.addEventListener("touchmove", (e) => camera.handleTouchmove(e), {
	passive: false,
});

switchScreen(isHashCosmos() ? LOCATION_HASH.MY_COSMOS : LOCATION_HASH.HOME);
