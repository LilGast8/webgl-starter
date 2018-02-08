'use strict';


var Stats = require( 'stats.min' );


function FPSStats() {
	this.stats = null;
}


FPSStats.prototype.init = function() {
	this.stats = new Stats();
	
	this.stats.setMode( 0 );
	
	this.stats.dom.style.top		= '0px';
	this.stats.dom.style.left		= '0px';
	this.stats.dom.style.bottom		= 'auto';
	this.stats.dom.style.right		= 'auto';
	this.stats.dom.style.zIndex		= 88;
	
	document.body.appendChild( this.stats.dom );
};


FPSStats.prototype.begin = function() {
	this.stats.begin();
};


FPSStats.prototype.end = function() {
	this.stats.end();
};


module.exports = new FPSStats();

