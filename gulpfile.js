// Include gulp and plugins
var gulp = require('gulp');
var jsonlint = require('gulp-jsonlint');
var gutil = require('gulp-util');

gulp.task('lint', function () {
  return gulp.src('./src/*.json')
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(failReporter));
});

// Custom reporter for jsonlint to ensure Gulp exits correctly on fail for Travis tests.
var failReporter = function (file) {
  if (file.jsonlint && !file.jsonlint.success) {
    throw new gutil.PluginError('gulp-jsonlint', file.jsonlint.message);
  }
};

gulp.task('ci', ['lint']);
