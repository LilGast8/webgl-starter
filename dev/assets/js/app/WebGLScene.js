

global.THREE	= require( 'three.js/three.min' );
require( 'three.js/OrbitControls' );

var Config			= require( 'Config' );
var AbstractView	= require( 'abstracts/AbstractView' );
var MainView		= require( 'MainView' );


class WebGLScene extends AbstractView {
	
	
	constructor() {
		super();
		
		this.scene		= null;
		this.camera		= null;
		this.renderer	= null;
	}
	
	
	init() {
		console.log( '🎥 WebGLScene.init()' );
		
		super.init();
		
		if ( Config.WEBGL_DEBUG )
			this._initHelpers();
	};
	
	
	initDOM() {
		this.$webGLCont = $( document.getElementById( 'webgl-container' ) );
	};
	
	
	initEl() {
		this._initScene();
	};
	
	
	bindEvents() {
		super.bindEvents();
		
		MainView.bind( MainView.E.RAF, this.raf, this );
	};
	
	
	_initScene() {
		this.scene		= new THREE.Scene();
		
		this.camera		= new THREE.PerspectiveCamera( 45, MainView.bW / MainView.wH, 0.1, 10000 );
		this.cameraTg	= new THREE.Vector3( 0, 0, 0 );
		this.camera.lookAt( this.cameraTg );
		this.camera.position.set( 0, 0, 100 );
		
		this.renderer	= new THREE.WebGLRenderer( {
			antialias: true
		} );
		this.renderer.setSize( MainView.bW, MainView.wH );
		this.$webGLCont[0].appendChild( this.renderer.domElement );
	};
	
	
	resize() {
		this.camera.aspect = MainView.bW / MainView.wH;
		this.camera.updateProjectionMatrix();
		
		this.renderer.setSize( MainView.bW, MainView.wH );
	};
	
	
	raf() {
		this.renderer.render( this.scene, this.camera );
	};
	
	
	add( obj ) {
		if ( obj !== null )
			this.scene.add( obj );
	};
	
	
	remove( obj ) {
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
	
	
	disposeGeometry( geometry ) {
		if ( geometry )
			geometry.dispose();
	};
	
	
	disposeMaterial( material ) {
		if ( material )
			material.dispose();
	};
	
	
	disposeTexture( texture ) {
		if ( texture )
			texture.dispose();
	};
	
	
	_initHelpers() {
		var cameraDebug = this.camera.clone();
		this.add( cameraDebug );
		this.camera.far = 100000;
		this.camera.updateProjectionMatrix();
		
		var controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
		
		var cameraHelper = new THREE.CameraHelper( cameraDebug );
		this.add( cameraHelper );
		
		var axisHelper = new THREE.AxisHelper( 300 );
		this.add( axisHelper );
	};	
	
	
}


module.exports = WebGLScene;

