import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';

import { IPerson } from './../interfaces/person';

@Injectable()
export class PersonService {

  constructor(private http: HttpClient) { }

  getData():Observable<IPerson[]> {
    return this.http.get<IPerson[]>('https://my-json-server.typicode.com/HaibuSolutions/prueba-tecnica-sf/user');
  }

  find(persons:IPerson[], searchedName:string):IPerson[] {
    let persnosFound:IPerson[] = new Array();

    persons.forEach((person:IPerson) => {

      let personName:string = person.nombre.toLowerCase();
      searchedName = searchedName.toLocaleLowerCase();

      if (searchedName.split(' ').length  == 1) {
        if (personName.split(' ').find(name => name.toLowerCase() === searchedName)) 
          persnosFound.push(person);
        return;
      }

      let position:number = personName.search(searchedName);
      if (position == -1) return;

      let lastPosition:number = position + searchedName.length;
      let lastPositionValue:string = personName.substring(lastPosition, lastPosition+1);

      let match1:boolean = (position == 0 && 
        /\s/.test(lastPositionValue)) || 
        lastPositionValue.length == 0;

      let match2:boolean = position > 0 && 
        (/\s/.test(personName.substring(position-1, position)) &&
        (/\s/.test(lastPositionValue) ||
        lastPositionValue.length > 0));

      if (match1 || match2) 
        persnosFound.push(person);
    });

    return persnosFound;
  }
  
  validatePersonData(persons:IPerson[]): IPerson[] {
    return persons.map(person => {
      let validRut:boolean = false;
      let validFechaNacimiento:boolean = false;
      let rut:string = person.rut;

      if (/^[0-9]+[-]{1}[0-9kK]{1}$/.test(rut)) {
        let tmp = rut.split('-');
        let pre = tmp[0];
        let post = tmp[1] == 'K' ? 'k' : tmp[1];
        validRut = this.validateRut(pre) == post
      }

      validFechaNacimiento = this.validateDateBirth(person.fechaNacimiento.split('/').reverse().join('-'));
      
      person.validFechaNacimiento = validFechaNacimiento;
      person.validRut = validRut;

      return person;
    });
  }

  validateRut(T:any):number|string {
    let M:number = 0;
    let S:number = 1;
    for(;T;T=Math.floor(T/10))
      S=(S+T%10*(9-M++%6))%11;
    return S ? S-1 : 'k';
  }

  validateDateBirth(date:string):boolean {
    let completeDate = new Date(date);
    return completeDate instanceof Date && !isNaN(Number(new Date(date)));
  }
}
