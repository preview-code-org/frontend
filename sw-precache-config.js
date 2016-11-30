module.exports = {
 staticFileGlobs: [
   '/index.html',
   '/src/**',
   '/bower_components/webcomponentsjs/webcomponents-lite.min.js'
 ],
 navigateFallback: '/index.html',
 runtimeCaching: [{
   'urlPattern': '/https:\\/\\/fonts\\.googleapis\\.com\\//',
   'handler': 'cacheFirst'
 }],
 navigateFallbackWhitelist: [/^(?!\/__)/]
}
