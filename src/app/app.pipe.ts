import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',pure: false
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                //console.log(el.toString().toLowerCase().indexOf(input));
                return el.toString().toLowerCase().indexOf(input) > -1;
            })
        }
        return value;
    }
   
}