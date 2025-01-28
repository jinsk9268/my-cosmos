import Canvas from "@/js/Canvas.js";
import GLPipeline from "@/js/gl/GLPipeline.js";
import cosmosVertexSource from "@/shaders/cosmosVertexShader.glsl";
import cosmosFragmentSource from "@/shaders/cosmosFragmentShader.glsl";
import Camera from "@/js/gl/Camera.js";
import Model from "@/js/gl/Model.js";
import ScreenEvent from "@/js/events/ScreenEvent.js";
import CameraEvent from "@/js/events/CameraEvent.js";
import { LOCATION_HASH } from "@/js/constants.js";

import "@/style/style.scss";

// 캔버스 ---------------------
const canvas = new Canvas("cosmos-canvas");
canvas.setCanvasSize();
const gl = canvas.gl;

// 카메라 ---------------------
const perspCamera = new Camera(gl);
const galaxyModel = new Model();

// 이벤트 ---------------------
const screenEvent = new ScreenEvent(canvas);
const cameraEvent = new CameraEvent(perspCamera);

// GL 생성 ---------------------
// 프로그램 생성
const cosmosGL = new GLPipeline(gl, cosmosVertexSource, cosmosFragmentSource);
cosmosGL.useProgram();

// TODO: 버퍼 생성

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
			gl.enable(gl.DEPTH_TEST);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			gl.uniformMatrix4fv(uProjectionMatLocation, false, perspCamera.projectionMatrix);
			gl.uniformMatrix4fv(uViewMatLocation, false, perspCamera.viewMatrix);
			gl.uniformMatrix4fv(uModelMatLocation, false, galaxyModel.modelMatrix);

			// TODO: 그리기

			then = now - (delta % canvas.interval);
		}

		requestAnimationFrame(frame);
	}

	requestAnimationFrame(frame);
}
render();

// 이벤트 리스너 등록 ---------------------
screenEvent.addEventListeners();
cameraEvent.addEventListeners();

// 맨 처음 로드 시 화면 전환
screenEvent.switchScreen(screenEvent.isHashCosmos() ? LOCATION_HASH.MY_COSMOS : LOCATION_HASH.HOME);
