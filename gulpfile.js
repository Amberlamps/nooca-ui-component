'use strict';

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var path = require('path');
var rename = require("gulp-rename");
var babel = require('gulp-babel');
var pkg = require('./package.json');
var browserSync = require('browser-sync');
var dust = require('gulp-dust');

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var atImport = require("postcss-import");
var mixins = require('postcss-mixins');
var nested = require('postcss-nested');
var vars = require('postcss-simple-vars');
var magician = require('postcss-font-magician');

gulp.task('watch', () => {
  gulp.watch('./src/css/**/*.css', ['css:development']);
  gulp.watch('./src/js/**/*.js', ['js:development']);
});

gulp.task('css:development', () => {
  var processors = [
    atImport,
    mixins,
    nested,
    vars,
    magician,
    autoprefixer,
    mqpacker
  ];
  return gulp.src('./src/css/index.css')
    .pipe(postcss(processors))
    .pipe(rename(pkg.name + '-' + pkg.version + '.css'))
    .pipe(gulp.dest('./app/public/css'));
});

gulp.task('css:build', () => {
  return gulp.src('./src/css/module.css')
    .pipe(rename('index.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('js:development', () => {

  var bundler = browserify({
    entries: ['./src/js/index.js'],
    debug: true
  });

  return bundler
  .bundle()
  .pipe(source('./' + pkg.name + '-' + pkg.version + '.js'))
  .pipe(buffer())
  .pipe(babel({
    compact: false,
    presets: ['es2015']
  }))
  .pipe(gulp.dest('./app/public/js/'));

});

gulp.task('serve', function() {
  browserSync.init(null, {
    proxy: "http://localhost:3001",
      files: ["app/public/**/*.*", "app/views/**/*.*"],
      browser: "google chrome",
      port: 7000
  });
});

gulp.task('development', ['js:development', 'css:development', 'watch']);
gulp.task('build', ['css:build']);