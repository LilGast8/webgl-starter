'use strict';


// var DatGUI		= require( 'DatGUI' );
var glslify			= require( 'glslify' );

var AbstractView	= require( 'abstracts/AbstractView' );
var MainView		= require( 'MainView' );


function Sphere( webGLScene ) {
	AbstractView.call( this );
	
	this.webGLScene = webGLScene;
	
	this.sphereUniforms	= {};
	this.sphere			= null;
}


Sphere.prototype				= Object.create( AbstractView.prototype );
Sphere.prototype.constructor	= Sphere;


Sphere.prototype.init = function() {
	console.log( '🌍 Sphere.init()' );
	
	AbstractView.prototype.init.call( this );
};


Sphere.prototype.initEl = function() {
	AbstractView.prototype.initEl.call( this );
	
	_initUniforms.call(	this );
	_initObject.call(	this );
};


Sphere.prototype.bindEvents = function() {
	AbstractView.prototype.bindEvents.call( this );
	
	MainView.bind( MainView.E.RAF, this.raf, this );
};


Sphere.prototype.raf = function() {
	
};


var _initUniforms = function() {
	this.sphereUniforms = {
		// diffuse: {
		// 	type:	'c',
		// 	value:	new THREE.Color( 0xd6e5e8 )
		// }
	};
	
	/*this.sphereUniforms = THREE.UniformsUtils.merge( [
		THREE.ShaderLib.phong.uniforms,
		customUniforms
	] );*/
};


var _initObject = function() {
	var geometry	= new THREE.SphereBufferGeometry( 20, 32, 32 );
	var material = new THREE.ShaderMaterial( {
		uniforms:		this.sphereUniforms,
		vertexShader:	glslify( '../../3d/shaders/sphere.vert' ),
		fragmentShader:	glslify( '../../3d/shaders/sphere.frag' ),
		wireframe:		true,
		// lights:			true,
		// transparent:	true,
		// fog:			true,
		// side:			THREE.DoubleSide,
		// visible:		false,
	} );
	this.sphere		= new THREE.Mesh( geometry, material );
	this.webGLScene.add( this.sphere );
};


module.exports = Sphere;

