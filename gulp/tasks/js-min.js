var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );

var browserify	= require( 'browserify' );
var source		= require( 'vinyl-source-stream' );
var buffer		= require( 'vinyl-buffer' );
var uglify		= require( 'gulp-uglify' );

var notify		= require( 'gulp-notify' );
var gutil		= require( 'gulp-util' );

var glslify		= require( 'glslify' );
var babelify	= require( 'babelify' );



gulp.task( 'js-min', function() {
	
	var options = {
		entries: 		[ paths.env.dev + paths.assets.js.app.dir + 'InitApp.js' ],
		paths:			[
							paths.env.dev + paths.assets.js.app.dir,
							paths.env.dev + paths.assets.js.vendor.dir
						],
		debug: 			true,
		
		transform:	[
			glslify,
			[
				babelify, {
					presets:	[ 'env' ],
					ignore:		'**/zepto.min.js'
				}
			]
		]
	};
	
	var bundler	= browserify( options );
	
	
	bundle( bundler );
	
} );



function bundle( bundler ) {
	return bundler.bundle()
		.on( 'error', function( error ) {
			notify().write( error.message );
			console.log( gutil.colors.red( error.message ) );
		} )
		.pipe( source( 'scripts.min.js' ) )
		.pipe( buffer() )
		.pipe( uglify() )
		.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) );
}