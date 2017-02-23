
var category = {
    AllNews: "https://rss.sciencedaily.com/all.xml",
    TopNews: "https://rss.sciencedaily.com/top.xml",
    Science: "https://rss.sciencedaily.com/top/science.xml",
    Health: "https://rss.sciencedaily.com/top/health.xml",
    Technology: "https://rss.sciencedaily.com/top/technology.xml",
    Environment: "https://rss.sciencedaily.com/top/environment.xml",
    Society: "https://rss.sciencedaily.com/top/society.xml",
    StrangeOffBeat: "https://rss.sciencedaily.com/strange_offbeat.xml",
    MostPopular: "https://rss.sciencedaily.com/most_popular.xml"
}




app.controller("login", function ($scope,$location) {
    $scope.email = "";
    $scope.password = "";
    $scope.submitForm=function () {
    console.log($scope.email);

        $location.path("/category" );
    }

    console.log("category");
});




app.controller('categoryController', function($scope, $location,$cordovaGeolocation) {

    this.list = category;
    this.getKeys=function() {
        var keys = [];
        for(i in this.list) {
            keys.push(i);
        }
        return keys;
    }

    $scope.displayNews = function (btn) {
        $scope.b=btn;
        $location.path('/category/'+$scope.b);

    }

    $scope.addNews = function() {
        $location.path('/category/addNews');
    }

        $scope.back = function() {
            $location.path('/login');
        }

});


app.controller('addNewsController',function ($scope,$location) {
    $scope.back = function() {
            $location.path('/category');
        }
    $scope.appTitle = "User added News";
    $scope.saved = localStorage.getItem('todos');
    $scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [ {text: 'News1'}, {text: 'News2'} ];
    localStorage.setItem('todos', JSON.stringify($scope.todos));

    $scope.addTodo = function() {
        $scope.todos.push({
            text: $scope.todoText,
            date: $scope.date,
            reporter: $scope.reporter,
            description: $scope.description
        });
        $scope.todoText = ''; //clear the input after adding
        $scope.date = '';
        $scope.reporter = '';
        $scope.description = '';

        localStorage.setItem('todos', JSON.stringify($scope.todos));

        $scope.userAddedNews();
    };

     $scope.userAddedNews = function(){
            $location.path('/userAddedNews');
            }

    $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo){
            if (!todo.done)
                $scope.todos.push(todo);
        });
        localStorage.setItem('todos', JSON.stringify($scope.todos));
    };
});




app.controller('newsDisplayCtrl', function($scope,$location,$http,$routeParams)
{
    $scope.back = function() {
            $location.path('/category');
        }

    $scope.parameter = $routeParams;
    $scope.display = [];
    $scope.welcome = [];
    $http({
        method: 'GET',
        url: category[$scope.parameter.type]

    }).then(function (response) {
        var xml = response.data;
        var json = $.xml2json(xml);

        // $scope.myWelcome = [];
        $scope.myWelcome= json;

        for (var i = 0; i < $scope.myWelcome.channel.item.length; i++) {
            $scope.welcome += $scope.myWelcome.channel.item[i].title;
            $scope.welcome += $scope.myWelcome.channel.item[i].pubDate;
            $scope.welcome += $scope.myWelcome.channel.item[i].description + "------";
            $scope.image += $scope.myWelcome.channel.item[i].media + "-------";
            // $scope.welcome.push($scope.myWelcome[i]);
        }

    });
});

app.run(function($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function() {
        $rootScope.$apply(function() {
            $rootScope.online = false;
        });
    }, false);

    $window.addEventListener("online", function() {
        $rootScope.$apply(function() {
            $rootScope.online = true;
        });
    }, false);
});


//main camera controller

app.controller("cameraController", function ($scope, $cordovaCamera) {

                $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                };

                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }

                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                };

                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }

            });



app.controller('captureController', function($scope, $cordovaCapture) {

      $scope.captureAudio = function() {
        var options = { limit: 2, duration: 20 };

        $cordovaCapture.captureAudio(options).then(function(audioData) {
          // Success! Audio data is here
          var i, path, len;

                for (i = 0, len = audioData.length; i < len; i += 1) {
                   path = audioData[i].fullPath;
                   console.log(audioData);
                }
        }, function(err) {
          // An error occurred. Show a message to the user
        });
      }

      $scope.captureVideo = function() {
        var options = { limit: 2, duration: 15 };

        $cordovaCapture.captureVideo(options).then(function(videoData) {
          // Success! Video data is here
            var i, path, len;

                for (i = 0, len = videoData.length; i < len; i += 1) {
                   path = videoData[i].fullPath;
                   console.log(videoData);
                }
        }, function(err) {
          // An error occurred. Show a message to the user
        });
      }

});



app.controller('geoController', function($scope, $cordovaGeolocation, $http) {

$scope.geolocation = function() {
if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);

function onPositionUpdate(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
    $http.get(url)
        .then(function(result) {
            var address = result.data.results[2].formatted_address;
            $scope.address = address;
            alert($scope.address);
        });
}
}
});


app.controller('userAddedNewsController',function ($scope,$location) {
//    $scope.back = function() {
//            $location.path('/addNews');
//        }



//    $scope.saved = localStorage.getItem('todos');
    $scope.todos = JSON.parse(localStorage.getItem('todos'));
//    localStorage.setItem('todos', JSON.stringify($scope.todos));



});