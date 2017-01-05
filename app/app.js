var app = angular.module('100DaysTrackerApp', []);


app.controller('GitHubController', ['$scope','$http',function ($scope, $http) {
  $scope.gitHubObject,
  $scope.hasGitHubData = true,
  $scope.username = "",
  $scope.repo = "",
  $scope.firstTimeUser = checkUserStatus();
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
      if(activeToday(response.data.pushed_at)){
        console.log("You have finished for today!")
      }else{
        console.log("Dont forget to code today!")
      }
      console.log("success with the url");
      console.log(response.data.pushed_at);
      
    }, function errorCallback(response) {
      //Show the user something that there is an issue.  Also maybe try and setup something so I log this?
    });
  };

  function checkUserStatus(){
    if(localStorage.getItem("lastVisitDate")  === null){
      return true;
  }else{
    return false;
  }
  }

  function activeToday(lastDate){
    var lastDevDate = new Date(lastDate),
    todayDevDate = new Date(),
    timeDifference = todayDevDate.getTime() - lastDevDate.getTime(),
    dayDifference = Math.ceil(timeDifference / (1000* 3600 * 24));
    console.log(dayDifference)
    if(dayDifference > 0){
      return false;
    }else{
      return true;
    }

  }

  function toggleState(currentState){
    if(currentState){
      currentState = false;
    }else{
      currentState = true;
    }
  }

}]);