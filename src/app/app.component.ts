import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IPerson } from './interfaces/person';
import { PersonService } from './services/person.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  persons:IPerson[] = [];
  personFound:boolean|undefined = undefined;

  constructor(private personService: PersonService) {}

  find(searchForm:NgForm) {
    if (!searchForm.value.name.length) {
      searchForm.form.controls['name'].markAsTouched();
      return
    }

    this.personService.getData()
      .subscribe((data:IPerson[]) => {
        let persons:IPerson[] = this.personService.find(data, searchForm.value.name);

        if (persons.length) {
          this.persons = this.personService.validatePersonData(persons);
          this.personFound = true;
          return;
        }
        this.persons = [];
        this.personFound = false;
      });
  }
}
