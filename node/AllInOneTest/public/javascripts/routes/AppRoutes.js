/**
 * Created by yangsaw on 11/14/2015.
 */
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/todos', {
            templateUrl: 'ToDo',
            controller: 'ToDoController'
        })
        .when('/test', {
            templateUrl: 'Test',
            controller: 'TestController'
        })
        .when('/test/:testId', {
            templateUrl: 'partials/TestId',
            controller: 'TestController'
        })
        .when('/testFilter', {
            templateUrl: 'partials/TestFilter',
            controller: 'TestController'
        })
        .when('/testRepeat', {
            templateUrl: 'partials/testRepeat',
            controller: 'TestController'
        })
        .when("/testResource", {
            templateUrl: 'partials/testResource',
            controller: 'TestController'
        })
        .when("/testResource/:resourceIds", {
            controller: "TestController"
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

