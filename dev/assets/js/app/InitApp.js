

require( 'zepto' );

const Main	= require( 'Main' );
const App	= require( 'App' );


class InitApp {
	
	
	constructor() {
		
	}
	
	
	init() {
		Main.init();
		
		const app = new App();
		app.init();
	}
	
	
};


const initApp = new InitApp();


$( initApp.init() );

