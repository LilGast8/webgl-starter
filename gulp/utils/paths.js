module.exports = {
	
	env: {
		base:	'base/',
		dev:	'dev/',
		dist:	'dist/'
	},
	
	emptyFiles:	'**/empty-folder.txt',
	
	indexFile:	'index.*',
	
	assets: {
		allFiles: 'assets/**/*',
		
		_3d: {
			dir: 'assets/3d/',
			
			shaders: {
				dir:		'assets/3d/shaders/',
				allFiles:	'assets/3d/shaders/**/*',
			}
		},
		
		css: {
			dir:			'assets/css/',
			allMinFiles:	'assets/css/*.css',
			
			app: {
				allSCSS:	'assets/css/app/*.scss',
				allFiles:	'assets/css/app/**/*.scss',
			},
			
			fonts: {
				dir:		'assets/css/fonts/',
				allFiles:	'assets/css/fonts/**/*',
			},
			
			maps: {
				dir:		'assets/css/maps/',
				allFiles:	'assets/css/maps/**/*',
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
			scriptsFile:	'assets/js/scripts.js',
			scriptsMinFile:	'assets/js/scripts.min.js',
			
			app: {
				dir:			'assets/js/app/',
				allFiles:		'assets/js/app/**/*.js',
			},
			
			maps: {
				dir:		'assets/js/maps/',
				allFiles:	'assets/js/maps/**/*',
			},
			
			vendor: {
				dir: 'assets/js/vendor/'
			}
		}
	}
	
};