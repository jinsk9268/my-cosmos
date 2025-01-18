import "@/style/style.scss";
import Canvas from "@/js/Canvas.js";
import GLPipeline from "@/js/gl/GLPipeline.js";
import { BACKGROUND, MSG } from "@/js/constants.js";
import { randomFloat, isNull } from "@/js/utils.js";
import { setVec3XYZ } from "@/js/gl/glUtils.js";
import starVertexSource from "@/home-background/shaders/starVertexShader.glsl";
import starFragmentSource from "@/home-background/shaders/starFragmentShader.glsl";
import auroraVertexSource from "@/home-background/shaders/auroraVertexShader.glsl";
import auroraFragmentSource from "@/home-background/shaders/auroraFragmentShader.glsl";

const {
	AURORA_POS,
	AURORA_UNIFORMS,
	MOVING_STAR_HALF_QTY,
	STATIC_STAR_QTY,
	STAR_QTY,
	STAR_UNIFORMS_V,
	STAR_UNIFORMS_F,
	MIN_POS,
	MAX_POS,
	NEW_Y,
} = BACKGROUND;

// Canvas ---------------------
const canvas = new Canvas("bg_canvas");
canvas.setCanvasSize();
const gl = canvas.gl;

// 오로라 ---------------------
const auroraGL = new GLPipeline(gl, auroraVertexSource, auroraFragmentSource);
auroraGL.useProgram();

// 오로라 버퍼 생성
auroraGL.createBuffer(AURORA_POS);

// 오로라 vertexArray 생성
const auroraPositionLocation = auroraGL.getAttribLocation("a_position");
const auroraPositionArray = auroraGL.createVertexArray({
	location: auroraPositionLocation,
	size: 2,
	type: gl.FLOAT,
});

// 오로라 유니폼
const auroraUTimeLocation = auroraGL.getUniformLocation("u_time");
auroraGL.sendUniformStruct("u_aurora", AURORA_UNIFORMS);

// 별 ---------------------
const starGL = new GLPipeline(gl, starVertexSource, starFragmentSource);
starGL.useProgram();

// 별 버퍼 생성
const starPosition = new Float32Array(STAR_QTY * 3);
for (let i = 0; i < STATIC_STAR_QTY; i++) {
	setVec3XYZ({ positions: starPosition, idx: i * 3 });
}
for (let i = STATIC_STAR_QTY; i < MOVING_STAR_HALF_QTY; i++) {
	setVec3XYZ({ positions: starPosition, idx: i * 3, y: Math.random() });
}
for (let i = MOVING_STAR_HALF_QTY; i < STAR_QTY; i++) {
	setVec3XYZ({ positions: starPosition, idx: i * 3, y: randomFloat(-1, 0) });
}

const starPositionBuffer = starGL.createBuffer(starPosition);

// 별 vertexArray 생성
const starPositionLocation = starGL.getAttribLocation("a_position");
const starPositionArray = starGL.createVertexArray({
	location: starPositionLocation,
	size: 3,
	type: gl.FLOAT,
});

// 별 유니폼 ---------------------
const starUTimeLocation = starGL.getUniformLocation("u_time");
starGL.sendUniformStruct("u_star_v", STAR_UNIFORMS_V);
starGL.sendUniformStruct("u_star_f", STAR_UNIFORMS_F);

// 애니메이션 ---------------------
// 오로라 render
function renderAurora(uTime) {
	auroraGL.useProgram();
	gl.uniform1f(auroraUTimeLocation, uTime);

	auroraGL.bindAndDrawArrays({
		vertexArray: auroraPositionArray,
		module: gl.TRIANGLE_STRIP,
		count: 4,
	});
}

// 별 render
function renderStar(uTime) {
	starGL.useProgram();
	gl.uniform1f(starUTimeLocation, uTime);

	for (let i = STATIC_STAR_QTY; i < STAR_QTY; i++) {
		const idx = i * 3;

		if (starPosition[idx] < -1 || starPosition[idx + 1] < -1) {
			setVec3XYZ({ positions: starPosition, idx, y: randomFloat(NEW_Y, 1) });
		}
		starPosition[idx] -= randomFloat(MIN_POS, MAX_POS);
		starPosition[idx + 1] -= randomFloat(MIN_POS, MAX_POS);
	}

	starGL.bindBufferSubData(starPositionBuffer, 0, starPosition);
	starGL.bindAndDrawArrays({
		vertexArray: starPositionArray,
		module: gl.POINTS,
		count: STAR_QTY,
	});
}

// 배경화면 render
let then = document.timeline.currentTime;
function renderBackground() {
	function frame(now) {
		const delta = now - then;

		if (delta >= canvas.interval) {
			const uTime = now * 0.001; // ms -> sec로 변환하여 GLSL 사용
			renderAurora(uTime);
			renderStar(uTime);

			then = now - (delta % canvas.interval);
		}

		canvas.animationId = requestAnimationFrame(frame);
	}

	canvas.animationId = requestAnimationFrame(frame);
}

// 이벤트 리스너 ---------------------
function handleLoad() {
	document.body.style.visibility = "visible";
}

function handleResize() {
	canvas.setCanvasSize();
}

/**
 * @param {MessageEvent} e
 */
function handleMessage(e) {
	if (e.data === MSG.CANCLE_BG_ANIMATION && !isNull(canvas.animationId)) {
		cancelAnimationFrame(canvas.animationId);
		canvas.animationId = null;
	}
	if (e.data === MSG.START_BG_ANIMATION && isNull(canvas.animationId)) {
		renderBackground();
	}
}

// 실행 ---------------------
window.addEventListener("DOMContentLoaded", handleLoad);
window.addEventListener("load", handleLoad);
window.addEventListener("resize", handleResize);
window.addEventListener("message", (e) => handleMessage(e));
renderBackground();
