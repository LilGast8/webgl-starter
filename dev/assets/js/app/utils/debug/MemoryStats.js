

const Stats = require( 'memory-stats' );


class MemoryStats {
	
	
	constructor() {
		this.stats = null;
	}
	
	
	init() {
		this.stats = new Stats();
		
		this.stats.domElement.style.position	= 'fixed';
		this.stats.domElement.style.left		= '0px';
		this.stats.domElement.style.bottom		= '48px';
		this.stats.domElement.style.zIndex		= 88;
		
		document.body.appendChild( this.stats.domElement );
	}
	
	
	update() {
		this.stats.update();
	}
	
	
}


module.exports = new MemoryStats();

