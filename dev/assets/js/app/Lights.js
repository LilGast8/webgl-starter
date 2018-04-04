

const AbstractView = require( 'abstracts/AbstractView' );


class Lights extends AbstractView {
	
	
	constructor( webGLScene ) {
		super();
		
		this.webGLScene = webGLScene;
	}
	
	
	init() {
		console.log( '💡 Lights.init()' );
		
		super.init();
	};
	
	
	initEl() {
		this._initLights();
	};
	
	
	bindEvents() {
		super.bindEvents();
	};
	
	
	_initLights() {
		this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
		this.webGLScene.add( this.directionalLight );
	};
	
	
}


module.exports = Lights;

