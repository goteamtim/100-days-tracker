var app = angular.module('100DaysTrackerApp', []);

app.controller('GitHubController', ['$scope','$http',function ($scope, $http) {
  $scope.gitHubObject,
  $scope.hasGitHubData = true,
  $scope.username = "",
  $scope.repo = "";
  $scope.getUserInfo = function() {
    let apiUrl = 'https://api.github.com/repos/' + $scope.username + '/' + $scope.repo;
    console.log(apiUrl);
    $http({
      method: 'GET',
      url: apiUrl
    }).then(function successCallback(response) {
      //response.data will be only the data if you ever want that
      $scope.gitHubObject = response;
      console.log("success with the url");
      console.log(response.data.updated_at);
    }, function errorCallback(response) {
      //Show the user something that there is an issue.  Also maybe try and setup something so I log this?
    });
  };

}]);