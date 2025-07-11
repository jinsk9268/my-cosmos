import "@/style/style.scss";
import CanvasGL from "@/js/canvas/CanvasGL.js";
import FermatSpiral from "@/js/shape/FermatSpiral.js";
import starVertexSource from "@/home-background/shaders/starVertexShader.glsl";
import starFragmentSource from "@/home-background/shaders/starFragmentShader.glsl";
import auroraVertexSource from "@/home-background/shaders/auroraVertexShader.glsl";
import auroraFragmentSource from "@/home-background/shaders/auroraFragmentShader.glsl";
import GLPipeline from "@/js/gl/GLPipeline.js";
import GLTexture from "@/js/gl/GLTexture.js";
import { HOME_BACKGROUND, MSG, SCREEN } from "@/js/constants.js";
import { isNull } from "@/js/utils.js";

const { STAR } = HOME_BACKGROUND;

// Canvas ---------------------
const canvas = new CanvasGL("bg_canvas");
const gl = canvas.gl;

// 오로라 ---------------------
const auroraGL = new GLPipeline(gl, auroraVertexSource, auroraFragmentSource);
auroraGL.useProgram();

// 오로라 버퍼 생성
auroraGL.setVertexBuffer({ data: HOME_BACKGROUND.POS });

// 오로라 vertexArray 생성
const auroraPositionLocation = auroraGL.getAttribLocation("a_position");
auroraGL.setVertexArray({ location: auroraPositionLocation, size: 2, type: gl.FLOAT });

// 오로라 유니폼
const auroraUTimeLocation = auroraGL.getUniformLocation("u_time");
const auroraUTextureLocation = auroraGL.getUniformLocation("u_texture");
const auroraUResolution = auroraGL.getUniformLocation("u_resolution");

// 오로라 텍스쳐 생성
const auroraTexture = new GLTexture(gl);
auroraTexture.createImageTexture("/my-cosmos/images/texture.webp");
auroraTexture.activeTexture(gl.TEXTURE0, auroraUTextureLocation, 0);

// 별 ---------------------
const starGL = new GLPipeline(gl, starVertexSource, starFragmentSource);
starGL.useProgram();

// 별 버퍼 생성 (포지션은 페르마 양방향 나선 기반)
const fermatStar = new FermatSpiral({
	qty: STAR.QTY,
	thetaOffset: STAR.THETA_OFFSET,
	radiusMin: STAR.RADIUS_MIN,
	twoWay: true,
	scale: STAR.RADIUS_SCALE,
	needTexture: false,
});
fermatStar.generatePosition();

starGL.setVertexBuffer({ data: fermatStar.positionPoints });

// 별 vertexArray 생성
const starPositionLocation = starGL.getAttribLocation("a_position");
starGL.setVertexArray({ location: starPositionLocation, size: 3, type: gl.FLOAT });

// 별 유니폼 ---------------------
const starUTimeLocation = starGL.getUniformLocation("u_time");
const isMobileULocation = starGL.getUniformLocation("u_is_mobile");
gl.uniform3fv(starGL.getUniformLocation("u_colors"), STAR.U_COLORS);

// 홈 배경화면 render ---------------------
// 오로라 render
function renderAurora(uTime) {
	auroraGL.useProgram();
	gl.uniform1f(auroraUTimeLocation, uTime);
	gl.uniform2f(auroraUResolution, gl.canvas.width, gl.canvas.height);

	auroraGL.bindAndDrawArrays({ module: gl.TRIANGLE_STRIP, count: 4 });
}

// 별 render
function renderStar(uTime) {
	starGL.useProgram();
	gl.uniform1f(starUTimeLocation, uTime);
	gl.uniform1i(isMobileULocation, SCREEN.MOBILE.test(navigator.userAgent) ? 1 : 0);

	starGL.bindAndDrawArrays({ module: gl.POINTS, count: STAR.QTY });
}

function renderBackground(uTime) {
	renderAurora(uTime);
	renderStar(uTime);
}
canvas.animationFunc = renderBackground;

// 이벤트 리스너 ---------------------
function handleLoad() {
	document.body.style.visibility = "visible";

	if (isNull(canvas.animationId)) {
		canvas.renderAnimation();
	}
}

function handleResize() {
	canvas.setCanvasGLSize();
}

/**
 * @param {MessageEvent} e
 */
function handleMessage(e) {
	if (e.data === MSG.CANCLE_BG_ANIMATION && !isNull(canvas.animationId)) {
		canvas.cancelAnimation();
	}
	if (e.data === MSG.START_BG_ANIMATION && isNull(canvas.animationId)) {
		canvas.renderAnimation();
	}
}

// 이벤트 리스너 등록 ---------------------
window.addEventListener("DOMContentLoaded", handleLoad);
window.addEventListener("load", handleLoad);
window.addEventListener("resize", handleResize);
window.addEventListener("message", (e) => handleMessage(e));
