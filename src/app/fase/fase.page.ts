import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fase',
  templateUrl: './fase.page.html',
  styleUrls: ['./fase.page.scss'],
})
export class FasePage implements OnInit {

  contador_fase:number = 1;
  dados_linhas = [
    {
      "data": [1, 2, 3, 4, 5]
    },
    {
      "data": [1, 2, 3, 4, 5]
    },
    {
      "data": [1, 2, 3, 4, 5]
    },
    {
      "data": [1, 2, 3, 4, 5]
    },
    {
      "data": [1, 2, 3, 4, 5]
    },
  ];

  classe_css = 'fundo-verde';
  constructor() { }

  ngOnInit() {
  }

}
