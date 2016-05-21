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
      .catch(function(e) {
        console.log('Cached file resulted in network error', e);
        return fetch(request).then(function(newResponse) {
          cache.put(request.url, newResponse.clone());
          return newResponse.clone();
        }).catch(function(e2) {
          console.log('Fetching uncached failed too, are we offline?', e2);
        });
      });
  });
}

self.addEventListener('fetch', function(event) {
  var request = event.request;
  if (request.method === 'GET'
      && request.url.match('^https://api.github.com')
      // Diff views are fetched from the same end-points as normal PRs, so ignore these.
      && request.headers.get('Accept') !== 'application/vnd.github.VERSION.diff') {
    event.respondWith(
      retrieveETagFromGitHubCache(request)
    );
  }
});
