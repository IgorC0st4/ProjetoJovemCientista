import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstrucoesModalPage } from './instrucoes-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InstrucoesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrucoesModalPageRoutingModule {}
