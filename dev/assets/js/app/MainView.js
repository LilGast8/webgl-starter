'use strict';


require( 'greensock/TweenMax' );

var CustomEvent		= require( 'CustomEvent' );
var Config			= require( 'Config' );
var FPSStats		= require( 'utils/FPSStats' );


function MainView() {
	CustomEvent.call( this );
	
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


MainView.prototype				= Object.create( CustomEvent.prototype );
MainView.prototype.constructor	= MainView;


MainView.prototype.init = function() {
	console.log( '🐣 MainView.init()' );
	
	this.initDOM();
	this.initEl();
	this.bindEvents();
	
	this.resize();
};


MainView.prototype.initDOM = function() {
	this.$window	= $( window );
	this.$html		= $( 'html' );
	this.$body		= $( document.body );
	this.$mainCont	= $( document.getElementById( 'main-container' ) );
};


MainView.prototype.initEl = function() {
	if ( Config.IS_DEV )
		FPSStats.init();
};


MainView.prototype.bindEvents = function() {
	this.$window.on( 'resize', $.proxy( this.resize, this ) );
	TweenLite.ticker.addEventListener( 'tick', this.raf, this );
	// this.$window.on( 'mousemove', $.proxy( this.mouseMove, this ) );
	// this.$window.on( 'mousedown', $.proxy( this.mouseDown, this ) );
	// this.$window.on( 'mouseup', $.proxy( this.mouseUp, this ) );
	// this.$window.on( 'touchmove', $.proxy( this.touchMove, this ) );
	// this.$window.on( 'touchstart', $.proxy( this.touchStart, this ) );
	// this.$window.on( 'touchend', $.proxy( this.touchEnd, this ) );
	// this.$window.on( 'blur', $.proxy( this.windowOut, this ) );
	// this.$window.on( 'focus', $.proxy( this.windowIn, this ) );
};


MainView.prototype.resize = function() {
	_setResizeProps.call( this );
	
	this.dispatch( this.E.RESIZE );
};


var _setResizeProps = function() {
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


MainView.prototype.raf = function() {
	if ( Config.IS_DEV )
		FPSStats.begin();
	
	
	_setRafProps.call( this );
	
	this.dispatch( this.E.RAF );
	
	
	if ( Config.IS_DEV )
		FPSStats.end();
};


var _setRafProps = function() {
	// this.sY		= this.$window[0].scrollY || this.$window[0].pageYOffset;
	// this.siY	= STF_math_getInertia( this.sY, this.siY, this.SCROLL_INERTIA, true );
	
	// this.miX	= STF_math_getInertia( this.mX, this.miX, this.MOUSE_INERTIA, true );
	// this.miY	= STF_math_getInertia( this.mY, this.miY, this.MOUSE_INERTIA, true );
};


module.exports = new MainView();

