/**
 * Created by pallavi.b on 2/14/17.
 */

//1. create app module
var newsApp = angular.module('newsApp', []);

//2. create controller
newsApp.controller("addNewsController", function ($scope, $http) {

    //3. attach originalNews model object
    $scope.originalNews = {
        news: 'James',
        date: new Date('01/31/1980'),
        reporter: 'Bond',
        description: 'something'
    };

    //4. copy originalNews to storeNews. student will be bind to a form
    $scope.storeNews = angular.copy($scope.originalNews);

    //5. create submitForm() function. This will be called when user submits the form
    $scope.submitForm = function () {

        var onSuccess = function (data, status, headers, config) {
            alert('News saved successfully.');
        };

        var onError = function (data, status, headers, config) {
            alert('Error occured.');
        }

        $http.post('/storeNews/submitData', { student:$scope.storeNews })
            .success(onSuccess)
            .error(onError);

    };


});




