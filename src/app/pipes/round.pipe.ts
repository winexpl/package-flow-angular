import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number): string {
    if(value > 1_000_000) {
      return `${Math.round(value/1_000_000)}M`;
    } else if(value > 1000) {
      return `${Math.round(value/1000)}K`;
    }
    return value.toString();
  }

}
