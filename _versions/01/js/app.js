(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);
//.constant('ApiBasePath', "http://localhost:8080/coursera/single-page-apps-angularjs/assignments/coursera-angularjs-module3");


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'list.html',
    scope: {
      list: '<myList',
      onRemove: '&'
    }
    //controller: ShoppingListDirectiveController,
    //controllerAs: 'list',
    //bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  //list.items = [{"short_name": "Test", "name": "Test Test"}];
  list.items = [];

  list.getItems = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      list.items = response;
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var totalItems = [];
    var foundItems = [];
    var count = 0;
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response) {
      totalItems = response.data.menu_items;
      console.log(totalItems.length);
      console.log(searchTerm);

      for (var i = 0; i < totalItems.length; i++) {
        var name = totalItems[i].name;
        //console.log(searchTerm + " exists in " + name + ": " + (name.toLowerCase().indexOf(searchTerm) !== -1));
        if (name.toLowerCase().indexOf(searchTerm) !== -1) {
          //foundItems.splice(i, 1);
          count++;
          foundItems.push(totalItems[i]);
        }
      }
      console.log("Occorrences: " + count);

      return foundItems;
    })

  };

}

})();
