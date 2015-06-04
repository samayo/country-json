// Include gulp and plugins
var gulp = require('gulp');
var jsonlint = require("gulp-jsonlint");

gulp.task('lint', function () {
	return gulp.src('./src/*.json')
		.pipe(jsonlint())
		.pipe(jsonlint.reporter());
});

gulp.task('ci', ['lint']);