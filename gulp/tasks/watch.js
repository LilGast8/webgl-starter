var gulp		= require( 'gulp' );
var path		= require( 'path' );

// var options		= require( '../utils/options' );
var paths		= require( '../utils/paths' );

var livereload	= require( 'gulp-livereload' );



gulp.task( 'watch', function() {
	
	livereload.listen();
	
	gulp.start( 'js' );
	
	
	/* Tasks management */
	gulp.watch( [
		
		/* Assets */
		paths.env.dev + paths.assets.css.app.allFiles,
		
	], function( e ) {
		
		var filePath, ext;
		var taskname;
		
		filePath	= e.path;
		ext			= path.extname( filePath );
		
		
		/* SASS */
		if ( ext == '.scss' )
			taskname = 'sass';
		
		
		if ( taskname )
			gulp.start( taskname );
		
	} );
	
	
	/* Livereload */
	gulp.watch( [
		
		/* 3d shaders */
		paths.env.dev + paths.assets._3d.shaders.allFiles,
		
		/* CSS */
		paths.env.dev + paths.assets.css.allMinFiles,
		
		/* JS */
		paths.env.dev + paths.assets.js.scriptsFile,
		
		/* Server */
		paths.env.dev + paths.indexFile,
		
	] ).on( 'change', livereload.changed );
	
} );