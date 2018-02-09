'use strict';


var MainView	= require( 'MainView' );
var WebGLScene	= require( 'WebGLScene' );
var Lights		= require( 'Lights' );
var Sphere		= require( 'Sphere' );


function App() {
	
}


App.prototype.init = function() {
	console.log( '🐣 App.init()' );
	
	this.initEl();
};


App.prototype.initEl = function() {
	_initScene.call( this );
	// _initLights.call( this );
	_initObjects.call( this );
};


var _initScene = function() {
	this.webGLScene = new WebGLScene();
	this.webGLScene.init();
};

	
var _initLights = function() {
	this.lights = new Lights( this.webGLScene );
	this.lights.init();
};


var _initObjects = function() {
	var sphere = new Sphere( this.webGLScene );
	sphere.init();
};


module.exports = App;

