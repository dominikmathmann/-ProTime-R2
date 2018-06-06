import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'timeToHours'
})
export class TimeToHoursPipe implements PipeTransform {
  transform(value: string, args: any[]): any {
    const seconds = Math.floor((+value / 1000) % 60);
    const numminutes = Math.floor((+value / (1000 * 60)) % 60);
    const numhours = Math.floor(+value / (1000 * 60 * 60));
    return (numhours < 10 ? '0' + numhours : numhours) + ':' + (numminutes < 10 ? '0' + numminutes : numminutes);
  }
}
