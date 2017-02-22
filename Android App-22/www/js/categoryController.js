
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
    // if($scope.username == 'admin' && $scope.password == 'admin') {
//             $location.path('/category');
//         }
//         else{
//             alert('Wrong Stuff');
//         }
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
    };


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

// $scope.$watch('online', function(newStatus) { });





//
//app.controller('videoController', function($scope, $cordovaCapture) {
//  $scope.data = {
//    videoPath: ""
//  };
//
//  $scope.captureVideo = $scope.captureVideo = function() {
//    var options = { limit: 3, duration: 15 };
//
//    $cordovaCapture.captureVideo(options).then(function(videoData) {
//      // Success! Video data is here
//      $scope.data.videoPath = "file:/" + videoData[0].fullPath;
//    }, function(err) {
//      // An error occurred. Show a message to the user
//      console.log(err);
//    });
//  }
//});


//app.directive("cordovaVideo", function () {
//  return {
//    restrict: 'AEC',
//    scope: {src: '='},
//link: function(scope, element, attrs) {
//      scope.$watch('src', function(newVal, oldVal) {
//        if (scope.src != "") {
//          // Create a div object
//          var div = document.createElement('div');
//          div.innerHTML = "<video id="myCordovaVideo" controls>"+
//                          "<source src="" + scope.src + "" type="video/quicktime">"+
//                          "</video>";
//
//          // Delete previous video if exists
//          var previousDiv = document.getElementById('myCordovaVideo');
//          if (previousDiv)
//            previousDiv.remove();
//
//          // Append new <video> tag into the DOM
//          element.append(div);
//        }
//
//      });
//    }
//  }
//});




//main camera controller
//
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







//
// app.controller("cameraController", function ($scope, $cordovaCamera) {
// $scope.takePhoto = function () {
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
//                    saveToPhotoAlbum: false
//                };
//
//                    $cordovaCamera.getPicture(options).then(function (imageData) {
//                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
//                    }, function (err) {
//                        // An error occured. Show a message to the user
//                    });
//                }
//            });



//app.controller('myCtrl', function($scope, $cordovaCapture) {
//
//    $scope.captureAudio = function() {
//        var options = { limit: 3, duration: 10 };
//
//        $cordovaCapture.captureAudio(options).then(function(audioData) {
//            // Success! Audio data is here
//             var i, path, len;
//             for(i =0,len=videoData.length; i<len; i+=1) {
//                 path = videoData[i].fullPath;
//                 console.log(videoData);
//                        }
//        }, function(err) {
//            // An error occurred. Show a message to the user
//        });
//    };

//    $scope.captureImage = function() {
//        var options = { limit: 3 };
//
//        $cordovaCapture.captureImage(options).then(function(imageData) {
//
//             Success! Image data is here
//             var options = {
//                                quality: 75,
//                                destinationType: Camera.DestinationType.DATA_URL,
//                                sourceType: Camera.PictureSourceType.CAMERA,
//                                allowEdit: true,
//                                encodingType: Camera.EncodingType.JPEG,
//                                targetWidth: 300,
//                                targetHeight: 300,
//                                popoverOptions: CameraPopoverOptions,
//                                saveToPhotoAlbum: true
//                            };
//
//                            $cordovaCamera.getPicture(options).then(function (imageData) {
//                                                    $scope.imgURI = "data:image/jpeg;base64," + imageData;
//                                                }
//
//
//        }, function(err) {
//            // An error occurred. Show a message to the user
//        });
//    };

//    $scope.captureVideo = function() {
//        var options = { limit: 3, duration: 15 };
//
//        $cordovaCapture.captureVideo(options).then(function(videoData) {
//            // Success! Video data is here
//            var i, path, len;
//            for(i =0, len=videoData.length; i<len; i+=1) {
//            path = videoData[i].fullPath;
//            console.log(videoData);
//            }
//            }
//        }, function(err) {
//            // An error occurred. Show a message to the user
//        });
//    }
//
//});

app.controller('captureCtrl', function($scope, $cordovaCapture) {

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
