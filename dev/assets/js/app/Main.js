

require( 'zepto' );

var MainView	= require( 'MainView' );

var App			= require( 'App' );


class Main {
	
	
	constructor() {
		
	}
	
	
	init() {
		MainView.init();
		
		var app = new App();
		app.init();
	}
	
	
};


var main = new Main();


$( main.init() );

