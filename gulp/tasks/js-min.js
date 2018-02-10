var gulp	= require( 'gulp' );

var paths	= require( '../utils/paths' );

var plumber	= require( 'gulp-plumber' );
var uglify	= require( 'gulp-uglify' );
var rename	= require( 'gulp-rename' );



gulp.task( 'js-min', function() {
	
	gulp.src( paths.env.dev + paths.assets.js.scriptsFile )
		.pipe( plumber() )
		.pipe( uglify() )
		.pipe( rename( { suffix : '.min' } ) )
		.pipe( gulp.dest( paths.env.dev + paths.assets.js.dir ) );
	
} );