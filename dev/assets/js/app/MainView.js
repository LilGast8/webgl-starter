

require( 'greensock/TweenMax' );

var CustomEvent		= require( 'CustomEvent' );
var Config			= require( 'Config' );
var FPSStats		= require( 'utils/FPSStats' );
var Math_			= require( 'utils/Math' );


class  MainView extends CustomEvent {
	
	
	constructor() {
		super();
		
		this.E = {
			RESIZE:			'resize',
			RAF:			'raf',
			MOUSE_MOVE:		'mousemove',
			MOUSE_DOWN:		'mousedown',
			MOUSE_UP:		'mouseup',
			TOUCH_MOVE:		'touchmove',
			TOUCH_START:	'touchstart',
			TOUCH_END:		'touchend',
			WINDOW_OUT:		'windowout',
			WINDOW_IN:		'windowin'
		};
		
		this.bW		= null; // body width
		this.bH		= null; // body height
		this.wW		= null; // window width
		this.wH		= null; // window height
		this.cX		= null; // center X
		this.cY		= null; // center Y
		this.sY		= null; // scroll Y
		this.siY	= null; // scroll inertia Y
		this.mX		= null; // mouse X
		this.mY		= null; // mouse Y
		this.miX	= null; // mouse inertia X
		this.miY	= null; // mouse inertia Y
		this.tX		= null; // touch X
		this.tY		= null; // touch Y
		
		this.SCROLL_INERTIA		= 0.09;
		this.MOUSE_INERTIA		= 0.05;
		
		this.isWindowFocused	= true;
	}
	
	
	init() {
		console.log( '🐣 MainView.init()' );
		
		this.initDOM();
		this.initEl();
		this.bindEvents();
		
		this.resize();
	};
	
	
	initDOM() {
		this.$window	= $( window );
		this.$html		= $( 'html' );
		this.$body		= $( document.body );
		this.$mainCont	= $( document.getElementById( 'main-container' ) );
	};
	
	
	initEl() {
		if ( Config.IS_DEV )
			FPSStats.init();
	};
	
	
	bindEvents() {
		this.$window.on( 'resize', $.proxy( this.resize, this ) );
		TweenLite.ticker.addEventListener( 'tick', this.raf, this );
		this.$window.on( 'mousemove', $.proxy( this.mouseMove, this ) );
		// this.$window.on( 'mousedown', $.proxy( this.mouseDown, this ) );
		// this.$window.on( 'mouseup', $.proxy( this.mouseUp, this ) );
		// this.$window.on( 'touchmove', $.proxy( this.touchMove, this ) );
		// this.$window.on( 'touchstart', $.proxy( this.touchStart, this ) );
		// this.$window.on( 'touchend', $.proxy( this.touchEnd, this ) );
		// this.$window.on( 'blur', $.proxy( this.windowOut, this ) );
		// this.$window.on( 'focus', $.proxy( this.windowIn, this ) );
	};
	
	
	resize() {
		this._setResizeProps();
		
		this.dispatch( this.E.RESIZE );
	};
	
	
	_setResizeProps() {
		this.bW = this.$body.width();
		this.bH = this.$body.height();
		this.wW = this.$window.width();
		this.wH = this.$window.height();
		this.cX = Math.round( this.bW / 2 );
		this.cY = Math.round( this.wH / 2 );
		
		if ( this.mX === null && this.mY === null ) {
			this.mX = this.cX;
			this.mY = this.cY;
		}
	};
	
	
	raf() {
		if ( Config.IS_DEV )
			FPSStats.begin();
		
		
		this._setRafProps();
		
		this.dispatch( this.E.RAF );
		
		
		if ( Config.IS_DEV )
			FPSStats.end();
	};
	
	
	_setRafProps() {
		this.sY		= this.$window[0].scrollY || this.$window[0].pageYOffset;
		this.siY	= Math_.getInertia( this.sY, this.siY, this.SCROLL_INERTIA, true );
		
		this.miX	= Math_.getInertia( this.mX, this.miX, this.MOUSE_INERTIA, true );
		this.miY	= Math_.getInertia( this.mY, this.miY, this.MOUSE_INERTIA, true );
	};
	
	
	mouseMove( e ) {
		this.mX = e.clientX;
		this.mY = e.clientY;
		
		// console.log( 'MainView _mouseMove()', this.mX, this.mY );
		
		this.dispatch( this.E.MOUSE_MOVE );
	};
	
	
	mouseDown() {
		this.dispatch( this.E.MOUSE_DOWN );
	};
	
	
	mouseUp() {
		this.dispatch( this.E.MOUSE_UP );
	};
	
	
	touchMove( e ) {
		e.preventDefault();
		
		// Zepto
		this.tX = e.touches[0].pageX;
		this.tY = e.touches[0].pageY;
		// jQuery
		// this.tX = e.originalEvent.touches[0].pageX;
		// this.tY = e.originalEvent.touches[0].pageY;
		
		this.dispatch( this.E.TOUCH_MOVE );
	};
	
	
	touchStart() {
		this.dispatch( this.E.TOUCH_START );
	};
	
	
	touchEnd() {
		this.dispatch( this.E.TOUCH_END );
	};
	
	
	windowOut() {
		this.isWindowFocused = false;
		
		this.dispatch( this.E.WINDOW_OUT );
	};
	
	
	windowIn() {
		this.isWindowFocused = true;
		
		this.dispatch( this.E.WINDOW_IN );
	};
	
	
	setScrollY( scrollY ) {
		this.sY		= scrollY;
		this.siY	= scrollY;
		
		this.$window[0].scrollTo( 0, scrollY );
	};
	
	
	setBodyHeight( bodyH ) {
		if ( bodyH === null )
			bodyH = this.$pageCont.height();
		
		this.bH						= bodyH;
		this.$body[0].style.height	= this.bH + 'px';
	};
	
	
}


module.exports = new MainView();

