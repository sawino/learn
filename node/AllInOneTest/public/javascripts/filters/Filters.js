/**
 * Created by yangsaw on 11/14/2015.
 */
angular.module('testFilters', []).filter('testFilter', function() {
    return function(input) {
        return input + "FILTER";
    }
});