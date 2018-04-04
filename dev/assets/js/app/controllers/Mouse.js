

const CustomEvent	= require( 'CustomEvent' );
const Math_			= require( 'utils/Math' );


class Mouse extends CustomEvent {
	
	
	constructor() {
		super();
		
		this.E = {
			MOUSE_MOVE:	'mousemove',
			MOUSE_DOWN:	'mousedown',
			MOUSE_UP:	'mouseup'
		};
		
		this.x	= null; // mouse X
		this.y	= null; // mouse Y
		this.xI	= null; // mouse X with inertia
		this.yI	= null; // mouse Y with inertia
		
		this.MOUSE_INERTIA = 0.03;
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
		
		this.$window.on( 'mousemove', $.proxy( this._mouseMove, this ) );
		this.$window.on( 'mousedown', $.proxy( this._mouseDown, this ) );
		this.$window.on( 'mouseup', $.proxy( this._mouseUp, this ) );
	}
	
	
	_raf() {
		if ( this.x === null && this.y === null ) {
			this.x = this.cX;
			this.y = this.cY;
		}
		
		this.xI = Math_.getInertia( this.x, this.xI, this.MOUSE_INERTIA );
		this.yI = Math_.getInertia( this.y, this.yI, this.MOUSE_INERTIA );
		
		// console.log( `🐹 x: ${ this.x } / y: ${ this.y }` );
		// console.log( `🐹 xI: ${ this.xI } / yI: ${ this.yI }` );
	}
	
	
	_mouseMove( e ) {
		this.x = e.clientX;
		this.y = e.clientY;
		
		// console.log( `🐹 Mouse._mouseMove() x: ${ this.x } / y: ${ this.y }` );
		
		this.dispatch( this.E.MOUSE_MOVE );
	}
	
	
	_mouseDown() {
		this.dispatch( this.E.MOUSE_DOWN );
	}
	
	
	_mouseUp() {
		this.dispatch( this.E.MOUSE_UP );
	}
	
	
	setPosition( x, y ) {
		this.x	= x;
		this.y	= y;
		this.xI	= x;
		this.yI	= y;
	}
	
	
};


module.exports = new Mouse();

