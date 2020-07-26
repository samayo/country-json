'use strict';

var mapStream = require('map-stream');
var gutil = require('gulp-util');
var c = gutil.colors;
var jsonlint = require('jsonlint');
var through = require('through2');
var PluginError = require('gulp-util').PluginError;

var formatOutput = function (msg) {
    var output = {};

    if (msg) { output.message = msg; }

    output.success = msg ? false : true;

    return output;
};

var jsonLintPlugin = function (options) {
    options = options || {};

    return mapStream(function (file, cb) {
        var errorMessage = '';

        try {
            jsonlint.parse(String(file.contents));
        }
        catch (err) {
            errorMessage = err.message;
        }
        file.jsonlint = formatOutput(errorMessage);

        cb(null, file);
    });
};

var defaultReporter = function (file) {
    gutil.log(c.yellow('Error on file ') + c.magenta(file.path));
    gutil.log(c.red(file.jsonlint.message));
};

jsonLintPlugin.reporter = function (customReporter) {
    var reporter = defaultReporter;

    if (typeof customReporter === 'function') {
        reporter = customReporter;
    }

    return mapStream(function (file, cb) {
        if (file.jsonlint && !file.jsonlint.success) {
            reporter(file);
        }
        return cb(null, file);
    });
};

/**
 * Fail when an jsonlint error is found in jsonlint results.
 */
jsonLintPlugin.failOnError = function() {

    return through.obj(function (file, enc, cb) {
        if (file.jsonlint.success === false) {
            var error = new PluginError(
                    'gulp-jsonlint',
                    {
                        name: 'JSONLintError',
                        filename: file.path,
                        message: file.jsonlint.message,
                    }
                );
        }

        return cb(error, file);
    });
};

/**
 * Fail when the stream ends if any jsonlint error(s) occurred
 */
jsonLintPlugin.failAfterError = function () {
    var errorCount = 0;

    return through.obj(function (file, enc, cb) {
        errorCount += file.jsonlint.success === false

        cb(null, file);

    }, function (cb) {
        if (errorCount > 0) {
            this.emit('error', new PluginError(
                'gulp-jsonlint',
                {
                    name: 'JSONLintError',
                    message: 'Failed with ' + errorCount +
                        (errorCount === 1 ? ' error' : ' errors')
                }
            ));
        }

        cb();
    });
};

module.exports = jsonLintPlugin;
