(function () {
  'use strict';

  angular
    .module('swigi.home')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($log, PagesService) {
    var vm = this;
    vm.pages = [];

    PagesService.getPages()
      .then(function (response) {
        vm.pages = response.data;
      });
  }

})();
