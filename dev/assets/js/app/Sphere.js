

const glslify		= require( 'glslify' );

const AbstractView	= require( 'abstracts/AbstractView' );
const Main			= require( 'Main' );


class Sphere extends AbstractView {
	
	
	constructor( webGLScene ) {
		super();
		
		this.webGLScene		= webGLScene;
		
		this.sphereUniforms	= {};
		this.sphere			= null;
	}
	
	
	init() {
		console.log( '🌍 Sphere.init()' );
		
		super.init();
	}
	
	
	initEl() {
		this._initUniforms();
		this._initObject();
	}
	
	
	bindEvents() {
		super.bindEvents();
		
		Main.bind( Main.E.RAF, this.raf, this );
	}
	
	
	raf() {
		
	}
	
	
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
	}
	
	
	_initObject() {
		const geometry	= new THREE.SphereBufferGeometry( 20, 32, 32 );
		/*const material =  new THREE.MeshPhongMaterial( {
			color: 0xfe7373
		} );*/
		const material	= new THREE.ShaderMaterial( {
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
	}
	
	
}


module.exports = Sphere;

