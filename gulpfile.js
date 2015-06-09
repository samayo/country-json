// Include gulp and plugins
var gulp = require('gulp');
var jsonlint = require('gulp-jsonlint');
var gutil = require('gulp-util');
var exit = require('gulp-exit');

gulp.task('lint', function () {
  return gulp.src('./src/*.json')
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(failReporter))
    .pipe(exit());
});

var failReporter = function (file) {
  if (file.jsonlint && !file.jsonlint.success) {
    throw new gutil.PluginError('gulp-jsonlint', 'jsonlint failed for ' + file.relative);
  }
};

gulp.task('ci', ['lint']);
