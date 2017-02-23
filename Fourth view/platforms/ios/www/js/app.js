// 'use strict';
//
// // Declare app level module which depends on views, and components
// angular.module('myApp', [
//   'ngRoute',
//   'myApp.view1',
//   'myApp.view2',
//   'myApp.version'
// ]).
// config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
//   $locationProvider.hashPrefix('!');
//
//   $routeProvider.otherwise({redirectTo: '/view1'});
// }]);



var app = angular.module('mainApp', [
    'ngRoute','ngCordova']).config(['$locationProvider', '$routeProvider',function($locationProvider, $routeProvider){
    ($routeProvider)
        .when('/',{
            templateUrl:'html/login.html',
            controller:'login'
        })
        .when('/category',{
            templateUrl:'html/category.html',
            controller:'categoryController'
        })
        .when('/category/addNews',{
            templateUrl:'html/addNews.html',
            controller:'addNewsController',
            controller:'cameraController'
        })
        .when('/category/:type',{
            templateUrl:'html/displayNews.html',
            controller:'newsDisplayCtrl'
        })
        // .when('/userAddedNews',{
        //     templateUrl:'html/userAddedNews.html',
        //     controller:'userNewsController'
        // })
       .otherwise({
           redirectTo: '/'
        });

}]);