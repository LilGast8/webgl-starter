

const Config		= require( 'configs/Config' );
const FPSStats		= require( 'utils/debug/FPSStats' );
const MemoryStats	= require( 'utils/debug/MemoryStats' );
const DatGUI		= require( 'utils/debug/DatGUI' );


class DebugController {
	
	
	constructor() {
		this.HAS_FPS_STATS		= false;
		this.HAS_MEMORY_STATS	= false;
	}
	
	
	init() {
		this._manageFPSStats( Config.HAS_FPS_STATS );
		this._manageMemoryStats( Config.HAS_MEMORY_STATS );
		this._manageDatGUI( Config.HAS_DAT_GUI );
	}
	
	
	_manageFPSStats( isSet ) {
		if ( isSet && Config.IS_DEV )
			this._initFPSStats();
	}
	
	
	_manageMemoryStats( isSet ) {
		if ( isSet && Config.IS_DEV )
			this._initMemoryStats();
	}
	
	
	_manageDatGUI( isSet ) {
		if ( isSet && Config.IS_DEV )
			this._initDatGUI();
	}
	
	
	_initFPSStats() {
		FPSStats.init();
		
		this.HAS_FPS_STATS = true;
	}
	
	
	_initMemoryStats() {
		MemoryStats.init();
		
		this.HAS_MEMORY_STATS = true;
	}
	
	
	_initDatGUI() {
		DatGUI.init();
	}
	
	
	rafStart() {
		if ( this.HAS_FPS_STATS && Config.IS_DEV )
			FPSStats.begin();
	}
	
	
	rafEnd() {
		if ( this.HAS_FPS_STATS && Config.IS_DEV )
			FPSStats.end();
		
		if ( this.HAS_MEMORY_STATS && Config.IS_DEV )
			MemoryStats.update();
	}
	
	
}


module.exports = new DebugController();

