import { useTextureStore } from "@/js/store.js";
import CanvasTexture from "@/js/canvas/CanvasTexture.js";
import GLPipeline from "@/js/gl/GLPipeline.js";
import Camera from "@/js/gl/Camera.js";
import GLTexture from "@/js/gl/GLTexture.js";
import Model from "@/js/gl/Model.js";
import { isNull, randomFloat, randomInt } from "@/js/utils.js";
import {
	LOCATION_HASH,
	PERSPECTIVE_CAMERA,
	MSG,
	COMSMOS_BACKGROUND,
	SCREEN,
} from "@/js/constants.js";

const { HOME, MY_COSMOS, HASH_MY_COSMOS } = LOCATION_HASH;

class ScreenEvent {
	/**
	 * 화면에서 발생하는 이벤트
	 * @param {HTMLCanvasElement} canvas
	 * @param {GLPipeline} cosmosGL
	 * @param {GLPipeline} galaxyGL
	 * @param {Camera} perspCamera
	 */
	constructor(canvas, cosmosGL, galaxyGL, perspCamera) {
		this.getDomElements();

		this.canvas = canvas;
		this.gl = this.canvas.gl;
		this.perspCamera = perspCamera;

		this.cosmosGL = cosmosGL;

		this.galaxyGL = galaxyGL;
		this.galaxyModel = new Model();
		this.galaxyTexture = new GLTexture(this.gl);
		this.galaxyShape = null;

		this.isAnimationStart = true;
		this.animationStartTime = 0;

		this.resizeTimeout = undefined;

		this.getCosmosLocations();
		this.getGalaxyLocations();
	}

	// 멤버 변수 생성 ---------------------
	getDomElements() {
		this.domElements = {
			body: document.body,
			home: document.getElementById("home"),
			homeBackground: document.getElementById("home-background"),
			name: document.getElementById("name"),
			inputCompleteBtn: document.getElementById("input-complete-btn"),
			myCosmos: document.getElementById("my-cosmos"),
		};
	}

	getCosmosLocations() {
		this.cosmosAttribLoc = {
			a_position: this.cosmosGL.getAttribLocation("a_position"),
		};

		this.cosmosUniformLoc = {
			u_projection_mat: this.cosmosGL.getUniformLocation("u_projection_mat"),
			u_view_without_translate_mat: this.cosmosGL.getUniformLocation(
				"u_view_without_translate_mat",
			),
			u_time: this.cosmosGL.getUniformLocation("u_time"),
		};
	}

	getGalaxyLocations() {
		this.galaxyAttribLoc = {
			a_position: this.galaxyGL.getAttribLocation("a_position"),
			a_tex_idx: this.galaxyGL.getAttribLocation("a_tex_idx"),
		};

		this.galaxyUniformLoc = {
			u_projection_mat: this.galaxyGL.getUniformLocation("u_projection_mat"),
			u_view_mat: this.galaxyGL.getUniformLocation("u_view_mat"),
			u_model_mat: this.galaxyGL.getUniformLocation("u_model_mat"),
			u_textures: this.galaxyGL.getUniformLocation("u_textures"),
			u_time: this.galaxyGL.getUniformLocation("u_time"),
			u_resolution: this.galaxyGL.getUniformLocation("u_resolution"),
		};
	}

	// 스크린 관리 ---------------------
	isHashCosmos() {
		return location.hash == HASH_MY_COSMOS;
	}

	/**
	 * @param {string} screen home | my-cosmos
	 */
	switchScreen(screen) {
		this.domElements.home.style.display = screen === LOCATION_HASH.HOME ? "flex" : "none";
		this.domElements.myCosmos.style.display = screen === LOCATION_HASH.MY_COSMOS ? "block" : "none";
	}

	// 은하 모양 관리 ---------------------
	getGalaxyShape() {
		const { galaxyShapes } = useTextureStore.getState();
		return galaxyShapes[randomInt(0, galaxyShapes.length - 1)];
	}

	// 이벤트 리스너 (화면) ---------------------
	handleLoad() {
		this.domElements.body.style.visibility = "visible";
		if (this.isHashCosmos()) location.hash = "";
	}

	handleResize() {
		clearTimeout(this.resizeTimeout);

		this.resizeTimeout = setTimeout(() => {
			this.canvas.setCanvasGLSize();
			this.gl.uniform2f(
				this.galaxyUniformLoc.u_resolution,
				this.gl.canvas.width,
				this.gl.canvas.height,
			);
			this.perspCamera.initCameraAspect(this.gl);
			this.perspCamera.initializeCamera();
		}, SCREEN.RESIZE_DELAY);
	}

	resetGalaxyGLDatas() {
		this.galaxyModel.initModelVars();
		this.galaxyModel.translate();

		this.perspCamera.initCamerSetting();
		this.perspCamera.initializeCamera();

		this.galaxyGL.deleteGLDatas();
	}

	handleHashChange() {
		if (this.isHashCosmos()) {
			this.domElements.homeBackground.contentWindow.postMessage(MSG.CANCLE_BG_ANIMATION, "*");
			this.switchScreen(MY_COSMOS);
			isNull(this.canvas.animationId) && this.canvas.renderAnimation();
		} else {
			this.domElements.homeBackground.contentWindow.postMessage(MSG.START_BG_ANIMATION, "*");
			this.domElements.name.value = "";
			this.domElements.inputCompleteBtn.disabled = true;

			this.resetGalaxyGLDatas();

			this.isAnimationStart = true;
			this.animationStartTime = 0;

			this.switchScreen(HOME);
			!isNull(this.canvas.animationId) && this.canvas.cancelAnimation();
		}
	}

