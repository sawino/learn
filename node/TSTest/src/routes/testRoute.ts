/// <reference path="../_all.d.ts"/>

import * as express from "express";

module Route {
    export class TestRoute {
        public helloTS(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.send("Hello TS");
        }
    }
}

export = Route;