/**
 * @param {boolean} isError
 * @param {string} message
 */
export function checkError(isError, message) {
	if (isError) {
		throw new Error(message);
	}
}

/**
 * @param {any} value
 * @returns {boolean} value가 null이면 true, 아니면 false를 반환
 */
export function isNull(value) {
	return value === null;
}
