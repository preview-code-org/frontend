'use strict';

var gulp = require('gulp');
var load = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var url = require('url');
var proxy = require('proxy-middleware');
var historyApiFallback = require('connect-history-api-fallback');
var eslint = require('gulp-eslint');

var serve = function(baseDir) {
  var proxyOptions = url.parse('http://localhost:9000/api/');
  proxyOptions.route = '/api';

  browserSync({
    port: 5200,
    notify: false,
    logPrefix: 'PSK',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function (snippet) {
          return snippet;
        }
      }
    },
    https: {
      key: 'certificate/server.key',
      cert: 'certificate/server.crt'
    },
    server: {
      baseDir: baseDir,
      middleware: [historyApiFallback(), proxy(proxyOptions)]
    }
  });
};

// Watch Files For Changes & Reload
gulp.task('serve', function () {
  serve(['src']);

  gulp.watch(['src/**/*.html'], reload);
  gulp.watch(['src/styles/**/*.css'], [reload]);
  gulp.watch(['src/**/*.js'], [reload]);
  gulp.watch(['app/images/**/*'], reload);
});

gulp.task('lint', function() {
  return gulp.src(['src/**/*.html', '!src/bower_components/**/*.html', 'test/**/*.html'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
