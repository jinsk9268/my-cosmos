import { useTextureStore } from "@/js/store.js";
import CanvasTexture from "@/js/canvas/CanvasTexture.js";
import GLPipeline from "@/js/gl/GLPipeline";
import Camera from "@/js/gl/Camera";
import GLTexture from "@/js/gl/GLTexture";
import Model from "@/js/gl/Model";
import { isNull, randomInt } from "@/js/utils.js";
import { LOCATION_HASH, MSG } from "@/js/constants.js";

const { HOME, MY_COSMOS, HASH_MY_COSMOS } = LOCATION_HASH;

class ScreenEvent {
	/**
	 * 화면에서 발생하는 이벤트
	 * @param {HTMLCanvasElement} canvas
	 * @param {GLPipeline} galaxyGL
	 * @param {Camera} perspCamera
@param{}
	 */
	constructor(canvas, galaxyGL, perspCamera) {
		this.domElements = {
			body: document.body,
			home: document.getElementById("home"),
			homeBackground: document.getElementById("home-background"),
			name: document.getElementById("name"),
			inputCompleteBtn: document.getElementById("input-complete-btn"),
			myCosmos: document.getElementById("my-cosmos"),
		};

		this.canvas = canvas;
		this.gl = this.canvas.gl;
		this.galaxyGL = galaxyGL;
		this.perspCamera = perspCamera;
		this.galaxyModel = new Model();
		this.galaxyTexture = new GLTexture(this.gl);
		this.galaxyShape = this.getGalaxyShape();

		this.attribLocations = {
			a_position: this.galaxyGL.getAttribLocation("a_position"),
			a_tex_idx: this.galaxyGL.getAttribLocation("a_tex_idx"),
		};

		this.uniformLocations = {
			u_projection_mat: this.galaxyGL.getUniformLocation("u_projection_mat"),
			u_view_mat: this.galaxyGL.getUniformLocation("u_view_mat"),
			u_model_mat: this.galaxyGL.getUniformLocation("u_model_mat"),
			u_textures: this.galaxyGL.getUniformLocation("u_textures"),
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

	// 이벤트 리스너 (화면) ---------------------
	handleLoad() {
		this.domElements.body.style.visibility = "visible";
		if (this.isHashCosmos()) location.hash = "";
	}

	handleResize() {
		this.canvas.setCanvasGLSize();
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
			this.switchScreen(HOME);
			!isNull(this.canvas.animationId) && this.canvas.cancelAnimation();
		}
	}

	// 은하 모양 관리 ---------------------
	getGalaxyShape() {
		const { galaxyShapes } = useTextureStore.getState();
		return galaxyShapes[randomInt(0, galaxyShapes.length - 1)];
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
	generateTextureDatas(userInput) {
		// 글자별 캔버스 생성
		const { setTextCanvasDatas } = useTextureStore.getState();
		const textures = userInput.split("");
		textures.push(userInput);
		setTextCanvasDatas(textures.map((char) => new CanvasTexture(char).createTextTexture()));

		// galaxy position과 texture 생성
		this.galaxyShape.generatePosition();
		this.galaxyTexture.generateGLTextures();
	}

	generateGLDatas() {
		// 버퍼 생성
		this.galaxyGL.setVertexBuffer({ data: this.galaxyShape.positionTextures });

		// vao 생성
		this.galaxyGL.setVertexArray({
			location: this.attribLocations.a_position,
			size: 3,
			type: this.gl.FLOAT,
			stride: 4 * Float32Array.BYTES_PER_ELEMENT,
			offset: 0,
		});
		this.galaxyGL.setVertexArray({
			location: this.attribLocations.a_tex_idx,
			size: 1,
			type: this.gl.FLOAT,
			stride: 4 * Float32Array.BYTES_PER_ELEMENT,
			offset: 3 * Float32Array.BYTES_PER_ELEMENT,
		});
	}

	animateCosmos(uTime) {
		const { u_projection_mat, u_view_mat, u_model_mat, u_textures } = this.uniformLocations;
		const { projectionMatrix, viewMatrix } = this.perspCamera;
		this.galaxyGL.sendUniformMatrix({ location: u_projection_mat, data: projectionMatrix });
		this.galaxyGL.sendUniformMatrix({ location: u_view_mat, data: viewMatrix });
		this.galaxyGL.sendUniformMatrix({ location: u_model_mat, data: this.galaxyModel.modelMatrix });

		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.galaxyTexture.glTextures);
		this.gl.uniform1i(u_textures, 0);

		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.depthMask(false);

		this.galaxyGL.bindAndDrawArrays({ module: this.gl.POINTS, count: this.galaxyShape.qty });

		this.galaxyModel.rotateZ(0.03);
	}

	handleBtnClick() {
		const userInput = this.domElements.name.value.trim();
		if (userInput.length === 0) {
			alert(ERROR_MSG.window);
			return;
		}

		// galaxy 생성에 필요한 데이터 생성
		this.generateTextureDatas(userInput);
		this.generateGLDatas();

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
