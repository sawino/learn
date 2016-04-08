/**
 * Created by yangsaw on 11/16/2015.
 */
angular.module('ToDoService', ['ngResource'])
    .factory('ToDos', ['$resource', '$httpParamSerializerJQLike', function($resource, $httpParamSerializerJQLike) {
        return $resource('http://localhost:3000/api/todos/:title',
            {
                // default value
                // title: @title
            },

            {
                // use param way
//                update: {
//                    method: "PUT",
//                    params: {title: '@title', note: '@note'},
//                    data: {title: "@title", note: "@note"}
//                },
                // use body
                update: {
//                    url: "http://localhost:3000/api/todos/:title",
                    method: "PUT",
                    data: {title: "@title", note: "@note"},
                    transformRequest: function(data) {
                        return $httpParamSerializerJQLike(data);
                    }
                },


                save: {
                    url: "http://localhost:3000/api/todos",
                    method: "POST",
                    data: {title: "@title", note: "@note"},
//                    params: {title: '777', note: '@note'},
                    transformRequest: function(data) {
                    return $httpParamSerializerJQLike(data);
                }


            }
            });
    }]);