'use strict';


global.THREE	= require( 'three.js/three.min' );
// require( 'three.js/OrbitControls' );
var Stats		= require( 'stats.min' );
// var DatGUI		= require( 'DatGUI' );
var glslify		= require( 'glslify' );


function App() {
	this.stats		= null;
	
	this.wW			= null;
	this.wH			= null;
}


App.prototype.init = function() {
	console.log( '🐣 App.init()' );
	// this.initDOM();
	// this.initEl();
	// this.bindEvents();
};


module.exports = App;

