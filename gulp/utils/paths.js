module.exports = {
	
	env: {
		base:	'base/',
		dev:	'dev/',
		dist:	'dist/'
	},
	
	emptyFiles:	'**/empty-folder.txt',
	
	// htaccess:	'.htaccess',
	indexFile:	'index.*',
	// robots:		'robots.txt',
	
	assets: {
		allFiles: 'assets/**/*',
		
		css: {
			dir:			'assets/css/',
			minAllFiles:	'assets/css/*.css',
			
			fonts: {
				dir:		'assets/css/fonts/',
				allFiles:	'assets/css/fonts/**/*',
			}
		},
		
		img: {
			dir:		'assets/img/',
			allFiles:	'assets/img/**/*',
			allJpg:		'assets/img/**/*.jpg',
			allPng:		'assets/img/**/*.png',
		},
		
		js: {
			dir:			'assets/js/',
			allFiles:		'assets/js/**/*.js',
			minAllFiles:	'assets/js/scripts.js',
			
			app: {
				dir:			'assets/js/app/',
				allFiles:		'assets/js/app/**/*.js',
			},
			
			vendor: {
				dir: 'assets/js/vendor/'
			}
		},
		
		// json: {
		// 	dir:		'assets/json/',
		// 	allFiles:	'assets/json/**/*.json'
		// },
		
		// sounds: {
		// 	dir:		'assets/sounds/',
		// 	allFiles:	'assets/sounds/**/*'
		// },
		
		// svg: {
		// 	dir:		'assets/svg/',
		// 	allFiles:	'assets/svg/*.svg',
			
		// 	sprite: {
		// 		dir:		'assets/svg/_sprite/',
		// 		allFiles:	'assets/svg/_sprite/*.svg'
		// 	}
		// },
		
		// videos: {
		// 	dir:		'assets/videos/',
		// 	allFiles:	'assets/videos/**/*'
		// }
	},
	
	// configs: {
	// 	dir:				'configs/',
	// 	allFiles:			'configs/**/*',
	// 	allRootJsonFiles:	'configs/*.json',
	// 	allJsonFiles:		'configs/**/*.json',
	// 	configFile:			'configs/config.json',
	// 	jsFilesFile:		'configs/js-files.json',
	// 	routesFile:			'configs/routes.json',
		
	// 	favicons: {
	// 		dir:		'configs/favicons/',
	// 		allFiles:	'configs/favicons/*.json',
	// 		configFile:	'configs/favicons/config.json',
	// 		dataFile:	'configs/favicons/faviconData.json',
	// 		srcFile:	'configs/favicons/favicons.twig'
	// 	},
		
	// 	routes: {
	// 		dir:		'configs/routes/',
	// 		allFiles:	'configs/routes/*.json'
	// 	}
	// },
	
	// server: {
	// 	dir:		'server/',
	// 	allFiles:	'server/**/*',
		
	// 	contents: 'server/contents/',
		
	// 	core: {
	// 		controllers: {
	// 			pages:		'server/core/controllers/pages/',
	// 			partials:	'server/core/controllers/partials/',
	// 			statics:	'server/core/controllers/statics/'
	// 		}
	// 	},
		
	// 	vendor: {
	// 		allFiles: 'server/vendor/**/*',
	// 	},
		
	// 	views: {
	// 		desktop: {
	// 			pages:		'server/views/desktop/pages/',
	// 			partials:	'server/views/desktop/partials/',
	// 			statics:	'server/views/desktop/statics/'
	// 		},
	// 		mobile: {
	// 			pages:		'server/views/mobile/pages/',
	// 			partials:	'server/views/mobile/partials/',
	// 			statics:	'server/views/mobile/statics/'
	// 		},
	// 		shared: {
	// 			dir: 'server/views/shared/'
	// 		}
	// 	}
	// }
	
};