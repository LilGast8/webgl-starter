const gulp			= require( 'gulp' );
const path			= require( 'path' );

const cssSupports	= require( '../utils/css-supports' );
const paths			= require( '../utils/paths' );

const plumber		= require( 'gulp-plumber' );
const gutil			= require( 'gulp-util' );
const sass			= require( 'gulp-sass' );
const sourcemaps	= require( 'gulp-sourcemaps' );
const autoprefixer	= require( 'gulp-autoprefixer' );
const notify		= require( 'gulp-notify' );
const rename		= require( 'gulp-rename' );



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