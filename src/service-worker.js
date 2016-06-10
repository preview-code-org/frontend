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
var cacheName = 'PreviewCode-v1';

function insertETagFromResponse(request, response) {
  var headers = new Headers();
  // Copy all original headers
  for (var header in request.headers.keys()) {
    var value = request.headers[header];
    if (value) {
      headers.append(header, value);
    }
  }
  // Add previous ETag value to receive 304 response.
  headers.append('If-None-Match', response.headers.get('ETag'));
  return new Request(request.url, {
    method: 'GET',
    headers: headers,
    body: request.body,
    mode: request.mode === 'navigate' ? 'cors' : request.mode,
    credentials: request.credentials,
    cache: request.cache,
    redirect: request.redirect,
    referrer: request.referrer,
    integrity: request.integrity
  });
}

function retrieveETagFromGitHubCache(request) {
  return caches.open(cacheName).then(function(cache) {
    return cache.match(request.url)
      .then(function(oldResponse) {
        var newRequest = request;
        if (oldResponse) {
          newRequest = insertETagFromResponse(request, oldResponse);
        }
        return fetch(newRequest).then(function(newResponse) {
          if (newResponse.status >= 304) {
            return oldResponse.clone();
          }
          cache.put(request.url, newResponse.clone());
          return newResponse.clone();
        }).catch(function(e) {
          console.log('Cached file resulted in network error', e);
          return oldResponse.clone();
        });
      })
    })
    .catch(function(e) {
      console.log('Cached file resulted in network error', e);
      return fetch(request).then(function(newResponse) {
        cache.put(request.url, newResponse.clone());
        return newResponse.clone();
      }).catch(function(e2) {
        console.log('Fetching uncached failed too, are we offline?', e2);
      });
    });
}

self.addEventListener('fetch', function(event) {
  var request = event.request;
  if (request.method === 'GET'
      && request.url.match('^https://api.github.com')
      // Diff views are fetched from the same end-points as normal PRs, so ignore these.
      && request.headers.get('Accept') !== 'application/vnd.github.VERSION.diff'
      && request.headers.get('Accept') !== 'application/vnd.github.cerberus-preview+json') {
    event.respondWith(
      retrieveETagFromGitHubCache(request)
    );
  }
});
