/// <reference path="_all.d.ts" />

"use strict";


import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as indexRoute from "./routes/index";
import * as testRoute from "./routes/testRoute";

class Server {

    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "jade");
        this.app.use(express.static(path.join(__dirname, "public")));
    }

    routes() {
        let router: express.Router;
        router = express.Router();

        var index: indexRoute.Index = new indexRoute.Index();
        router.get("/", index.index.bind(index.index));
        var test: testRoute.TestRoute = new testRoute.TestRoute();
        router.get("/test", test.helloTS);
        this.app.use(router);
    }
}

let server = Server.bootstrap();
export default server.app;
