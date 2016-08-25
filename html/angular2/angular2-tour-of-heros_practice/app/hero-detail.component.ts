import {Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {Hero} from './hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from './hero.service';


@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail.component.html' ,
    styleUrls: [
        'app/hero-detail.component.css'
    ]
})
export class HeroDetailComponent implements OnInit, OnDestroy{
        
    @Input() hero: Hero;
    @Output() close = new EventEmitter();

    error: any;
    sub: any;
    navigated = false;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        // console.log('hhh');
        this.sub = this.route.params.subscribe(params => {

            if (params['id'] !== undefined) {
                let val = params['id'];
                console.log(typeof (val));
                console.log(typeof (+val));
                console.log(typeof ((+val).toString()));
                // space is needed
                console.log(1 .toString());
                this.navigated = true;
                let id = +val;
                this.heroService.getHero(id).then(hero => this.hero = hero);

            } else {
                this.navigated = false;
                this.hero = new Hero();
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    // goBack() {
    //     window.history.back();
    // }

    save() {
        this.heroService.save(this.hero)
                        .then(hero => {
                            // saved hero
                            this.hero = hero;
                            this.goBack(hero);
                        })
                        .catch(error => this.error = error);
    }

    goBack(savedHero: Hero = null ) {
        this.close.emit(savedHero);
        if (this.navigated) {
            window.history.back();
        }
    }
}