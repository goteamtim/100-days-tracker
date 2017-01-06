var app = angular.module('100DaysTrackerApp', ['ngSanitize']);


app.controller('GitHubController', ['$scope', '$http', function ($scope, $http) {
  $scope.gitHubObject,
    $scope.hasGitHubData = true,
    $scope.username = "",
    $scope.repo = "",
    $scope.firstTimeUser = checkUserStatus(),
    $scope.codedToday;
  $scope.getUserInfo = function () {
    let apiUrl = 'https://api.github.com/repos/' + $scope.username + '/' + $scope.repo;
    console.log(apiUrl);
    $http({
      method: 'GET',
      url: apiUrl
    }).then(function successCallback(response) {
      //response.data will be only the data if you ever want that
      //$scope.hasGitHubData = true;
      $scope.gitHubObject = response;
      if (activeToday(response.data.pushed_at)) {
        $scope.codedToday = "You have finished for today! Have you <a href=\"https:\/\/twitter.com\/intent\/tweet?text=I%20completed%20my%20%23100daysofcode%20challenge%20for%20today!%20I%20worked%20on\">Tweeted</a> yet?";
      } else {
        $scope.codedToday = "you need to code today!";
      }
      
      

    }, function errorCallback(response) {
      //Show the user something that there is an issue.  Also maybe try and setup something so I log this?
    });
  };

  function checkUserStatus() {
    if (localStorage.getItem("lastVisitDate") === null) {
      return true;
    } else {
      return false;
    }
  }

  function activeToday(lastDate) {
    var inputDate = new Date(lastDate),
    todaysDate = new Date();
    if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
      return true;
    } else {
      return false;
    }

  }

  function toggleState(currentState) {
    currentState ? false: true;
  }

}]);