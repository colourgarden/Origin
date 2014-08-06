var gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    sass        = require('gulp-ruby-sass'),
    prefix      = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include'),
    webserver   = require('gulp-webserver'),
    opn         = require('opn');

// Asset paths
var paths = {
  sass: '_scss/**/*.scss',
  css:  'css',
  templates: './templates/*.html',
  build: './build'
};

// Proxy URL (Handy for Typekit and other services)
var server = {
  host: 'origin.dev',
  port: '8001'
};


// TASK: Compile Sass
gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(sass({sourcemap: true, style: 'expanded', precision: '9'}))
    .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 9"))
    .pipe(gulp.dest(paths.build + '/' + paths.css));
});


// TASK: Include files
gulp.task('fileinclude', function() {
  gulp.src(paths.templates)
    .pipe(fileinclude())
    .pipe(gulp.dest(paths.build));
});


// TASK: Set up a webserver
gulp.task('webserver', function() {
  gulp.src(paths.build)
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true
    }));
});


// TASK: Open a browser window
gulp.task('openbrowser', function() {
  opn('http://' + server.host + ':' + server.port);
});


// TASK: Watch for changes
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch([paths.templates], ['fileinclude']);
});


// TASK: Build project, no webserver
gulp.task('build', ['sass', 'fileinclude']);


// TASK: Default. Just run 'gulp' in CLI
gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);
