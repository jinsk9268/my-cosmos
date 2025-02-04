import CanvasGL from "@/js/canvas/CanvasGL.js";
import GLPipeline from "@/js/gl/GLPipeline.js";
import galaxyVertexSource from "@/shaders/galaxyVertexShader.glsl";
import galaxyFragmentSource from "@/shaders/galaxyFragmentShader.glsl";
import Camera from "@/js/gl/Camera.js";
import ScreenEvent from "@/js/events/ScreenEvent.js";
import CameraEvent from "@/js/events/CameraEvent.js";
import Sphere from "@/js/shape/Sphere.js";
import FermatSprial from "@/js/shape/FermatSpiral.js";
import SpiralCore from "@/js/shape/SpiralCore";
import { useTextureStore } from "@/js/store.js";
import { LOCATION_HASH, SHAPE_TYPE } from "@/js/constants.js";

import "@/style/style.scss";

// 캔버스
const canvas = new CanvasGL("cosmos-canvas");
const gl = canvas.gl;

// GL 생성
const galaxyGL = new GLPipeline(gl, galaxyVertexSource, galaxyFragmentSource);
galaxyGL.useProgram();

// 은하 모양 생성
const { setGalaxyShapes } = useTextureStore.getState();
setGalaxyShapes([
	new Sphere(SHAPE_TYPE.SPHERE),
	new FermatSprial(SHAPE_TYPE.FERMAT_SPIRAL_TORUS),
	new FermatSprial(SHAPE_TYPE.FERMAT_SPIRAL_WHIRL),
	new FermatSprial(SHAPE_TYPE.FERMAT_SPIRAL_FLOWER),
	new SpiralCore(SHAPE_TYPE.SPIRAL_ARM_2),
	new SpiralCore(SHAPE_TYPE.SPIRAL_ARM_4),
	new SpiralCore(SHAPE_TYPE.SPIRAL_ARM_5),
]);

// 카메라
const perspCamera = new Camera(gl);

// 이벤트
const screenEvent = new ScreenEvent(canvas, galaxyGL, perspCamera);
const cameraEvent = new CameraEvent(perspCamera);

// 이벤트 리스너 등록
screenEvent.addEventListeners();
cameraEvent.addEventListeners();

// 맨 처음 로드 시 화면 전환
screenEvent.switchScreen(screenEvent.isHashCosmos() ? LOCATION_HASH.MY_COSMOS : LOCATION_HASH.HOME);
