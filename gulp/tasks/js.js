const gulp			= require( 'gulp' );

const paths			= require( '../utils/paths' );

const watchify		= require( 'watchify' );
const browserify	= require( 'browserify' );
const source		= require( 'vinyl-source-stream' );
const buffer		= require( 'vinyl-buffer' );
const sourcemaps	= require( 'gulp-sourcemaps' );

const assign		= require( 'lodash.assign' );

const notify		= require( 'gulp-notify' );
const gutil			= require( 'gulp-util' );

const glslify		= require( 'glslify' );



gulp.task( 'js', () => {
	
	const customOptions = {
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
	
	const options	= assign( {}, watchify.args, customOptions );
	const bundler	= watchify( browserify( options ) );
	
	
	bundler.on( 'update', () => {
		bundle( bundler );
	} );
	bundler.on( 'log', gutil.log );
	
	
	bundle( bundler );
	
} );



function bundle( bundler ) {
	return bundler.bundle()
		.on( 'error', ( error ) => {
			notify().write( error.message );
			console.log( gutil.colors.red( error.message ) );
		} )
		.pipe( source( 'scripts.js' ) )
		.pipe( buffer() )
		.pipe( sourcemaps.init( { loadMaps: true } ) )
		.pipe( sourcemaps.write('./maps') )
		.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) );
}