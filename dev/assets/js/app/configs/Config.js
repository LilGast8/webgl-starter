

const Detector = require( 'three.js/Detector' );


class Config {
	
	
	constructor() {
		/* -------- Change them as you want -------- */
		this.ENV				= 'dev'; // 'dev' or 'prod'
		this.HAS_FPS_STATS		= false;
		this.HAS_MEMORY_STATS	= false;
		this.HAS_DAT_GUI		= false;
		this.WEBGL_DEBUG		= true;
		/* ----------------------------------------- */
		
		this.IS_DEV				= null;
		this.IS_PROD			= null;
		this.HAS_WEBGL			= null;
		
		
		this.init();
	}
	
	
	init() {
		this.IS_DEV		= this.ENV == 'dev';
		this.IS_PROD	= this.ENV == 'prod';
		this.HAS_WEBGL	= Detector !== undefined ? Detector.webgl : null;
	}
	
	
}


module.exports = new Config();

