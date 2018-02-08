'use strict';


require( 'zepto' );
var App = require( 'App' );



function Main() {}


Main.prototype.init = function() {
	var app = new App();
	app.init();
};
	

var main = new Main();


$( main.init.bind( main ) );

