const gulp			= require( 'gulp' );

const paths			= require( '../utils/paths' );

const browserify	= require( 'browserify' );
const source		= require( 'vinyl-source-stream' );
const buffer		= require( 'vinyl-buffer' );
const uglify		= require( 'gulp-uglify' );

const notify		= require( 'gulp-notify' );
const gutil			= require( 'gulp-util' );

const glslify		= require( 'glslify' );
const babelify		= require( 'babelify' );



gulp.task( 'js-min', () => {
	
	const options = {
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
					// presets:	[ 'env' ],
					presets: [
						[ '@babel/preset-env', { modules: false } ]
					],
					ignore:		[ 'zepto.min.js' ]
				}
			]
		]
	};
	
	const bundler = browserify( options );
	
	
	bundle( bundler );
	
} );



function bundle( bundler ) {
	return bundler.bundle()
		.on( 'error', ( error ) => {
			notify().write( error.message );
			console.log( gutil.colors.red( error.message ) );
		} )
		.pipe( source( 'scripts.min.js' ) )
		.pipe( buffer() )
		.pipe( uglify() )
		.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) );
}