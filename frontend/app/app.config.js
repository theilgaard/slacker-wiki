(function () {
  'use strict';

  angular
    .module('swigi')
    .config(config);

  function config($urlRouterProvider, $httpProvider) {
    // Redirect to '/home' if no page exists on the given url
    $urlRouterProvider
      .otherwise('/home');

    // Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }

})();
