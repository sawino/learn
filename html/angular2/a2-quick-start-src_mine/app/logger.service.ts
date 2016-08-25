import {Injectable} from '@angular/core';
import {Printer} from './printer.service';

@Injectable()
export class Logger {
    constructor(private printer: Printer) {
        this.printer.print('logger created');
    }

    log(str: string) {
        this.printer.print(str);
    }
}

@Injectable()
export class BetterLogger extends Logger {
    constructor(private tempPrinter: Printer) {
        super(tempPrinter);
    }

    log(str: string) {
        let prefix = "another logger: ";
        super.log(`${prefix}${str}`);
    }
}