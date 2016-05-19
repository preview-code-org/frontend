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

self.addEventListener('fetch', function(event) {
  var request = event.request;
  if (request.method === 'GET'
      && request.url.match('^https://api.github.com')) {
    event.respondWith(
      caches.open(cacheName).then(function(cache) {
        return cache.match(request)
          .then(function(oldResponse) {
            var newRequest = request;
            if (oldResponse) {
              newRequest = insertETagFromResponse(request, oldResponse);
            }
            return fetch(newRequest).then(function(newResponse) {
              if (newResponse.status === 304) {
                return oldResponse;
              }
              cache.put(newRequest, newResponse.clone());
              return newResponse;
            });
          })
          .catch(function(e) {
            return fetch(request).then(function(newResponse) {
              cache.put(request, newResponse.clone());
              return newResponse;
            });
          });
      })
    );
  }
});
