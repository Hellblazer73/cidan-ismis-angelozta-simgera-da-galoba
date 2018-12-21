var gulp = require('gulp'),
  connect = require('gulp-connect'),
  includer = require('gulp-htmlincluder'),
  sass = require('gulp-sass'),
  spritesmith = require('gulp.spritesmith');
//	cleanCSS = require('gulp-clean-css'),
//    htmlmin = require('gulp-htmlmin');

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('htmlIncluder', function() {
    gulp.src('dev/**/*.html')
    	.pipe(includer())
        .pipe(gulp.dest('build/'))
		.pipe(connect.reload());
});

gulp.task('sass', function () {
  return gulp.src('dev/sass/style.main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload());
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('dev/img/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('dev/img/sprite/'));
});

gulp.task('move', function () {
	gulp.src('dev/img/**/*.*')
	.pipe(gulp.dest('build/img/'))
	.pipe(connect.reload());

});

gulp.task('movejs', function () {
	gulp.src('dev/js/**/*.js')
	.pipe(gulp.dest('build/js/'))
	.pipe(connect.reload());

});

//gulp.task('minify-css', function() {
//  return gulp.src('build/css/*.css')
//    .pipe(cleanCSS({compatibility: 'ie8'}))
//    .pipe(gulp.dest('build/css/*.css'));
//});
//
//gulp.task('minify', function() {
//  return gulp.src('build/*.html')
//    .pipe(htmlmin({collapseWhitespace: true}))
//    .pipe(gulp.dest('build'));
//});


gulp.task('default', function () {
  gulp.start('connect','sass','htmlIncluder','move'),
	gulp.watch(['dev/sass/**/*.scss'], ['sass']),
	gulp.watch(['dev/**/*.html'], ['htmlIncluder']),
	gulp.watch(['dev/img/**/*.*'], ['move']),
  gulp.watch(['dev/js/**/*.js'], ['movejs']);
});
