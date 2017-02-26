var imageUrl = "";
var addressofuser ="";
var recordAudio = "";
var recordVideo = "";

app.controller("login", function ($scope,$location) {
    $scope.email = "";
    $scope.password = "";
    $scope.submitForm=function () {
    console.log($scope.email);

        $location.path("/category" );
    }

});



app.controller('categoryController', function($scope, $location) {

    this.list = category;
    this.getKeys=function() {
        var keys = [];
        for(someButton in this.list) {
            keys.push(someButton);
        }
        return keys;
    }

    $scope.displayNews = function (btn) {
        $scope.button = btn;
        $location.path('/category/'+$scope.button);

    }

    $scope.addNews = function() {
        $location.path('/category/addNews');
    }

        $scope.back = function() {
            $location.path('/login');
        }

});




app.controller('newsDisplayCtrl', function($scope,$location,$http,$routeParams)
{
    $scope.back = function() {
            $location.path('/category');
        }

    $scope.parameter = $routeParams;
    $scope.display = [];
    $http({
        method: 'GET',
        url: category[$scope.parameter.type]

    }).then(function (response) {
        var xml = response.data;
        var json = $.xml2json(xml);

        // $scope.myWelcome = [];
        $scope.newsData = json;

        for(var i=0; i<newsData.length; i++)
        $scope.estDate = $scope.newsData.channel.item[i].pubDate;
        $scope.newDate = new Date(estDate);

    });
});



