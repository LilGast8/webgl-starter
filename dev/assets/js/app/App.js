'use strict';


// var DatGUI		= require( 'DatGUI' );
// var glslify		= require( 'glslify' );

var MainView	= require( 'MainView' );
var WebGLScene	= require( 'WebGLScene' );


function App() {
	
}


App.prototype.init = function() {
	console.log( '🐣 App.init()' );
	
	// this.initDOM();
	this.initEl();
	// this.bindEvents();
	
};


App.prototype.initEl = function() {
	this.webGLScene = new WebGLScene();
	this.webGLScene.init();
	
	console.log( this.webGLScene.scene );
};


module.exports = App;

