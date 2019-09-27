const gulp			= require( 'gulp' );
const path			= require( 'path' );

const paths			= require( '../utils/paths' );

const livereload	= require( 'gulp-livereload' );



gulp.task( 'watch', () => {
	
	livereload.listen();
	
	gulp.start( 'js' );
	
	
	/* Tasks management */
	gulp.watch( [
		
		/* Assets */
		paths.env.dev + paths.assets.css.app.allFiles,
		
	], ( e ) => {
		
		let taskname;
		
		const filePath	= e.path;
		const ext		= path.extname( filePath );
		
		
		/* SASS */
		if ( ext == '.scss' )
			taskname = 'sass';
		
		
		if ( taskname )
			gulp.start( taskname );
		
	} );
	
	
	/* Livereload */
	gulp.watch( [
		
		/* 3d shaders */
		// paths.env.dev + paths.assets._3d.shaders.allFiles,
		
		/* CSS */
		paths.env.dev + paths.assets.css.allMinFiles,
		
		/* JS */
		paths.env.dev + paths.assets.js.scriptsFile,
		
		/* Server */
		paths.env.dev + paths.indexFile,
		
	] ).on( 'change', livereload.changed );
	
} );