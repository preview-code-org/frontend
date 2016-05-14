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
        return cache.match(request.url)
          .then(function(response) {
            var newRequest = request;
            if (response) {
              newRequest = insertETagFromResponse(request, response);
            }
            return fetch(newRequest).then(function(response) {
              cache.put(newRequest, response.clone());
              return response;
            });
          })
          .catch(function(e) {
            return cache.add(request);
          });
      })
    );
  }
});
