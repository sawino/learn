/**
 * Created by yangsaw on 11/14/2015.
 */
angular.module('TestServices', ['ngResource'])
    .factory('TestResource', ['$resource', function($resource) {
        return $resource('http://localhost:3000/serverResource', {}, {
            query: {method: 'GET', params: {}, isArray: true}
        });
    }]);