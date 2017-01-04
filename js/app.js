var app = angular.module('100DaysTrackerApp', []);

app.controller('GitHubController', function ($scope, $http) {
  $scope.gitHubObject = {},
  this.username = "",
  this.repo = "";
  $scope.getUserInfo = function(username, repo) {
    let apiUrl = 'https://api.github.com/repos/' + username + '/' + repo;
    $http({
      method: 'GET',
      url: apiUrl
    }).then(function successCallback(response) {
      //response.data will be only the data if you ever want that
      $scope.gitHubObject = response;
      console.log("success with the url");
      console.log(response);
    }, function errorCallback(response) {
      //Show the user something that there is an issue.  Also maybe try and setup something so I log this?
    });
  };

});