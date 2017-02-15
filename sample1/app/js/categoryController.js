var app = angular.module('mainApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'login.html'
        })
        .when('/category', {
            templateUrl : 'category.html'
        })
        .when('/displayNews', {
            templateUrl : 'displayNews.html'
        })
        .when('/addNews', {
            templateUrl : 'addNews.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});


app.controller('loginCtrl', function($scope, $location) {
    $scope.submit = function(){
        var uname = $scope.username;
        var password = $scope.password;

        if($scope.username == 'admin' && $scope.password == 'admin') {
            $location.path('/category');
        }
        else{
            alert('Wrong Stuff');
        }

    };
});


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


app.controller('categoryController', function($scope, $location) {

    this.list = category;
    this.getKeys=function() {
        var keys = [];
        for(i in this.list) {
            keys.push(i);
        }
        return keys;
    }
    $scope.displayNews = function () {
        $location.path('/displayNews');
    }

    $scope.addNews = function() {
        $location.path('/addNews');
    }
});


// app.controller('addNewsController',function ($scope,$location) {
//     $scope.appTitle = "Katie's Awesome ToDo App";
//     $scope.appHeadline = "This one will save to local storage!";
//     $scope.saved = localStorage.getItem('todos');
//     $scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [ {text: 'Learn AngularJS', done: false}, {text: 'Build an Angular app', done: false} ];
//     localStorage.setItem('todos', JSON.stringify($scope.todos));
//
//     $scope.addTodo = function() {
//         $scope.todos.push({
//             text: $scope.todoText,
//             done: false
//         });
//         $scope.todoText = ''; //clear the input after adding
//         localStorage.setItem('todos', JSON.stringify($scope.todos));
//     };
//
//     $scope.remaining = function() {
//         var count = 0;
//         angular.forEach($scope.todos, function(todo){
//             count+= todo.done ? 0 : 1;
//         });
//         return count;
//     };
//
//     $scope.archive = function() {
//         var oldTodos = $scope.todos;
//         $scope.todos = [];
//         angular.forEach(oldTodos, function(todo){
//             if (!todo.done)
//                 $scope.todos.push(todo);
//         });
//         localStorage.setItem('todos', JSON.stringify($scope.todos));
//     };
// });

app.controller('addNewsController',function ($scope,$location) {
    $scope.appTitle = "User added News";
    $scope.appHeadline = "This one will save to local storage!";
    $scope.saved = localStorage.getItem('todos');
    $scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [ {text: 'Learn AngularJS', done: false}, {text: 'Build an Angular app', done: false} ];
    localStorage.setItem('todos', JSON.stringify($scope.todos));

    $scope.addTodo = function() {
        $scope.todos.push({
            text: $scope.todoText,
            done: false
        });
        $scope.todoText = ''; //clear the input after adding
        localStorage.setItem('todos', JSON.stringify($scope.todos));
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo){
            count+= todo.done ? 0 : 1;
        });
        return count;
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