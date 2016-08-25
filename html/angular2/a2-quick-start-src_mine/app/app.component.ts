import { Component } from '@angular/core';
import { ClickMeComponent } from './click-me.component';
import { HeroFormComponent } from './hero-form.component';
import {Logger, BetterLogger} from './logger.service';
import { Printer } from './printer.service';
import {APP_CONFIG, HERO_DI_CONFIG} from './Opaque.service';
import {ROUTER_DIRECTIVES} from '@angular/router';

let slientLogger = {
    log: () => {}
}

class Arg {
    isOK: boolean = true;
}

// service factory
// let heroServiceFactory = (logger: Logger, userService: UserService) => {
//   return new HeroService(logger, userService.user.isAuthorized);
// };
// export let heroServiceProvider =
//   { provide: HeroService,
//     useFactory: heroServiceFactory,
//     deps: [Logger, UserService]
//   };


// import {OpaqueToken} from '@angular/core';
// let APP_CONFIG = new OpaqueToken('app.config');
// // then 
// {
//     provide: APP_CONFIG,
//     useValue, HERO_DI_CONFIG
// }






@Component({
    selector: 'my-app',
    directives: [ClickMeComponent, HeroFormComponent, ROUTER_DIRECTIVES],
    // service with dependency 
    // providers: [Logger, Printer],
    // another provider
    // providers: [{
    //     provide: Logger,
    //     useClass: BetterLogger
    // }, Printer],
    // alias service: old logger replaced by new one
    // providers: [Logger, {
    //     provide: OldLogger,
    //     useExisting: Logger
    // }],
    // value service
    providers: [
    {
        provide: Logger, useValue: slientLogger
    }, 
    {
        provide: APP_CONFIG, useValue: HERO_DI_CONFIG
    }],
    template: `
        <nav>
            <a routerLink="/click-me" routerLinkActive="active">Input Output</a>
            <a routerLink="/form" routerLinkActive="active">Form</a>
            <a routerLink="/templateGrammar" routerLinkActive="active">Template Grammar</a>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class AppComponent { 


}
