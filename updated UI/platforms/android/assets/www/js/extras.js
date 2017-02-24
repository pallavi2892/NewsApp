
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


//app.controller('geoController', function($scope, $cordovaGeolocation) {
//
//$scope.geolocation = function() {
//   var posOptions = {timeout: 10000, enableHighAccuracy: false};
//   $cordovaGeolocation
//   .getCurrentPosition(posOptions)
//
//   .then(function (position) {
//      var lat  = position.coords.latitude
//      var long = position.coords.longitude
//      console.log(lat + '   ' + long)
//      alert("lat" + lat);
//
//
//   }, function(err) {
//      console.log(err)
//   });
//}
//   var watchOptions = {timeout : 3000, enableHighAccuracy: false};
//   var watch = $cordovaGeolocation.watchPosition(watchOptions);
//
//   watch.then(
//      null,
//
//      function(err) {
//         console.log(err)
//      },
//
//      function(position) {
//         var lat  = position.coords.latitude
//         var long = position.coords.longitude
//         console.log(lat + '' + long)
//      }
//   );
//
//   watch.clearWatch();
//});



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

//
//html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,dl,dt,dd,ol,nav ul,nav li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;}
//article, aside, details, figcaption, figure,footer, header, hgroup, menu, nav, section {display: block;}
//ol,ul{list-style:none;margin:0px;padding:0px;}
//blockquote,q{quotes:none;}
//blockquote:before,blockquote:after,q:before,q:after{content:'';content:none;}
//table{border-collapse:collapse;border-spacing:0;}
///* start editing from here */
//a{text-decoration:none;}
//.txt-rt{text-align:right;}/* text align right */
//.txt-lt{text-align:left;}/* text align left */
//.txt-center{text-align:center;}/* text align center */
//.float-rt{float:right;}/* float right */
//.float-lt{float:left;}/* float left */
//.clear{clear:both;}/* clear float */
//.pos-relative{position:relative;}/* Position Relative */
//.pos-absolute{position:absolute;}/* Position Absolute */
//.vertical-base{	vertical-align:baseline;}/* vertical align baseline */
//.vertical-top{	vertical-align:top;}/* vertical align top */
//nav.vertical ul li{	display:block;}/* vertical menu */
//nav.horizontal ul li{	display: inline-block;}/* horizontal menu */
//img{max-width:100%;}
///*end reset*/
///****-----start-body----****/
//body{
//    background-color:#86B4CC;
//}
//.main{
//    margin:7em auto 0;
//    width: 30%;
//}
//.user {
//    text-align: right;
//    vertical-align: middle;
//    margin-right: 5.2em;
//}
//.login{
//    padding:2em 0;
//}
//.inset {
//    position:relative;
//    background: #fff;
//    padding: 2em 2em;
//    border-radius: 0.3em;
//    -webkit-border-radius: 0.3em;
//    -o-border-radius: 0.3em;
//    -moz-border-radius: 0.3em;
//}
//.inset:before{
//    content: '';
//    width: 0;
//    height: 0;
//    border: 20px solid #FFF;
//    border-top: 0 solid rgba(0, 0, 0, 0)!important;
//    border-right: 13px solid rgba(0, 0, 0, 0)!important;
//    border-left: 13px solid rgba(0, 0, 0, 0);
//    left: 77.1%;
//    top: -5.3%;
//    position: absolute;
//}
//form span {
//    display: block;
//    font-size: 1em;
//    color: #787878;
//    padding-bottom: 5px;
//    font-weight: 600;
//    font-family: 'Open Sans', sans-serif;
//}
//input[type="text"],input[type="Password"] {
//    padding: 9px;
//    width: 90%;
//    font-size: 1.1em;
//    margin: 18px 0px;
//    border: 2px solid#EAEEF1;
//    color: #666666;
//    background:#EAEEF1;
//    font-family: 'Open Sans', sans-serif;
//    font-weight:600;
//    margin-left: 5px;
//    outline:none;
//    -webkit-transition: all 0.3s ease-out;
//    -moz-transition: all 0.3s ease-out;
//    -ms-transition: all 0.3s ease-out;
//    -o-transition: all 0.3s ease-out;
//    transition: all 0.3s ease-out;
//}
//input[type="text"]:hover,input[type="Password"]:hover,#active{
//    background:#fff;
//    border:2px solid #609EC3;
//    outline:none;
//}
//.sign {
//    padding: 10px 0;
//}
//
//.submit {
//    padding: 2px 2px;
//    float:left;
//    margin-right: 11px;
//}
//.submit input[type="submit"] {
//    background: #F06B37;
//    border: none;
//    outline: none;
//    padding: 0.55em 1.3em 0.6em;
//    cursor: pointer;
//    font-family: 'Open Sans', sans-serif;
//    color: #FFF;
//    font-size: 0.9em;
//    border-radius: 1.3em;
//    -webkit-border-radius: 1.3em;
//    -moz-border-radius: 1.3em;
//    -o-border-radius: 1.3em;
//    transition: 0.5s all;
//    -webkit-transition: 0.5s all;
//    -moz-transition: 0.5s all;
//    -o-transition: 0.5s all;
//    font-weight: 600;
//}
//.submit input[type="submit"]:hover{
//    background:#62A0C4;
//}
//.forget{
//    float:right;
//}
//.forget-pass a {
//    float: right;
//    color:#898888;
//    font-size: 0.95em;
//    margin-top: 13px;
//    transition: 0.5s all;
//    -webkit-transition: 0.5s all;
//    -moz-transition: 0.5s all;
//    -o-transition: 0.5s all;
//    font-weight: 600;
//    font-family: 'Open Sans', sans-serif;
//}
//.forget-pass a:hover {
//    text-decoration: underline;
//}
//.copy-right {
//    text-align: center;
//    width: 97%;
//    margin: 2em auto 0;
//}
//.copy-right p {
//    color: #FFF;
//    font-size: 1em;
//    font-family: 'Open Sans', sans-serif;
//}
//.copy-right p a {
//    font-family: 'Open Sans', sans-serif;
//    font-size: 1em;
//    font-weight: 600;
//    color: #1567A5;
//    -webkit-transition: all 0.3s ease-out;
//    -moz-transition: all 0.3s ease-out;
//    -ms-transition: all 0.3s ease-out;
//    -o-transition: all 0.3s ease-out;
//    transition: all 0.3s ease-out;
//}
//.copy-right p a:hover {
//    color:#fff;
//}
///*----start-responsive design-----*/
//@media (max-width:1440px){
//    .main {
//        width:33%;
//        margin: 7em auto 0;
//    }
//    .user {
//        margin-right: 4.2em;
//    }
//    .inset:before {
//        left: 80%;
//        top: -5.3%;
//    }
//}
//@media (max-width:1366px){
//    .main {
//        width:36%;
//    }
//    .inset:before {
//        left: 80%;
//        top: -5%;
//    }
//}
//@media (max-width:1280px){
//    .main {
//        width:40%;
//    }
//    .user {
//        margin-right: 5.2em;
//    }
//    .inset:before {
//        left: 78.3%;
//        top: -5.4%;
//    }
//    input[type="text"], input[type="Password"] {
//        padding: 9px;
//        width: 93%;
//    }
//}
//@media (max-width:1024px){
//    .main {
//        width:48%;
//        margin: 8em auto 0;
//    }
//    .inset:before {
//        left: 77.2%;
//        top: -5.4%;
//    }
//}
//@media (max-width:768px){
//    .main {
//        width:59%;
//    }
//    .inset:before {
//        left: 75.3%;
//        top: -5.4%;
//    }
//}
//@media (max-width:640px){
//    .main {
//        width:67%;
//    }
//    .inset:before {
//        left: 74.2%;
//        top: -5.4%;
//    }
//}
//@media (max-width:480px){
//    .main {
//        width:80%;
//        margin: 3em auto 0;
//    }
//    .user {
//        margin-right: 4.2em;
//    }
//    .inset:before {
//        left: 74.2%;
//        top: -5.4%;
//    }
//}
//@media (max-width:320px){
//    .main {
//        width: 97%;
//        margin: 2em auto 0;
//    }
//    .inset:before {
//        left: 67%;
//        top: -4.4%;
//    }
//    .user {
//        margin-right: 4.2em;
//    }
//    .login {
//        padding: 1em 0;
//    }
//    .submit{
//        padding: 2px ;
//        text-align: center;
//        float:none;
//    }
//    .forget-pass {
//        float:none;
//        text-align:center;
//        margin-top: 15px
//    }
//    .forget-pass a {
//        float:none;
//    }
//    input[type="text"], input[type="Password"] {
//        padding: 6px;
//        margin: 9px 0px;
//    }
//
//}




