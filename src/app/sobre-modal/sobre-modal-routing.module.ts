import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SobreModalPage } from './sobre-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SobreModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SobreModalPageRoutingModule {}
