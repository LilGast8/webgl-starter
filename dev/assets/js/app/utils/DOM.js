'use strict';


function DOM_() {}


DOM_.addClass = function( el, classToAdd ) {
	if ( el.classList )
		el.classList.add( classToAdd );
	else {
		if ( !STF_dom_hasClass( el, classToAdd ) )
			el.className += ' ' + classToAdd;
	}
};


DOM_.removeClass = function( el, classToRemove ) {
	if ( el.classList )
		el.classList.remove( classToRemove );
	else {
		el.className = el.className.replace( new RegExp( '(^|\\b)' + classToRemove.split(' ').join( '|' ) + '(\\b|$)', 'gi' ), '');
		
		var lastCharPos = el.className.length - 1;
		if ( el.className[ lastCharPos ] == ' ' )
			el.className = el.className.substring( 0, lastCharPos );
	}
};


DOM_.resetClass = function( el ) {
	el.className = '';
};


DOM_.hasClass = function( el, classToCheck ) {
	var hasClass;
	
	if ( el.classList )
		hasClass = el.classList.contains( classToCheck );
	else
		hasClass = new RegExp( '(^| )' + classToCheck + '( |$)', 'gi' ).test( el.className );
	
	return hasClass;
};


DOM_.resetStyle = function( el ) {
	el.style.cssText = '';
};


DOM_.setTranslate = function( el, x, y ) {
	x = x === null ? 0 : x;
	y = y === null ? 0 : y;
	
	if ( WLB.Props.HAS_TRANSFORMS_3D )
		el.style[ WLB.Props.TRANSFORM ] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
	else
		el.style[ WLB.Props.TRANSFORM ] = 'translate(' + x + 'px, ' + y + 'px)';
};


module.exports = DOM_;

