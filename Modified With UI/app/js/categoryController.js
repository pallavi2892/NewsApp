
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
        console.log("valid");

        $location.path("/category" );
    }

    console.log("category");
});




app.controller('categoryController', function($scope, $location) {

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

});


app.controller('addNewsController',function ($scope,$location) {
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