import "@/style/style.scss";
import Canvas from "@/js/Canvas.js";
import { BACKGROUND } from "@/js/constants.js";
import { randomFloat } from "@/js/utils.js";
import { createShader, createProgram, setUniform1f, setVec3XYZ } from "@/js/gl/glUtils.js";
import vertexSource from "@/home-background/shaders/vertexShader.glsl";
import fragmentSource from "@/home-background/shaders/fragmentShader.glsl";

const {
	STAR_QTY,
	RAIN_STAR_QTY,
	INTENSITY,
	BASE_SIZE,
	SIZE_OFFSET,
	BG_R,
	BG_G,
	BG_B,
	BG_A,
	BASE_FACTOR,
	TIME_OFFSET,
	STAR_COLOR_1,
	STAR_COLOR_2,
	STAR_COLOR_3,
	MIN_POS,
	MAX_POS,
	NEW_Y,
} = BACKGROUND;

const canvas = new Canvas("bg_canvas");
canvas.setCanvasSize();

main();

function main() {
	const gl = canvas.gl;

	const positions = new Float32Array((STAR_QTY + RAIN_STAR_QTY) * 3);
	const rainStarTopEnd = STAR_QTY + RAIN_STAR_QTY / 2;
	const rainStarBottomEnd = STAR_QTY + RAIN_STAR_QTY;

	for (let i = 0; i < STAR_QTY; i++) {
		setVec3XYZ({ positions, idx: i * 3 });
	}
	for (let i = STAR_QTY; i < rainStarTopEnd; i++) {
		setVec3XYZ({ positions, idx: i * 3, y: Math.random() });
	}
	for (let i = rainStarTopEnd; i < rainStarBottomEnd; i++) {
		setVec3XYZ({ positions, idx: i * 3, y: randomFloat(-1, 0) });
	}

	const vertexShader = createShader(gl, vertexSource, gl.VERTEX_SHADER);
	const fragmentShader = createShader(gl, fragmentSource, gl.FRAGMENT_SHADER);
	const program = createProgram(gl, vertexShader, fragmentShader);

	gl.useProgram(program);
	const aPositionLocation = gl.getAttribLocation(program, "a_position");

	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

	const positionArray = gl.createVertexArray();
	gl.bindVertexArray(positionArray);
	gl.enableVertexAttribArray(aPositionLocation);
	gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0);

	setUniform1f(gl, program, "u_intensity", INTENSITY);
	setUniform1f(gl, program, "u_base_size", BASE_SIZE);
	setUniform1f(gl, program, "u_size_offset", SIZE_OFFSET);
	const uFactor1Location = gl.getUniformLocation(program, "u_factor_1");
	const uFactor2Location = gl.getUniformLocation(program, "u_factor_2");
	const uColorLocation = gl.getUniformLocation(program, "u_color");

	function render(time) {
		const uTime = time * 0.001;
		gl.uniform1f(uFactor1Location, BASE_FACTOR + BASE_FACTOR * Math.sin(uTime));
		gl.uniform1f(uFactor2Location, BASE_FACTOR + BASE_FACTOR * Math.sin(uTime + TIME_OFFSET));
		gl.uniform3fv(
			uColorLocation,
			new Float32Array([...STAR_COLOR_1, ...STAR_COLOR_2, ...STAR_COLOR_3]),
		);

		gl.clearColor(BG_R, BG_G, BG_B, BG_A);
		gl.clear(gl.COLOR_BUFFER_BIT);

		for (let i = STAR_QTY; i < rainStarBottomEnd; i++) {
			const idx = i * 3;
			positions[idx] -= randomFloat(MIN_POS, MAX_POS);
			positions[idx + 1] -= randomFloat(MIN_POS, MAX_POS);

			if (positions[idx] < -1 || positions[idx + 1] < -1) {
				setVec3XYZ({ positions, idx, y: randomFloat(NEW_Y, 1) });
			}
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions);

		gl.bindVertexArray(positionArray);
		gl.drawArrays(gl.POINTS, 0, STAR_QTY + RAIN_STAR_QTY);

		requestAnimationFrame(render);
	}

	requestAnimationFrame(render);
}

function handleResize() {
	canvas.setCanvasSize();
}
window.addEventListener("resize", handleResize);
