import "@/style/style.scss";
import Canvas from "@/js/Canvas.js";
import GLPipeline from "@/js/gl/GLPipeline.js";
import { BACKGROUND } from "@/js/constants.js";
import { randomFloat } from "@/js/utils.js";
import { setVec3XYZ } from "@/js/gl/glUtils.js";
import starVertexSource from "@/home-background/shaders/starVertexShader.glsl";
import starFragmentSource from "@/home-background/shaders/starFragmentShader.glsl";
import auroraVertexSource from "@/home-background/shaders/auroraVertexShader.glsl";
import auroraFragmentSource from "@/home-background/shaders/auroraFragmentShader.glsl";

const {
	STATIC_STAR_QTY,
	MOVING_STAR_HALF_QTY,
	STAR_QTY,
	INTENSITY,
	BASE_SIZE,
	SIZE_OFFSET,
	STAR_COLORS,
	AURORA_COLORS,
	AURORA_POS,
	MIN_POS,
	MAX_POS,
	NEW_Y,
} = BACKGROUND;

const canvas = new Canvas("bg_canvas");
canvas.setCanvasSize();

function handleResize() {
	canvas.setCanvasSize();
}
window.addEventListener("resize", handleResize);

main();

function main() {
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
	gl.uniform3fv(auroraGL.getUniformLocation("u_aurora_colors"), new Float32Array(AURORA_COLORS));

	// 별 ---------------------
	const starGL = new GLPipeline(gl, starVertexSource, starFragmentSource);
	starGL.useProgram();

	// 별 버퍼 생성
	const starPosition = getStarPosition();
	const starPositionBuffer = starGL.createBuffer(starPosition);

	// 별 vertexArray 생성
	const starPositionLocation = starGL.getAttribLocation("a_position");
	const starPositionArray = starGL.createVertexArray({
		location: starPositionLocation,
		size: 3,
		type: gl.FLOAT,
	});

	// 별 유니폼
	const starUTimeLocation = starGL.getUniformLocation("u_time");
	gl.uniform1f(starGL.getUniformLocation("u_intensity"), INTENSITY);
	gl.uniform1f(starGL.getUniformLocation("u_base_size"), BASE_SIZE);
	gl.uniform1f(starGL.getUniformLocation("u_size_offset"), SIZE_OFFSET);
	gl.uniform3fv(starGL.getUniformLocation("u_color"), STAR_COLORS);

	function render(time) {
		const uTime = time * 0.001;

		// 오로라 렌더링
		auroraGL.useProgram();
		gl.uniform1f(auroraUTimeLocation, uTime);

		auroraGL.bindAndDrawArrays({
			vertexArray: auroraPositionArray,
			module: gl.TRIANGLE_STRIP,
			count: 4,
		});

		// 별 렌더링
		starGL.useProgram();
		gl.uniform1f(starUTimeLocation, uTime);

		updateStarPosition(starPosition);
		auroraGL.bindBufferSubData(starPositionBuffer, 0, starPosition);

		auroraGL.bindAndDrawArrays({
			vertexArray: starPositionArray,
			module: gl.POINTS,
			count: STAR_QTY,
		});

		requestAnimationFrame(render);
	}

	requestAnimationFrame(render);
}

function getStarPosition() {
	const positions = new Float32Array(STAR_QTY * 3);

	for (let i = 0; i < STATIC_STAR_QTY; i++) {
		setVec3XYZ({ positions, idx: i * 3 });
	}
	for (let i = STATIC_STAR_QTY; i < MOVING_STAR_HALF_QTY; i++) {
		setVec3XYZ({ positions, idx: i * 3, y: Math.random() });
	}
	for (let i = MOVING_STAR_HALF_QTY; i < STAR_QTY; i++) {
		setVec3XYZ({ positions, idx: i * 3, y: randomFloat(-1, 0) });
	}

	return positions;
}

function updateStarPosition(starPosition) {
	for (let i = STATIC_STAR_QTY; i < STAR_QTY; i++) {
		const idx = i * 3;

		if (starPosition[idx] < -1 || starPosition[idx + 1] < -1) {
			setVec3XYZ({ positions: starPosition, idx, y: randomFloat(NEW_Y, 1) });
		} else {
			starPosition[idx] -= randomFloat(MIN_POS, MAX_POS);
			starPosition[idx + 1] -= randomFloat(MIN_POS, MAX_POS);
		}
	}
}