app.controller('addNewsController',function ($scope,$location,$cordovaCamera,$http, $cordovaGeolocation, $cordovaCapture) {
    $scope.back = function() {
            $location.path('/category');
        }
    $scope.appTitle = "User added News";
    $scope.saved = localStorage.getItem('todos');
    $scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [ {text: 'News1'}, {text: 'News2'} ];
    localStorage.setItem('todos', JSON.stringify($scope.todos));

//    $scope.photo=function(){
        $scope.takePhoto = function () {
//        console.log("Inside take Phot");
                          var options = {
                            quality: 75,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA,
                            allowEdit: false,
                            encodingType: Camera.EncodingType.JPEG,
                            targetWidth: 300,
                            targetHeight: 300,
                            popoverOptions: CameraPopoverOptions,
                            saveToPhotoAlbum: true
                        };

                            $cordovaCamera.getPicture(options).then(function (imageData) {
                                $scope.imgURI = "data:image/jpeg;base64," + imageData;
                                console.log($scope.imgURI);
                                imageUrl = $scope.imgURI;
                            }, function (err) {
                                alert("image cannot be captured. Try again")
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
                                imageUrl = $scope.imgURI;
                            }, function (err) {
                                // An error occured. Show a message to the user
                                alert("check path and try again")
                            });
                        }


        $scope.geolocation = function() {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);

        function onPositionUpdate(position) {
        console.log("inside geo");
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
            $http.get(url)
                .then(function(result) {
                    var address = result.data.results[2].formatted_address;
                    $scope.address = address;
                    alert($scope.address);
                    addressofuser = $scope.address;
                });
        }

      }

//$scope.geolocation = function() {
//  if (navigator.geolocation) {
//    navigator.geolocation.getCurrentPosition(function(position){
//      $scope.$apply(function(){
//        $scope.position = position;
//        alert($scope.position);
//      });
//    });
//  }
//  }

              $scope.captureAudio = function() {
                var options = { limit: 1, duration: 20 };

                $cordovaCapture.captureAudio(options).then(function(audioData) {
                  // Success! Audio data is here
                  var i,  len;
                   $scope.path ="";
                        for (i = 0, len = audioData.length; i < len; i += 1) {
                           $scope.path = audioData[i].fullPath;
                           console.log(audioData);
                           recordAudio = $scope.path;
                        }
                }, function(err) {
                  // An error occurred. Show a message to the user
                });
              }


      $scope.captureVideo = function() {
        var options = { limit: 1, duration: 25 };

        $cordovaCapture.captureVideo(options).then(function(videoData) {
          // Success! Video data is here
            var i,  len;
               $scope.path2 ="";
                for (i = 0, len = videoData.length; i < len; i += 1) {
                   path2 = videoData[i].fullPath;
                   console.log(videoData);
                   recordVideo = $scope.path2;
                }
        }, function(err) {
          // An error occurred. Show a message to the user
        });
      }

    $scope.addTodo = function() {
    console.log("inside addTodo");
        $scope.todos.push({
            text: $scope.todoText,
            date: $scope.date,
            reporter: $scope.reporter,
            description: $scope.description,
            image: $scope.imgURI,
            addressofuser: $scope.address,
            recordAudio: $scope.path,
            recordVideo: $scope.path2
        });
        $scope.todoText = ''; //clear the input after adding
        $scope.date = '';
        $scope.reporter = '';
        $scope.description = '';

        localStorage.setItem('todos', JSON.stringify($scope.todos));

//        $scope.userAddedNews();
         $scope.showNews();
    };

     $scope.userAddedNews = function(){
            $location.path('/userAddedNews');
     }

         $scope.showNews = function(){
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



app.controller('userAddedNewsController',function ($scope,$location) {
    $scope.imgURI=imageUrl;
    $scope.address = addressofuser;
    $scope.path = recordAudio;
    $scope.path = recordVideo;
    $scope.back = function() {

            $location.path('/category/addNews');
        }

    $scope.todos = JSON.parse(localStorage.getItem('todos'));
//    localStorage.setItem('todos', JSON.stringify($scope.todos));

});

//main camera controller

//app.controller("cameraController", function ($scope, $cordovaCamera) {
//
//
//                $scope.takePhoto = function () {
//                  var options = {
//                    quality: 75,
//                    destinationType: Camera.DestinationType.DATA_URL,
//                    sourceType: Camera.PictureSourceType.CAMERA,
//                    allowEdit: true,
//                    encodingType: Camera.EncodingType.JPEG,
//                    targetWidth: 300,
//                    targetHeight: 300,
//                    popoverOptions: CameraPopoverOptions,
//                    saveToPhotoAlbum: true
//                };
//
//                    $cordovaCamera.getPicture(options).then(function (imageData) {
//                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
//                        imageUrl = $scope.imgURI;
//                    }, function (err) {
//                        // An error occured. Show a message to the user
//                    });
//                }
//
//                $scope.choosePhoto = function () {
//                  var options = {
//                    quality: 75,
//                    destinationType: Camera.DestinationType.DATA_URL,
//                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//                    allowEdit: true,
//                    encodingType: Camera.EncodingType.JPEG,
//                    targetWidth: 300,
//                    targetHeight: 300,
//                    popoverOptions: CameraPopoverOptions,
//                    saveToPhotoAlbum: true
//                };
//
//                    $cordovaCamera.getPicture(options).then(function (imageData) {
//                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
//                        imageUrl = $scope.imgURI;
//                    }, function (err) {
//                        // An error occured. Show a message to the user
//                    });
//                }
//
//            });
//
//

//app.controller('captureController', function($scope, $cordovaCapture) {
//
//      $scope.captureAudio = function() {
//        var options = { limit: 2, duration: 20 };
//
//        $cordovaCapture.captureAudio(options).then(function(audioData) {
//          // Success! Audio data is here
//          var i, path, len;
//
//                for (i = 0, len = audioData.length; i < len; i += 1) {
//                   path = audioData[i].fullPath;
//                   console.log(audioData);
//                }
//        }, function(err) {
//          // An error occurred. Show a message to the user
//        });
//      }
//
//      $scope.captureVideo = function() {
//        var options = { limit: 2, duration: 15 };
//
//        $cordovaCapture.captureVideo(options).then(function(videoData) {
//          // Success! Video data is here
//            var i, path, len;
//
//                for (i = 0, len = videoData.length; i < len; i += 1) {
//                   path = videoData[i].fullPath;
//                   console.log(videoData);
//                }
//        }, function(err) {
//          // An error occurred. Show a message to the user
//        });
//      }
//
//});



//app.controller('geoController', function($scope, $cordovaGeolocation, $http) {
//
//$scope.geolocation = function() {
//if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
//
//function onPositionUpdate(position) {
//    var lat = position.coords.latitude;
//    var lng = position.coords.longitude;
//    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
//    $http.get(url)
//        .then(function(result) {
//            var address = result.data.results[2].formatted_address;
//            $scope.address = address;
//            alert($scope.address);
//        });
//}
//}
//});


