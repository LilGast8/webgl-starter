import gulp from 'gulp';

import paths from '../utils/paths';

import watchify from 'watchify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';

import assign from 'lodash.assign';

import notify from 'gulp-notify';
import gutil from 'gulp-util';

import glslify from 'glslify';



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