import {Injectable} from '@angular/core';

@Injectable()
export class Printer {
    print(str: string) {
        console.log(str);
    }
}