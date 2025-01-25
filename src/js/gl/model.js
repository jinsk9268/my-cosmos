import { mat4 } from "gl-matrix";
import { degreeToRadian } from "@/js/utils.js";
import { MODEL } from "@/js/constants.js";

const modelMatrix = mat4.create();

/**
 * @param {number[]} translatePos
 */
function translate(translatePos = MODEL.CENTER) {
	mat4.translate(modelMatrix, modelMatrix, translatePos);
}

/**
 * @param {number} degree
 */
function rotateX(degree) {
	mat4.rotateX(modelMatrix, modelMatrix, degreeToRadian(degree));
}

/**
 * @param {number} degree
 */
function rotateY(degree) {
	mat4.rotateY(modelMatrix, modelMatrix, degreeToRadian(degree));
}

/**
 * @param {number} degree
 */
function rotateZ(degree) {
	mat4.rotateZ(modelMatrix, modelMatrix, degreeToRadian(degree));
}

const model = { modelMatrix, translate, rotateX, rotateY, rotateZ };

export default model;
