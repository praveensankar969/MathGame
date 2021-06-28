import { EventEmitter } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Output() close =  new EventEmitter();
  constructor(private elemntRef : ElementRef) { }

  ngOnInit(): void {
    document.body.appendChild(this.elemntRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.elemntRef.nativeElement.remove(); 
  }
  OnClick(){
    this.close.emit();
  }

}
