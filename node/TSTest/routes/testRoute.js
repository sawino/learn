"use strict";
var Route;
(function (Route) {
    class TestRoute {
        helloTS(req, res, next) {
            res.send("Hello TS");
        }
    }
    Route.TestRoute = TestRoute;
})(Route || (Route = {}));
module.exports = Route;
