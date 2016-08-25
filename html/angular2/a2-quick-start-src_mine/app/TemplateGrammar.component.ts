import { Component } from '@angular/core';
import { EventEmmiterComponent } from './event.component';

@Component({
    selector: 'template-grammar',
    styles: [`
        .red-font {
            color: red
        }

        .redFont {
            color: red
        }
    `],
    directives: [EventEmmiterComponent],
    template: `
        <h1>Template Grammar</h1>
        <P>template expression {{getString() + " value"}}</P>
        <p>property binding</p>
        <input type="checkbox" #disableCheck name="disable" (click)="checkChanged($event)">Disable
        <input type="text" [disabled]="disableChecked">
        <input type="text" bind-disabled="disableChecked">
        <br/>
        <p>event binding</p>
        <input type="text" (change)="textChanged($event)">
        <input type="text" on-change="textChanged($event)"><span>{{textValue}}</span>
        <event-emmiter (emmiter)="emmited($event)"></event-emmiter>
        <br/>
        <p>bi-directional binding</p>
        <input type="text" [(ngModel)]="bitext">
        <input type="text" [value]="bitext" (input)="bitext=$event.target.value">
        <input type="text" [ngModel]="bitext" (ngModelChange)="bitext=$event.target.value">
        <input type="text" bindon-ngModel="bitext"> <span>{{bitext}}</span>
        <p>attribute binding</p>
        <table border=1>
            <tr><td [attr.colspan]="1 + 1">one-two</td></tr>
            <tr>
                <td>three</td>
                <td>four</td>
            </tr>
        </table>  
        <button [attr.aria-label]="hello">Aria label</button>  
        <p>class binding</p>
        <label [class.red-font]="true">class binding conditional</label>
        <label [class]="true">class binding replace</label>   
        <label [ngClass]="getClasses()">class binding ngClass</label> 
        <p>style binding</p>
        <button [style.color]="red">style binding part</button>
        <button [style.font-size.em]="2">style binding unit em</button>
        <button [style.font-size.%]="120">style binding unit %</button>
        <button [ngStyle]="getStyles">style binding with ngStyle</button>
        <p>ngIf, add/remove elem, display | hidden hides elem</p>
        <div [class.hidden]="true">a</div>
        <div [style.display]="none">b</div>
        <div [style.display]="block">b</div>
        <div *ngIf="false">d</div>
        <p>ngSwitch</p>
        <span [ngSwitch]="switchValue">
            <span *ngSwitchCase="'A'">Eenie</span>
            <span *ngSwitchCase="'B'">Meanie</span>
            <span *ngSwitchCase="'C'">Miney</span>
            <span *ngSwitchCase="'D'">Moe</span>
            <span *ngSwitchDefault>other</span>
        </span>
    `
})
export class TemplateGrammarComponent {
    textValue: string;
    bitext: string;
    disableChecked: boolean;
    switchValue: string = "B";

    getString() {
        return "interpolate";
    }

    textChanged(event : any) {
        this.textValue = event.target.value;
    }

    checkChanged(event: any) {
        this.disableChecked = event.target.checked;
    }

    emmited(event: any) {
        this.textValue = event;
    }

    getClasses() {
        return {
            active: true,
            // cannot use red-font
            redFont: true
        }
    }

    getStyles() {
        return {
            'font-weight': 'bold',
            'font-style': 'italic'
        }
    }
}