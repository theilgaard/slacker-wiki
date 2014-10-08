(function () {
  'use strict';

  angular
    .module('swigi.services.pagesService', [])
    .factory('PagesService', PagesService);

  function PagesService($http) {
    var pagesService = {};

    pagesService.getPages = getPages;

    return pagesService;

    function getPages() {
      return $http.get('http://192.168.1.11:8080/api/pages');
    }
  }

})();
