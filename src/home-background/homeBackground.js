import "@/style/style.scss";
import Canvas from "@/js/Canvas.js";
import { BACKGROUND } from "@/js/constants.js";
import { randomFloat } from "@/js/utils.js";
import { createShader, createProgram, setUniform1f } from "@/js/gl/glUtils.js";
import vertexSource from "@/home-background/shaders/vertexShader.glsl";
import fragmentSource from "@/home-background/shaders/fragmentShader.glsl";

const { STAR_QTY, INTENSITY, BASE_SIZE, SIZE_OFFSET, BG_R, BG_G, BG_B, BG_A } = BACKGROUND;

const canvas = new Canvas("bg_canvas");
canvas.setCanvasSize();

main();

function main() {
	const gl = canvas.gl;

	const positions = new Float32Array(STAR_QTY * 3);
	for (let i = 0; i < STAR_QTY * 3; i++) {
		positions[i] = randomFloat(-1, 1);
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
	const uTimeLocation = gl.getUniformLocation(program, "u_time");

	function render(time) {
		gl.uniform1f(uTimeLocation, time * 0.001);

		gl.clearColor(BG_R, BG_G, BG_B, BG_A);
		gl.clear(gl.COLOR_BUFFER_BIT);

		gl.bindVertexArray(positionArray);
		gl.drawArrays(gl.POINTS, 0, STAR_QTY);

		requestAnimationFrame(render);
	}

	requestAnimationFrame(render);
}

function handleResize() {
	canvas.setCanvasSize();
}
window.addEventListener("resize", handleResize);
