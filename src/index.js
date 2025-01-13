import { LOCATION_HASH, ERROR_MSG, MSG } from "@/js/constants.js";
import "@/style/style.scss";

const { HOME, MY_COSMOS, HASH_MY_COSMOS } = LOCATION_HASH;
const domElements = {
	body: document.body,
	home: document.getElementById("home"),
	homeBackground: document.getElementById("home-background"),
	name: document.getElementById("name"),
	inputCompleteBtn: document.getElementById("input-complete-btn"),
	myCosmos: document.getElementById("my-cosmos"),
};

function isHashCosmos() {
	return location.hash == HASH_MY_COSMOS;
}

/**
 * @param {string} screen home | my-cosmos
 */
function switchScreen(screen) {
	domElements.home.style.display = screen === LOCATION_HASH.HOME ? "flex" : "none";
	domElements.myCosmos.style.display = screen === LOCATION_HASH.MY_COSMOS ? "block" : "none";
}

// 리스너 ---------------------
function handleLoad() {
	domElements.body.style.visibility = "visible";

	if (isHashCosmos) location.hash = "";
}

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

function handleHashChange() {
	const isCosmos = isHashCosmos();

	switchScreen(isCosmos ? MY_COSMOS : HOME);

	domElements.homeBackground.contentWindow.postMessage(
		isCosmos ? MSG.CANCLE_BG_ANIMATION : MSG.START_BG_ANIMATION,
	);
}

// 이벤트 리스너 등록 ---------------------
window.addEventListener("DOMContentLoaded", handleLoad);
window.addEventListener("load", handleLoad);
window.addEventListener("hashchange", handleHashChange);
domElements.name.addEventListener("input", (e) => handleInput(e));
domElements.inputCompleteBtn.addEventListener("click", handleBtnClick);

switchScreen(isHashCosmos() ? MY_COSMOS : HOME);
