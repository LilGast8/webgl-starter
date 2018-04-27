var gulp		= require( 'gulp' );

var paths		= require( '../utils/paths' );

var watchify	= require( 'watchify' );
var browserify	= require( 'browserify' );
var source		= require( 'vinyl-source-stream' );
var buffer		= require( 'vinyl-buffer' );
var sourcemaps	= require( 'gulp-sourcemaps' );

var assign		= require( 'lodash.assign' );

var notify		= require( 'gulp-notify' );
var gutil		= require( 'gulp-util' );

var glslify		= require( 'glslify' );



gulp.task( 'js', function() {
	
	var customOptions = {
		entries: 		[ paths.env.dev + paths.assets.js.app.dir + 'InitApp.js' ],
		paths:			[
							paths.env.dev + paths.assets.js.app.dir,
							paths.env.dev + paths.assets.js.vendor.dir
						],
		debug: 			true,
		
		transform:		[
			glslify
		]
	};
	
	var options	= assign( {}, watchify.args, customOptions );
	var bundler	= watchify( browserify( options ) );
	
	
	bundler.on( 'update', function() {
		bundle( bundler );
	} );
	bundler.on( 'log', gutil.log );
	
	
	bundle( bundler );
	
} );



function bundle( bundler ) {
	return bundler.bundle()
		.on( 'error', function( error ) {
			notify().write( error.message );
			console.log( gutil.colors.red( error.message ) );
		} )
		.pipe( source( 'scripts.js' ) )
		.pipe( buffer() )
		.pipe( sourcemaps.init( { loadMaps: true } ) )
		.pipe( sourcemaps.write('./maps') )
		.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) );
}