

const WebGLScene	= require( 'views/WebGLScene' );
const Lights		= require( 'views/Lights' );
const Sphere		= require( 'views/Sphere' );


class App {
	
	
	constructor() {
		
	}
	
	
	init() {
		console.log( '🐣 App.init()' );
		
		this.initEl();
	}
	
	
	initEl() {
		this._initScene();
		// this._initLights();
		this._initObjects();
	}
	
	
	_initScene() {
		this.webGLScene = new WebGLScene();
		this.webGLScene.init();
	}
	
		
	_initLights() {
		this.lights = new Lights( this.webGLScene );
		this.lights.init();
	}
	
	
	_initObjects() {
		const sphere = new Sphere( this.webGLScene );
		sphere.init();
	}
	
	
}


module.exports = App;

