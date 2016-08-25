import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';

import {HeroSearchService} from './hero-search.service';
import {Hero} from './hero';

@Component({
    selector: 'hero-search',
    templateUrl: 'app/hero-search.component.html',
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
    heroes: Observable<Hero[]>;
    searchSubject = new Subject<string>();

    constructor(
        private heroSearchService: HeroSearchService,
        private router: Router) {}

    // push a search term into the observable stream.
    search(term: string) {
        this.searchSubject.next(term);
    }

    ngOnInit() {
        this.heroes = this.searchSubject.asObservable()
                                        .debounceTime(300) // a filter. wait for 300ms pause in events. continues when nothing's changed in 300ms
                                        .distinctUntilChanged() // a filter. ignore if next search term is same as previous
                                        .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([])) // pass the filtered value to calls
                                                            // , there may be multiple function calls, but switchMap returns value of the last call 
                                        .catch(error => {
                                            console.log(error);
                                            return Observable.of<Hero[]>([]);
                                        });
    }

    gotoDetail(hero: Hero) {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }   
    
}