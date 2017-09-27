/*	Порядок команд для загрузки на новом ПК.
	1. npm i gulp -g
	2. npm i gulp-install -g
	3. npm install
	4. gulp
*/
var gulp = require('gulp'),
		install = require('gulp-install'),
		pug = require('gulp-pug'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		del = require('del'),
		autoprefixer = require('gulp-autoprefixer'),
		notify = require('gulp-notify'),
		babel = require('gulp-babel');

// Define sourses object
var sourses = {
	sass: 'app/sass/**/*.scss',
	css: 'app/css/style.css',
	pug: 'app/**/*.pug',
	scripts: 'app/js/**/*.js',
	es6: 'app/es6/**/*.js',
	fonts: 'app/fonts/**/*',
	img: 'app/img/*',
	html: 'app/*.html',
	default: 'app/'
};

// Define destinations object
var destinations = {
	css: 'dest/css',
	fonts: 'dest/fonts',
	scripts: 'dest/js',
	img: 'dest/img',
	html: 'dest/'
};

gulp.src(['./package.json'])
	.pipe(install());

gulp.task('sass', function(){
	return gulp.src(sourses.sass)
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer(
			{browsers: ['last 5 versions']}
		))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function() {
	return gulp.src(sourses.pug)
		.pipe(
			pug({
				pretty: true
			}).on('error', notify.onError(function (error) {
    		return 'ERROR. \n' + error;
			}))
		) // pip to pug plugin
		.pipe(gulp.dest(sourses.default)); // tell gulp our output folder
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('babel', function(){
	return gulp.src(sourses.es6)
		.pipe(babel({
			presets: ['es2015']
		})).on('error', notify.onError(function (error) {
    		return 'ERROR. \n' + error;
			}))
		.pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['browser-sync', 'pug', 'sass', 'babel'] ,function(){
	gulp.watch(sourses.sass, ['sass']);
	gulp.watch(sourses.html, browserSync.reload);
	gulp.watch(sourses.js, browserSync.reload);
	gulp.watch(sourses.pug, ['pug']);
	gulp.watch(sourses.es6, ['babel']);
});

gulp.task('clean', function(){
	return del.sync('dest');
});

gulp.task('build', ['clean', 'sass'], function(){
	var buildCss = gulp.src(sourses.css)
		.pipe(gulp.dest(destinations.css))

	var buildFonts = gulp.src(sourses.fonts)
		.pipe(gulp.dest(destinations.fonts))

	var buildJs = gulp.src(sourses.scripts)
		.pipe(gulp.dest(destinations.scripts))

	var buildImg = gulp.src(sourses.img)
		.pipe(gulp.dest(destinations.img))

	var buildHtml = gulp.src(sourses.html)
		.pipe(gulp.dest(destinations.html))
});

//If you enter 'gulp', gulp will do 'watch' function
gulp.task('default', ['watch']);

gulp.task('clear', function(){
	return cache.clearAll();
});