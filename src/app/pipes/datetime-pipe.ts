import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'localdatetime',
    pure: false
})
export class DateTimePipe implements PipeTransform {
    transform(datetime: string, showOnly: 'date' | 'time' | 'both' = 'both'): string {
        let customDateTime: string = '';
        if (datetime) {
            switch (showOnly) {
                case 'date':
                    customDateTime = new Date(datetime).toLocaleDateString();
                    break;
                case 'time':
                    customDateTime = new Date(datetime).toLocaleTimeString();
                    break;
                case 'both':
                    customDateTime = `${new Date(datetime).toLocaleDateString()} ${new Date(datetime).toLocaleTimeString()}`;
                    break;
            }
        }
        return customDateTime;
    }
}