	// 이벤트 리스너 (이름 입력 관련) ---------------------
	/**
	 * @param {InputEvent} e
	 */
	handleInput(e) {
		let { value, maxLength } = e.target;

		if (value.at(0) === " ") {
			value = value.trimStart();
		}
		if (value.length > maxLength) {
			value = value.substr(0, maxLength);
		}
		e.target.value = value;

		this.domElements.inputCompleteBtn.disabled = value.length === 0;
	}

	// 이벤트 리스너 (데이터 gl 바인딩 및 화면전환) ---------------------
	generateCosmosGLDatas() {
		const starPosition = new Float32Array(COMSMOS_BACKGROUND.STAR_QTY * 3);
		for (let i = 0; i < starPosition.length; i += 3) {
			starPosition[i] = randomFloat(-100, 100);
			starPosition[i + 1] = randomFloat(-100, 100);
			starPosition[i + 2] = randomFloat(-100, 100);
		}
		this.cosmosGL.setVertexBuffer({ data: starPosition });

		this.cosmosGL.setVertexArray({
			location: this.cosmosAttribLoc.a_position,
			size: 3,
			type: this.gl.FLOAT,
		});
	}

	generateGalaxyTextureDatas(userInput) {
		// 글자별 캔버스 생성
		const { setTextCanvasDatas } = useTextureStore.getState();
		const textures = userInput.split("");
		textures.unshift(userInput);
		setTextCanvasDatas(textures.map((text) => new CanvasTexture(text).createTextTexture()));

		// galaxy position과 texture 생성
		this.galaxyShape.generatePosition();
		this.galaxyTexture.generateGLTexture2DArray();
	}

	generateGalaxyGLDatas() {
		// 버퍼 생성
		this.galaxyGL.setVertexBuffer({ data: this.galaxyShape.positionTextures });

		// vao 생성
		this.galaxyGL.setVertexArray({
			location: this.galaxyAttribLoc.a_position,
			size: 3,
			type: this.gl.FLOAT,
			stride: 4 * Float32Array.BYTES_PER_ELEMENT,
			offset: 0,
		});
		this.galaxyGL.setVertexArray({
			location: this.galaxyAttribLoc.a_tex_idx,
			size: 1,
			type: this.gl.FLOAT,
			stride: 4 * Float32Array.BYTES_PER_ELEMENT,
			offset: 3 * Float32Array.BYTES_PER_ELEMENT,
		});
	}

	/**
	 * @param {number} uTime
	 */
	renderBackground(uTime) {
		const { u_projection_mat, u_view_without_translate_mat, u_time } = this.cosmosUniformLoc;
		const { projectionMatrix, viewWithoutTranslateMatrix } = this.perspCamera;

		this.cosmosGL.useProgram();
		this.gl.uniformMatrix4fv(u_projection_mat, false, projectionMatrix);
		this.gl.uniformMatrix4fv(u_view_without_translate_mat, false, viewWithoutTranslateMatrix);
		this.gl.uniform1f(u_time, uTime);
		this.cosmosGL.bindAndDrawArrays({
			module: this.gl.POINTS,
			count: COMSMOS_BACKGROUND.STAR_QTY,
		});
	}

	/**
	 * @param {number} uTime
	 */
	renderGalaxy(uTime) {
		const { u_projection_mat, u_view_mat, u_model_mat, u_time, u_resolution, u_textures } =
			this.galaxyUniformLoc;
		const { projectionMatrix, viewMatrix } = this.perspCamera;

		this.galaxyGL.useProgram();
		this.gl.uniformMatrix4fv(u_projection_mat, false, projectionMatrix);
		this.gl.uniformMatrix4fv(u_view_mat, false, viewMatrix);
		this.gl.uniformMatrix4fv(u_model_mat, false, this.galaxyModel.modelMatrix);
		this.gl.uniform1f(u_time, uTime - this.animationStartTime);
		this.gl.uniform2f(u_resolution, this.gl.canvas.width, this.gl.canvas.height);

		this.galaxyTexture.activeTexture2DArray(this.gl.TEXTURE0, u_textures, 0);

		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.depthMask(false);

		this.galaxyGL.bindAndDrawArrays({ module: this.gl.POINTS, count: this.galaxyShape.qty });
	}

	/**
	 * @param {number} uTime
	 */
	animateCosmos(uTime) {
		if (this.isAnimationStart) {
			this.animationStartTime = uTime;
			this.isAnimationStart = false;
		}
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.renderBackground(uTime);
		this.renderGalaxy(uTime);

		this.galaxyModel.rotateZ(0.1);

		if (this.perspCamera.cameraPos[2] < PERSPECTIVE_CAMERA.EYE_END_Z) {
			this.perspCamera.updateZ(uTime);
		}
	}

	handleBtnClick() {
		const userInput = this.domElements.name.value.trim();
		if (userInput.length === 0) {
			alert(ERROR_MSG.window);
			return;
		}

		// galaxy 생성에 필요한 데이터 생성
		this.generateCosmosGLDatas();

		this.galaxyShape = this.getGalaxyShape();
		this.generateGalaxyTextureDatas(userInput);
		this.generateGalaxyGLDatas();

		// 애니메이션 바인딩
		this.canvas.animationFunc = this.animateCosmos.bind(this);

		location.hash = HASH_MY_COSMOS;
	}

	// 이벤트 실행 ---------------------
	addEventListeners() {
		window.addEventListener("DOMContentLoaded", this.handleLoad.bind(this));
		window.addEventListener("load", this.handleLoad.bind(this));
		window.addEventListener("resize", this.handleResize.bind(this));
		window.addEventListener("hashchange", this.handleHashChange.bind(this));
		this.domElements.name.addEventListener("input", (e) => this.handleInput(e));
		this.domElements.inputCompleteBtn.addEventListener("click", this.handleBtnClick.bind(this));
	}
}

export default ScreenEvent;
