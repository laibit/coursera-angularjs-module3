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
    templateUrl: 'list.html',
    scope: {
      list: '<myList',
      onRemove: '&'
    },
    controller: ListDirectiveController,
    controllerAs: 'list',
    bindToController: true
    //transclude: true
  };

  return ddo;
}

function ListDirectiveController() {
  var list = this;


  return false;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.found = [];

  list.getItems = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      list.found = response;
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  list.removeItem = function (itemIndex) {
    //list.found.splice(itemIndex, 1);
    console.log("check");
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var totalItems = [];
    var foundItems = [];

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response) {
      totalItems = response.data.menu_items;

      for (var i = 0; i < totalItems.length; i++) {
        var name = totalItems[i].name;
        if (name.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems.push(totalItems[i]);
        }
      }

      return foundItems;
    })

  };

}

})();
