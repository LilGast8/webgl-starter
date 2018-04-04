

const CustomEvent	= require( 'events/CustomEvent' );
const Math_			= require( 'utils/Math' );


class Touch extends CustomEvent {
	
	
	constructor() {
		super();
		
		this.E = {
			TOUCH_MOVE:		'touchmove',
			TOUCH_START:	'touchstart',
			TOUCH_END:		'touchend'
		};
		
		this.x	= null; // touch X
		this.y	= null; // touch Y
		this.iX	= null; // touch X with inertia
		this.iY	= null; // touch Y with inertia
		
		this.TOUCH_INERTIA = 0.03;
	}
	
	
	init( Main, $window = $( window ), startX = Math.round( $window.width() / 2 ), startY = Math.round( $window.height() / 2 ) ) {
		this._initDOM( $window );
		this._initEl( startX, startY );
		this._bindEvents( Main );
	}
	
	
	_initDOM( $window ) {
		this.$window = $window;
	}
	
	
	_initEl( startX, startY ) {
		this.setPosition( startX, startY );
	}
	
	
	_bindEvents( Main ) {
		Main.bind( Main.E.RAF, this._raf, this );
		
		this.$window.on( 'touchmove', $.proxy( this._touchMove, this ) );
		this.$window.on( 'touchstart', $.proxy( this._touchStart, this ) );
		this.$window.on( 'touchend', $.proxy( this._touchEnd, this ) );
	}
	
	
	_raf() {
		if ( this.x === null && this.y === null ) {
			this.x = this.cX;
			this.y = this.cY;
		}
		
		this.iX = Math_.getInertia( this.x, this.iX, this.TOUCH_INERTIA );
		this.iY = Math_.getInertia( this.y, this.iY, this.TOUCH_INERTIA );
		
		// console.log( `👆🏾 x: ${ this.x } / y: ${ this.y }` );
		// console.log( `👆🏾 xI: ${ this.xI } / yI: ${ this.yI }` );
	}
	
	
	_touchMove( e ) {
		e.preventDefault();
		
		// Zepto
		this.x = e.touches[0].pageX;
		this.y = e.touches[0].pageY;
		// jQuery
		// this.x = e.originalEvent.touches[0].pageX;
		// this.y = e.originalEvent.touches[0].pageY;
		
		// console.log( `👆🏾 Touch._touchMove() x: ${ this.x } / y: ${ this.y }` );
		
		this.dispatch( this.E.TOUCH_MOVE );
	}
	
	
	_touchStart() {
		this.dispatch( this.E.TOUCH_START );
	}
	
	
	_touchEnd() {
		this.dispatch( this.E.TOUCH_END );
	}
	
	
	setPosition( x, y ) {
		this.x	= x;
		this.y	= y;
		this.xI	= x;
		this.yI	= y;
	}
	
	
}


module.exports = new Touch();

