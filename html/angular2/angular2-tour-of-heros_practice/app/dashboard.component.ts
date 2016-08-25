import {Component, OnInit} from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {Router} from '@angular/router';
import {HeroSearchComponent} from './hero-search.component';

@Component({
    selector: 'my-dashbaord',
    templateUrl: 'app/dashboard.component.html',
    directives: [HeroSearchComponent],
    styleUrls: [
        'app/dashboard.component.css'
    ]
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    constructor(private heroService: HeroService,
        private router: Router) {

    }

    ngOnInit() {
        this.heroService.getHeroes().then(heroes => {
            this.heroes = heroes.slice(1, 5);
        });
    }

    gotoDetail(hero) {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}