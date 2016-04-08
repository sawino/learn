/**
 * Created by yangsaw on 11/14/2015.
 */
//var app = angular.module('app', ['$httpProvider', 'ngRoute', 'testFilters', 'TestServices', 'ToDoService', function($httpProvider) {
//    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//}]);

var app = angular.module('app', ['ngRoute', 'testFilters', 'TestServices', 'ToDoService', function($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}]);