'use strict';


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
};


module.exports = App;

