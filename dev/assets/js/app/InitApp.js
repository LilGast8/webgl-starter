

require( 'zepto' );

const Main				= require( 'controllers/Main' );
const DebugController	= require( 'utils/debug/DebugController' );
const App				= require( 'App' );


class InitApp {
	
	
	constructor() {
		
	}
	
	
	init() {
		DebugController.init();
		Main.init();
		
		const app = new App();
		app.init();
	}
	
	
}


const initApp = new InitApp();


$( initApp.init() );

