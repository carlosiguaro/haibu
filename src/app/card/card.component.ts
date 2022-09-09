import { Component, OnInit, Input } from '@angular/core';
import { IPerson } from '../interfaces/person'; 
import PersonFormat from '../format/person.format';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() person: IPerson = PersonFormat;
  
  constructor() { }

  ngOnInit(): void {}

}
