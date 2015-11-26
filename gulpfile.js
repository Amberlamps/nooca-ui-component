'use strict';

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var path = require('path');
var util = require('gulp-util');
var rename = require("gulp-rename");
//var config = require('./config.js');
var babel = require('gulp-babel');
//var pkg = require('./package.json');
var browserSync = require('browser-sync');
var dust = require('gulp-dust');


var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('watch', () => {
  gulp.watch('./src/css/**/*.css', ['css']);
});

function createCssFile(destination) {
  var processors = [
    autoprefixer
  ];
  return gulp.src('./src/css/index.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest(destination));
}

gulp.task('css:development', () => createCssFile('./app/public/css'));
gulp.task('css:build', () => createCssFile('./'));

gulp.task('development', ['css:development', 'watch']);
gulp.task('build', ['css:build']);

// function createJsFile(sourceFile, destFile, env) {
//   env = env || 'development';
//   var bundler = browserify({
//     entries: ['./lib/app/assets/js/' + sourceFile + '.js'],
//     debug: true
//   });
//   if (env === 'development') {
//     destFile += '-' + pkg.version;
//   }
//   destFile += '.js';
//   var bundle = function() {
//     bundler = bundler
//       .bundle()
//       .pipe(source(destFile))
//       .pipe(buffer())
//       .pipe(babel())
//       .pipe(sourcemaps.init({loadMaps: true}));

//     if (env === 'build') {
//       bundler = bundler.pipe(uglify());
//     }

//     return bundler
//       .pipe(sourcemaps.write('./'))
//       .pipe(gulp.dest('./lib/app/public/dist/js/'));
//   };
//   return bundle();
// }

// function createCssFile(file) {
//   gulp.src('./lib/app/assets/styles/' + file.source + '.less')
//     .pipe(sourcemaps.init({loadMaps: true}))
//     .pipe(less({
//       plugins: [cleancss]
//     }).on('error', util.log))
//     .pipe(rename(file.dest + '.css'))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./lib/app/public/dist/css/'));
// }

// gulp.task('styles', function() {
//   var themes = [{
//     source: 'main',
//     dest: 'newsletter.management.min'
//   }];
//   themes.forEach(createCssFile);
// });

// gulp.task('watch', function() {
//   gulp.watch('./lib/app/assets/styles/**/*.less', ['styles']);
//   gulp.watch('./lib/app/assets/js/**/*.js', ['js:development']);
//   gulp.watch('./lib/app/views/templates/**/*', ['dust']);
// });

// gulp.task('serve', function() {
//   browserSync.init(null, {
//     proxy: "http://localhost:" + config.server.port,
//       files: ["lib/app/public/dist/**/*.*", "lib/app/views/**/*.*"],
//       browser: "google chrome",
//       port: 7000
//   });
// });

// gulp.task('js:development', function() {
//   createJsFiles('development');
// });

// gulp.task('js:build', function() {
//   createJsFiles('build');
// });

// gulp.task('dust', function () {
//   return gulp.src('./lib/app/views/templates/**/*')
//     .pipe(dust())
//     .pipe(gulp.dest('./lib/app/public/dist/templates'));
// });

// function createJsFiles(env) {
//   env = env || 'development';
//   createJsFile('newsletter', 'newsletter.management.min', env);
// }

// gulp.task('default', ['development']);
// gulp.task('development', ['js:development', 'styles', 'watch']);
// gulp.task('build', ['js:build', 'dust', 'styles']);