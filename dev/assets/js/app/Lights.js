'use strict';


var AbstractView	= require( 'abstracts/AbstractView' );
var MainView		= require( 'MainView' );


function Lights( webGLScene ) {
	AbstractView.call( this );
	
	this.webGLScene = webGLScene;
}


Lights.prototype				= Object.create( AbstractView.prototype );
Lights.prototype.constructor	= Lights;


Lights.prototype.init = function() {
	console.log( '💡 Lights.init()' );
	
	AbstractView.prototype.init.call( this );
};


Lights.prototype.initEl = function() {
	_initLights.call( this );
};


Lights.prototype.bindEvents = function() {
	AbstractView.prototype.bindEvents.call( this );
};


var _initLights = function() {
	this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	this.webGLScene.add( this.directionalLight );
};


module.exports = Lights;

