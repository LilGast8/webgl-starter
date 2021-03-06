

global.THREE = require( 'three' );
require( 'three/examples/js/controls/OrbitControls' );

const AbstractView	= require( 'abstracts/AbstractView' );
const Config		= require( 'configs/Config' );
const Main			= require( 'controllers/Main' );
const Screen		= require( 'controllers/Screen' );


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
	}
	
	
	initDOM() {
		this.$webGLCont = $( document.getElementById( 'webgl-container' ) );
	}
	
	
	initEl() {
		this._initScene();
	}
	
	
	bindEvents() {
		super.bindEvents();
		
		Main.bind( Main.E.RAF, this.raf, this );
	}
	
	
	_initScene() {
		this.scene		= new THREE.Scene();
		
		this.camera		= new THREE.PerspectiveCamera( 45, Screen.bW / Screen.wH, 0.1, 10000 );
		this.cameraTg	= new THREE.Vector3( 0, 0, 0 );
		this.camera.lookAt( this.cameraTg );
		this.camera.position.set( 0, 0, 100 );
		
		this.renderer	= new THREE.WebGLRenderer( {
			antialias: true
		} );
		this.renderer.setSize( Screen.bW, Screen.wH );
		this.$webGLCont[0].appendChild( this.renderer.domElement );
	}
	
	
	resize() {
		this.camera.aspect = Screen.bW / Screen.wH;
		this.camera.updateProjectionMatrix();
		
		this.renderer.setSize( Screen.bW, Screen.wH );
	}
	
	
	raf() {
		this.renderer.render( this.scene, this.camera );
		if ( Config.WEBGL_DEBUG )
			this.renderer.render( this.scene, this.cameraDebug );
	}
	
	
	add( obj ) {
		if ( obj !== null )
			this.scene.add( obj );
	}
	
	
	remove( obj ) {
		if ( obj )
			this.scene.remove( obj );
		
		for ( let i = 0; i < obj.children.length; i++ ) {
			const child = obj.children[ i ];
			
			this.disposeGeometry( child.geometry );
			this.disposeMaterial( child.material );
			this.disposeTexture( child.texture );
		}
	}
	
	
	disposeGeometry( geometry ) {
		if ( geometry )
			geometry.dispose();
	}
	
	
	disposeMaterial( material ) {
		if ( material )
			material.dispose();
	}
	
	
	disposeTexture( texture ) {
		if ( texture )
			texture.dispose();
	}
	
	
	_initHelpers() {
		this.cameraDebug = new THREE.PerspectiveCamera( 45, Screen.bW / Screen.wH, 0.1, 10000000 );
		this.cameraDebug.position.set( 150, 80, 150 );
		this.add( this.cameraDebug );
		
		const controls = new THREE.OrbitControls( this.cameraDebug, this.renderer.domElement );
		
		const cameraHelper = new THREE.CameraHelper( this.camera );
		this.add( cameraHelper );
		
		const axesHelper = new THREE.AxesHelper( 300 );
		this.add( axesHelper );
	}
	
	
}


module.exports = WebGLScene;

