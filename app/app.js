var app = angular.module('100DaysTrackerApp', ['ngSanitize']);


app.controller('GitHubController', ['$scope', '$http', function ($scope, $http) {
  $scope.gitHubObject,
    $scope.hasGitHubData = true,
    $scope.username = "",
    $scope.repo = "",
    $scope.firstTimeUser = isUserNew(),
    $scope.codedToday;
  $scope.getUserInfo = function () {
    let apiUrl = 'https://api.github.com/repos/' + $scope.username + '/' + $scope.repo;
    //console.log(apiUrl);
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
      //Should do a check here since the first time people visit this will return null
      if (localStorage.getItem($scope.username + "_userObject") != null) {
        //Something is there, need to update it all
        var storedUserData = localStorage.getItem($scope.username + "_userObject");
        storedUserData = JSON.parse(storedUserData);

        if (storedUserData.repos.indexOf($scope.repo) == -1) {
          storedUserData.repos.push($scope.repo);
        }
        storedUserData.lastUpdated = new Date();
        storedUserData.lastGithubApiResponse = response;
        localStorage.setItem($scope.username + "_userObject",storedUserData);
      }else{
        
      localStorage.setItem($scope.username + "_userObject", JSON.stringify({ 'username': $scope.username, 'repos': [$scope.repo], 'lastUpdated': new Date(), 'lastGithubApiResponse': response }));
      }
    }, function errorCallback(response) {
      //Show the user something that there is an issue.  Also maybe try and setup something so I log this?
    });
  };

  function isUserNew() {
    if (localStorage.getItem($scope.username + "_userObject") === undefined) {
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
    return currentState ? false : true;
  }

}]);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./100-days-service.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}else{
  //Let the user know their browser doesnt support service workers and wont get updates etc.
}