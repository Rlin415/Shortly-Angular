angular.module('shortly.links', ['shortly.services'])

.controller('LinksController', function ($scope, Links) {
  angular.extend($scope, Links);
  // call the getLinks method here
  $scope.getLinks();
});