//loginstyle.css
* { box-sizing:border-box; }

body {
    font-family: Helvetica;
    background: #eee;
    -webkit-font-smoothing: antialiased;
}

hgroup {
    text-align:center;
    margin-top: 4em;
}

h1, h3 { font-weight: 300; }

h1 { color: #636363; }

h3 { color: #4a89dc; }

form {
    width: 380px;
    margin: 4em auto;
    padding: 3em 2em 2em 2em;
    background: #fafafa;
    border: 1px solid #ebebeb;
    box-shadow: rgba(0,0,0,0.14902) 0px 1px 1px 0px,rgba(0,0,0,0.09804) 0px 1px 2px 0px;
}

.group {
    position: relative;
    margin-bottom: 45px;
}

input {
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    -webkit-appearance: none;
    display: block;
    background: #fafafa;
    color: #636363;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #757575;
}

input:focus { outline: none; }


/* Label */

label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    -webkit-transition:all 0.2s ease;
    transition: all 0.2s ease;
}


/* active */

input:focus ~ label, input.used ~ label {
    top: -20px;
    -webkit-transform: scale(.75);
    transform: scale(.75); left: -2px;
    /* font-size: 14px; */
    color: #4a89dc;
}


/* Underline */

.bar {
    position: relative;
    display: block;
    width: 100%;
}

.bar:before, .bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #4a89dc;
    -webkit-transition:all 0.2s ease;
    transition: all 0.2s ease;
}

