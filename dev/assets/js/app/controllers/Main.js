

require( 'greensock/TweenMax' );

const CustomEvent		= require( 'events/CustomEvent' );
const Config			= require( 'configs/Config' );
const Screen			= require( 'controllers/Screen' );
const Scroll			= require( 'controllers/Scroll' );
const Mouse				= require( 'controllers/Mouse' );
// const Touch				= require( 'controllers/Touch' );
// const Orientation		= require( 'controllers/Orientation' );
const DOM_				= require( 'utils/DOM' );
const DebugController	= require( 'utils/debug/DebugController' );


class Main extends CustomEvent {
	
	
	constructor() {
		super();
		
		this.E = {
			RAF: 'raf'
		};
	}
	
	
	init() {
		console.log( '🐣 Main.init()' );
		
		this.initDOM();
		this.initEl();
		this.bindEvents();
	}
	
	
	initDOM() {
		this.$window	= $( window );
		this.$html		= $( 'html' );
		this.$body		= $( document.body );
		this.$mainCont	= $( document.getElementById( 'main-container' ) );
		this.$pageCont	= $( document.getElementById( 'page-container' ) );
	}
	
	
	initEl() {
		Screen.init( this.$window, this.$body, this.$pageCont );
		Scroll.init( this, this.$window );
		Mouse.init( this, this.$window, Screen.cX, Screen.cY );
		// Touch.init( this, this.$window, Screen.cX, Screen.cY );
		// Orientation.init( this, this.$window );
		
		this.setClassWebGL();
	}
	
	
	bindEvents() {
		TweenLite.ticker.addEventListener( 'tick', this.raf, this );
	}
	
	
	raf() {
		DebugController.rafStart();
		
		
		this.dispatch( this.E.RAF );
		
		
		DebugController.rafEnd();
	}
	
	
	setClassWebGL() {
		const webGL = Config.HAS_WEBGL === null ? null : Config.HAS_WEBGL ? 'webgl' : 'no-webgl';
		if ( webGL )
			DOM_.addClass( this.$html[0], webGL );
	}
	
	
}


module.exports = new Main();

