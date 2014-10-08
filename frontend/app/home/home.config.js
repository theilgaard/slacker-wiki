(function () {
  'use strict';

  angular
    .module('swigi.home')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      });
  }

})();
