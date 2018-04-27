import gulp from 'gulp';
import path from 'path';

import cssSupports from '../utils/css-supports';
import paths from '../utils/paths';

import plumber from 'gulp-plumber';
import gutil from 'gulp-util';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import rename from 'gulp-rename';



gulp.task( 'sass', [ 'sass:dev' ], () => {
	
} );


gulp.task( 'sass:dev', () => {
	
	return gulp.src( paths.env.dev + paths.assets.css.app.allSCSS )
		.pipe( plumber() )
		.pipe( sourcemaps.init() )
		.pipe( sass.sync( {
			outputStyle:		'compressed',
			precision:			3,
			emitCompileError:	true
		} ).on( 'error', ( error ) => {
			const file	= error.relativePath.substr( error.relativePath.indexOf( '/assets/' ) + 8 );		
			const msg	= 'CSS error: ' + file + ' on line ' + error.line + ', column ' + error.column;	
			notify().write( msg );
			console.log( gutil.colors.red( error.message ) );
		} ) )
		.pipe( autoprefixer( cssSupports ) )
		.pipe( rename( { suffix : '.min' } ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( paths.env.dev + paths.assets.css.dir ) );
	
} );