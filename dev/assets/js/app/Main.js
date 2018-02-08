'use strict';


require( 'zepto' );

var MainView	= require( 'MainView' );

var App			= require( 'App' );



function Main() {}


Main.prototype.init = function() {
	MainView.init();
	
	var app = new App();
	app.init();
};


var main = new Main();


$( main.init.bind( main ) );

