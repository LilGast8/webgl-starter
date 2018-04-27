import gulp from 'gulp';

import paths from '../utils/paths';

import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';

import notify from 'gulp-notify';
import gutil from 'gulp-util';

import glslify from 'glslify';
import babelify from 'babelify';



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
					presets:	[ 'env' ],
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