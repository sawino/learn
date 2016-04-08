/**
 * Created by yangsaw on 11/14/2015.
 */

app.controller('ToDoController', ['$scope','$http','ToDos', function($scope, $http, ToDos) {
    $scope.userName = "default user name";
    $scope.test = function() {
        $http.get('/');
    };

//    $scope.todos = ToDos.query();

    $scope.todos = [];
    $scope.searchByTitle = function() {
         ToDos.get({title: $scope.searchTitle}, function(data) {
             console.log(data);
             $scope.todos.splice(0, $scope.todos.length);
             $scope.todos.push(data);
        });
    };

    $scope.searchAll = function() {
        $scope.todos = ToDos.query({});
        console.log($scope.todos);
    };

    $scope.deleteByTitle = function() {

        var result = ToDos.delete({title: $scope.searchTitle});
        console.log(result);
//        $scope.todos = ;

        $scope.searchAll();
    };

    $scope.addToDo = function() {
        var result = ToDos.save({}, {title: $scope.searchTitle, note: $scope.noteValue});
        console.log(result);
        $scope.searchAll();
    };

    $scope.updateByTitle = function() {
        var result = ToDos.update({title:$scope.searchTitle}, {title: $scope.searchTitle, note: $scope.noteValue});
        console.log(result);
        $scope.searchAll();
    }


}]);

app.controller('TestController', ['$scope', '$http', '$routeParams', 'TestResource', function($scope, $http, $routeParams, TestResource) {
    $scope.userName = "hey";
    $scope.testId = $routeParams.testId;
    $scope.testIds = ['A', "b"];
    $scope.testResources = TestResource.query();
}]);



