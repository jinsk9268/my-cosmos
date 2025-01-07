/**
 * @param {boolean} isError
 * @param {string} message
 */
export function throwError(message) {
	throw new Error(message);
}

/**
 * @param {any} value
 * @returns {boolean} value가 null이면 true, 아니면 false를 반환
 */
export function isNull(value) {
	return value === null;
}

/**
 * @param {number} min
 * @param {number} max
 * @returns min과 max 사이 랜덤한 수 반환
 */
export function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}
