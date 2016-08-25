import {Component} from '@angular/core';

@Component({
    selector: 'click-me',
    template: `
        <button (click)="onClickMe()">Click Me</button>
        {{clickMessage}}
        <br/><br/>
        <!--dom event-->
        <input (keyup)="onKey($event)" placeholder='dom $event'>
        {{values}}    
        <!--#box, the referenced the dom elem, a key event has to be existed. '0' does nothing but match the rule-->    
        <input #box (keyup)="0" placeholder="template reference var">
        {{box.value}}
        <input #box2
            (blur)="filterValue=box2.value" 
            (keyup.enter)="filterValue=box2.value" placeholder="press enter, change focus">
        {{filterValue}}
    `
}) 
export class ClickMeComponent {
    clickMessage = '';
    values = '';
    filterValue = '';
    onClickMe() {
        this.clickMessage = 'clicked';
    }

    onKey(event: any) {
        this.values = event.target.value;
    }    
}