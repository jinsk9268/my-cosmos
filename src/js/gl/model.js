import { mat4 } from "gl-matrix";
import { degreeToRadian } from "@/js/utils.js";
import { MODEL } from "@/js/constants.js";

class Model {
	constructor() {
		this.modelMatrix = mat4.create();
		this.initModelVars();

		this.translate();
	}

	initModelVars() {
		this.translatePos = MODEL.CENTER;
	}

	translate() {
		mat4.translate(this.modelMatrix, this.modelMatrix, this.translatePos);
	}

	/**
	 * @param {number} degree
	 */
	rotateX(degree) {
		mat4.rotateX(this.modelMatrix, this.modelMatrix, degreeToRadian(degree));
	}

	/**
	 * @param {number} degree
	 */
	rotateY(degree) {
		mat4.rotateY(this.modelMatrix, this.modelMatrix, degreeToRadian(degree));
	}

	/**
	 * @param {number} degree
	 */
	rotateZ(degree) {
		mat4.rotateZ(this.modelMatrix, this.modelMatrix, degreeToRadian(degree));
	}
}

export default Model;
