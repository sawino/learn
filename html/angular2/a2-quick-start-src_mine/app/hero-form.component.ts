import {Component, Inject, Optional} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Hero} from './hero';
import {Logger} from './logger.service';
import {APP_CONFIG, AppConfig} from './Opaque.service';

@Component({
    selector: 'hero-form',
    templateUrl: 'app/hero-form.component.html',
})
export class HeroFormComponent {

    constructor(
        @Optional()
        private logger: Logger,
        @Inject(APP_CONFIG)
        private config: AppConfig) {
            console.log(config.title);
    }

    powers = ['p1', 'p2', 'p3'];

    model = new Hero(18, 'SY', this.powers[1], 'alter');

    ngModelClass = '';

    submitted = false;

    active = true;

    onSubmit() {
        this.submitted = true;
        this.logger.log('submitted');
    }

    get diagnostic() {
        return JSON.stringify(this.model);
    }

    newHero() {
        this.model = new Hero(42, '', '');
        this.active = false;
        setTimeout(() => {
            this.active = true;
        }, 100);
    }
}