import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditosModalPage } from './creditos-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreditosModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditosModalPageRoutingModule {}
