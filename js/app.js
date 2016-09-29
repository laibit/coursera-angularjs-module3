(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");
//.constant('ApiBasePath', "http://localhost:8080/coursera/single-page-apps-angularjs/assignments/coursera-angularjs-module3");


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'list.html'
  };

  return ddo;
}



NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.found = [];

  list.getItems = function () {
    list.found = MenuSearchService.getMatchedMenuItems("test");
  };

  list.removeItem = function (itemIndex) {
    list.found = MenuSearchService.removeItem(itemIndex);
  };


}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  var found = [{short_name: "I1", name: "Item 1"},{short_name: "I2", name: "Item 2"},{short_name: "I3", name: "Item 3"}];

  service.getMatchedMenuItems = function (searchTerm) {
    return found;
  }

  service.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
    return found;
  }


}


})();
