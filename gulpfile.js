var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

// Asset paths
var paths = {
  sass: ['_scss/**/*.scss'],
  css:  ['css/**/*.css'],
  html: ['*.html']
};

// Proxy URL
// If using with existing app, put the server url here
// Also handy with Typekit and other services
var devURL = "origin.dev";


// TASK: Compile Sass
gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sass({sourcemap: true, style: 'expanded', precision: '9'}))
    .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 9"))
    .pipe(gulp.dest('css'));
});


// TASK: BrowserSync
gulp.task('browser-sync', function() {  
  browserSync.init(paths.css, {
    xip: true,
    // open: false,
    // notify: false,

    // Use this for vhost
    // proxy: devURL,
    // host: devURL

    // Use this to ask Node to generate URL
    server: {
      baseDir: "./"
    }
  });
});


// TASK: Watch for changes
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, function(){
    browserSync.reload();
  });
});


// TASK: Default. Just run 'gulp' in CLI
gulp.task('default', ['sass', 'browser-sync', 'watch']);
