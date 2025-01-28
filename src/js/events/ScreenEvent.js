import { LOCATION_HASH, MSG } from "@/js/constants.js";

const { HOME, MY_COSMOS, HASH_MY_COSMOS } = LOCATION_HASH;

class ScreenEvent {
	/**
	 * 화면에서 발생하는 이벤트
	 * @param {HTMLCanvasElement} canvas
	 */
	constructor(canvas) {
		this.domElements = {
			body: document.body,
			home: document.getElementById("home"),
			homeBackground: document.getElementById("home-background"),
			name: document.getElementById("name"),
			inputCompleteBtn: document.getElementById("input-complete-btn"),
			myCosmos: document.getElementById("my-cosmos"),
		};
		this.canvas = canvas;
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

		// 코스모스 화면 완성 후 주석 해제
		// if (isHashCosmos()) location.hash = "";
	}

	handleResize() {
		this.canvas.setCanvasSize();
	}

	handleHashChange() {
		const isCosmos = this.isHashCosmos();

		this.domElements.homeBackground.contentWindow.postMessage(
			isCosmos ? MSG.CANCLE_BG_ANIMATION : MSG.START_BG_ANIMATION,
			"*",
		);

		this.switchScreen(isCosmos ? MY_COSMOS : HOME);
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

	handleBtnClick() {
		const userInput = this.domElements.name.value.trim();
		if (userInput.length === 0) {
			alert(ERROR_MSG.window);
			return;
		}

		location.hash = HASH_MY_COSMOS;
	}

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
