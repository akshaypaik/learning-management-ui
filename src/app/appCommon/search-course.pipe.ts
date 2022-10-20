import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCourse'
})
export class SearchCoursePipe implements PipeTransform {

  transform(array: any, find: any): any {

    if(!array)return [];
    if(!find)return array;

    find = find.toLowerCase();
    return search(array, find);

  }
}

function search(entries: any[], search: string){

  return entries.filter(function (obj) {
    const keys: string[] = Object.keys(obj);
    return keys.some(function (key) {
      const value = obj[key];
      if(Array.isArray(value)){
        return value.some(v => {
          return v.toLowerCase().includes(search);
        })
      }
      else if(!Array.isArray(value)){
        if(value != null){
          return value.toString().toLowerCase().includes(search);
        }
      }
    })
  });
    
}
