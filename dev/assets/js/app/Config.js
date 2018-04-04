

const Detector = require( 'three.js/Detector' );


class Config {
	
	
	constructor() {
		this.ENV			= 'dev'; // 'dev' or 'prod'
		this.IS_DEV			= null;
		this.IS_PROD		= null;
		
		this.HAS_FPS_STATS	= true;
		this.WEBGL_DEBUG	= true;
		
		this.HAS_WEBGL		= null;
		
		
		this.init();
	}
	
	
	init() {
		this.IS_DEV		= this.ENV == 'dev';
		this.IS_PROD	= this.ENV == 'prod';
		
		this.HAS_WEBGL	= Detector !== undefined ? Detector.webgl : null;
	}
	
	
}


module.exports = new Config();

