import { provideRouter, RouterConfig } from '@angular/router';
import { TemplateGrammarComponent } from './TemplateGrammar.component';
import { HeroFormComponent } from './hero-form.component';
import { ClickMeComponent } from './click-me.component';


const routes : RouterConfig = [
    {path: 'templateGrammar', component: TemplateGrammarComponent},
    {path: 'form', component: HeroFormComponent},
    {path: 'click-me', component: ClickMeComponent}
];

export const appRouterProviders = [
    provideRouter(routes)
];