'use strict';


global.THREE	= require( 'three.js/three.min' );
// require( 'three.js/OrbitControls' );

var MainView	= require( 'MainView' );


function WebGLScene() {
	this.scene		= null;
	this.camera		= null;
	this.renderer	= null;
}


WebGLScene.prototype.init = function() {
	console.log( '🌍 WebGLScene.init()' );
	
	// this.initDOM();
	this.initEl();
	this.bindEvents();
};


WebGLScene.prototype.initEl = function() {
	_initScene.call( this );
};


WebGLScene.prototype.bindEvents = function() {
	MainView.bind( MainView.E.RAF, this.raf, this );
};


var _initScene = function() {
	this.scene		= new THREE.Scene();
	this.camera		= new THREE.PerspectiveCamera( 45, MainView.bW / MainView.wH, 0.1, 10000 );
	this.cameraTg	= new THREE.Vector3( 0, 0, 0 );
	this.camera.lookAt( this.cameraTg );
	
	this.renderer	= new THREE.WebGLRenderer( {
		antialias: true
	} );
	this.renderer.setSize( MainView.bW, MainView.wH );
	MainView.$mainCont[0].appendChild( this.renderer.domElement );
};


WebGLScene.prototype.resize = function() {
	this.camera.aspect = MainView.bW / MainView.wH;
	this.camera.updateProjectionMatrix();
	
	this.renderer.setSize( MainView.bW, MainView.wH );
};


WebGLScene.prototype.raf = function() {
	this.renderer.render( this.scene, this.camera );
};


WebGLScene.prototype.add = function( obj ) {
	if ( obj !== null )
		this.scene.add( obj );
};


WebGLScene.prototype.remove = function( obj ) {
	if ( obj )
		this.scene.remove( obj );
	
	var child;
	for ( var i = 0; i < obj.children.length; i++ ) {
		child = obj.children[ i ];
		
		this.disposeGeometry( child.geometry );
		this.disposeMaterial( child.material );
		this.disposeTexture( child.texture );
	}
};


WebGLScene.prototype.disposeGeometry = function( geometry ) {
	if ( geometry )
		geometry.dispose();
};


WebGLScene.prototype.disposeMaterial = function( material ) {
	if ( material )
		material.dispose();
};


WebGLScene.prototype.disposeTexture = function( texture ) {
	if ( texture )
		texture.dispose();
};


module.exports = WebGLScene;

