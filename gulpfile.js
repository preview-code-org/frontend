var gulp = require('gulp');
var load = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var url = require('url');
var proxy = require('proxy-middleware');
var historyApiFallback = require('connect-history-api-fallback');

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
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
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
  gulp.watch(['src/**/*.js'], ['jshint', reload]);
  gulp.watch(['app/images/**/*'], reload);
});
