import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resultado-modal',
  templateUrl: './resultado-modal.page.html',
  styleUrls: ['./resultado-modal.page.scss'],
})
export class ResultadoModalPage implements OnInit {

  @Input() tempos :any[];

  constructor() { 
  }

  ngOnInit() {
  }

  teste(){
    console.error(this.tempos);
  }
}
