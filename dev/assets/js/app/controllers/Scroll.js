

const CustomEvent	= require( 'CustomEvent' );
const Math_			= require( 'utils/Math' );


class Scroll extends CustomEvent {
	
	
	constructor() {
		super();
		
		this.y	= null; // scroll Y
		this.yI	= null; // scroll Y with inertia
		
		this.SCROLL_INERTIA = 0.09;
	}
	
	
	init( Main, $window = $( window ) ) {
		this._initDOM( $window );
		this._initEl();
		this._bindEvents( Main );
	}
	
	
	_initDOM( $window ) {
		this.$window = $window;
	}
	
	
	_initEl() {
		
	}
	
	
	_bindEvents( Main ) {
		Main.bind( Main.E.RAF, this._raf, this );
	}
	
	
	disableScrollRestoration() {
		if ( 'scrollRestoration' in history )
			history.scrollRestoration = 'manual';
	}
	
	
	_raf() {
		this.y	= this.$window[0].scrollY || this.$window[0].pageYOffset;
		// this.yI	= STF_math_getInertia( this.y, this.yI, this.SCROLL_INERTIA );
		this.yI	= Math_.getInertia( this.y, this.yI, this.SCROLL_INERTIA );
		
		// console.log( `🎡 y: ${ this.y }` );
		// console.log( `🎡 yI: ${ this.yI }` );
	}
	
	
	setScrollY( scrollY ) {
		this.y	= scrollY;
		this.yI	= scrollY;
		
		this.$window[0].scrollTo( 0, scrollY );
	}
	
	
};


module.exports = new Scroll();

