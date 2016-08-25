import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: "event-emmiter",
    template: `
        <span>event emmiter</span>
        <button (click)="clicked()">click me</button>
    `    
})
export class EventEmmiterComponent {
    @Output()
    emmiter: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
        
    }
    
    clicked() {
        this.emmiter.emit("hey");
    }
}