.bar:before { left: 50%; }

.bar:after { right: 50%; }


/* active */

input:focus ~ .bar:before, input:focus ~ .bar:after { width: 50%; }


/* Highlight */

.highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
}


/* active */

input:focus ~ .highlight {
    -webkit-animation: inputHighlighter 0.3s ease;
    animation: inputHighlighter 0.3s ease;
}


/* Animations */

@-webkit-keyframes inputHighlighter {
    from { background: #4a89dc; }
    to 	{ width: 0; background: transparent; }
}

@keyframes inputHighlighter {
    from { background: #4a89dc; }
    to 	{ width: 0; background: transparent; }
}


/* Button */

.button {
    position: relative;
    display: inline-block;
    padding: 12px 24px;
    margin: .3em 0 1em 0;
    width: 100%;
    vertical-align: middle;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    -webkit-font-smoothing: antialiased;
    text-align: center;
    letter-spacing: 1px;
    background: transparent;
    border: 0;
    border-bottom: 2px solid #3160B6;
    cursor: pointer;
    -webkit-transition:all 0.15s ease;
    transition: all 0.15s ease;
}
.button:focus { outline: 0; }


/* Button modifiers */

.buttonBlue {
    background: #4a89dc;
    text-shadow: 1px 1px 0 rgba(39, 110, 204, .5);
}

.buttonBlue:hover { background: #357bd8; }


/* Ripples container */

.ripples {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: transparent;
}


/* Ripples circle */

.ripplesCircle {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    opacity: 0;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
}

.ripples.is-active .ripplesCircle {
    -webkit-animation: ripples .4s ease-in;
    animation: ripples .4s ease-in;
}


/* Ripples animation */

@-webkit-keyframes ripples {
    0% { opacity: 0; }

    25% { opacity: 1; }

    100% {
        width: 200%;
        padding-bottom: 200%;
        opacity: 0;
    }
}

@keyframes ripples {
    0% { opacity: 0; }

    25% { opacity: 1; }

    100% {
        width: 200%;
        padding-bottom: 200%;
        opacity: 0;
    }
}


