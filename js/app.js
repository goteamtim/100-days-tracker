var app = angular.module('100DaysTrackerApp', []);

app.controller('GitHubController', function ($scope, $http) {
  $scope.gitHubObject = {};
  $http({
    method: 'GET',
    url: 'https://api.github.com/repos/goteamtim/100-days-of-code'
  }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.gitHubObject = response;
    console.log("success with the url");
    console.log(response);
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

});