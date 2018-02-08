'use strict';


global.THREE	= require( 'three.js/three.min' );
// require( 'three.js/OrbitControls' );
var Stats		= require( 'stats.min' );
// var DatGUI		= require( 'DatGUI' );
var glslify		= require( 'glslify' );

var MainView	= require( 'MainView' );


function WebGLScene() {
	
}


WebGLScene.prototype.init = function() {
	console.log( '🌍 WebGLScene.init()' );
	// this.initDOM();
	// this.initEl();
	// this.bindEvents();
	
	console.log( MainView.wW, MainView.wH );
};


module.exports = WebGLScene;

