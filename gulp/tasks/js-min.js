/*var gulp	= require( 'gulp' );

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
	
} );*/


// test with uglify-es



var paths = require( '../utils/paths' );

var gulp = require('gulp');
// var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

var glslify = require( 'glslify' );
var uglify = require('gulp-uglify');



function compile(watch) {
	// var bundler = watchify(browserify('./src/index.js', { debug: true }).transform(babel));
	var bundler = watchify(browserify(paths.env.dev + paths.assets.js.app.dir + 'InitApp.js', {
		debug: true,
		paths:	[
					paths.env.dev + paths.assets.js.app.dir,
					paths.env.dev + paths.assets.js.vendor.dir
				]
	}).transform( glslify )
	.transform( babel, {
		// Use all of the ES2015 spec
		presets: [ 'es2015' ],
		ignore: '**/zepto.min.js'
		// only: paths.env.dev + paths.assets.js.app.dir
		/*presets: [ 'env', {
			"targets": {
				"browsers": ["safari >= 4"]
			}
		} ],*/
	} ));
	/*}).transform(babel, {
		presets: [ 'env' ]
	} ));*/

	function rebundle() {
		bundler.bundle()
			.on('error', function(err) { console.error(err); this.emit('end'); })
			.pipe( source( 'scripts.min.js' ) )
			.pipe( buffer() )
			// .pipe(sourcemaps.init({ loadMaps: true }))
			.pipe( uglify())
			// .pipe(sourcemaps.write('./'))
			// .pipe(gulp.dest('./build'));
			.pipe(gulp.dest( paths.env.dev + paths.assets.js.dir ));
	}

	if (watch) {
		bundler.on('update', function() {
			console.log('-> bundling...');
			rebundle();
		});
	}

	rebundle();
}

function watch() {
	return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);