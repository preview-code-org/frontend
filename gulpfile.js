/**
@license
Copyright (c) 2016, preview-code
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of rite-evaluation nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
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
