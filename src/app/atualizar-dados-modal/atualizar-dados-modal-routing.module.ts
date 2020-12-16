import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtualizarDadosModalPage } from './atualizar-dados-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AtualizarDadosModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtualizarDadosModalPageRoutingModule {}
