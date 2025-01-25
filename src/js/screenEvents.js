import { LOCATION_HASH, MSG } from "@/js/constants.js";

const { HOME, MY_COSMOS, HASH_MY_COSMOS } = LOCATION_HASH;

// dom 요소 관리 ---------------------
export const domElements = {
	body: document.body,
	home: document.getElementById("home"),
	homeBackground: document.getElementById("home-background"),
	name: document.getElementById("name"),
	inputCompleteBtn: document.getElementById("input-complete-btn"),
	myCosmos: document.getElementById("my-cosmos"),
};

// 스크린 관리 ---------------------
export function isHashCosmos() {
	return location.hash == HASH_MY_COSMOS;
}

/**
 * @param {string} screen home | my-cosmos
 */
export function switchScreen(screen) {
	domElements.home.style.display = screen === LOCATION_HASH.HOME ? "flex" : "none";
	domElements.myCosmos.style.display = screen === LOCATION_HASH.MY_COSMOS ? "block" : "none";
}

// 이벤트 리스너 (화면) ---------------------
function handleLoad() {
	domElements.body.style.visibility = "visible";

	// 코스모스 화면 완성 후 주석 해제
	// if (isHashCosmos()) location.hash = "";
}

function handleResize(canvas) {
	canvas.setCanvasSize();
}

function handleHashChange() {
	const isCosmos = isHashCosmos();

	switchScreen(isCosmos ? MY_COSMOS : HOME);

	domElements.homeBackground.contentWindow.postMessage(
		isCosmos ? MSG.CANCLE_BG_ANIMATION : MSG.START_BG_ANIMATION,
	);
}

// 이벤트 리스너 (이름 입력 관련) ---------------------
/**
 * @param {InputEvent} e
 */
function handleInput(e) {
	let { value, maxLength } = e.target;

	if (value.at(0) === " ") {
		value = value.trimStart();
	}
	if (value.length > maxLength) {
		value = value.substr(0, maxLength);
	}
	e.target.value = value;

	domElements.inputCompleteBtn.disabled = value.length === 0;
}

function handleBtnClick() {
	const userInput = domElements.name.value.trim();
	if (userInput.length === 0) {
		alert(ERROR_MSG.window);
		return;
	}

	location.hash = HASH_MY_COSMOS;
}

export const events = {
	handleLoad,
	handleResize,
	handleHashChange,
	handleInput,
	handleBtnClick,
};
