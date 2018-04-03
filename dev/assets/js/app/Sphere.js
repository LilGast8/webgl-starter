

// var DatGUI		= require( 'DatGUI' );
var glslify			= require( 'glslify' );

var AbstractView	= require( 'abstracts/AbstractView' );
var MainView		= require( 'MainView' );


class Sphere extends AbstractView {
	
	
	constructor( webGLScene ) {
		super();
		
		this.webGLScene = webGLScene;
		
		this.sphereUniforms	= {};
		this.sphere			= null;
	}
	
	
	init() {
		console.log( '🌍 Sphere.init()' );
		
		super.init();
	};
	
	
	initEl() {
		this._initUniforms();
		this._initObject();
	};
	
	
	bindEvents() {
		super.bindEvents();
		
		MainView.bind( MainView.E.RAF, this.raf, this );
	};
	
	
	raf() {
		
	};
	
	
	_initUniforms() {
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
	
	
	_initObject() {
		var geometry	= new THREE.SphereBufferGeometry( 20, 32, 32 );
		/*var material =  new THREE.MeshPhongMaterial( {
			color: 0xfe7373
		} );*/
		var material	= new THREE.ShaderMaterial( {
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
	
	
}


module.exports = Sphere;

