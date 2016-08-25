"use strict";
const express = require("express");
const path = require("path");
const indexRoute = require("./routes/index");
const testRoute = require("./routes/testRoute");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    static bootstrap() {
        return new Server();
    }
    config() {
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "jade");
        this.app.use(express.static(path.join(__dirname, "public")));
    }
    routes() {
        let router;
        router = express.Router();
        var index = new indexRoute.Index();
        router.get("/", index.index.bind(index.index));
        var test = new testRoute.TestRoute();
        router.get("/test", test.helloTS);
        this.app.use(router);
    }
}
let server = Server.bootstrap();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = server.app;
