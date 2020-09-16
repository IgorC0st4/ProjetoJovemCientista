import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FasePage } from './fase.page';

const routes: Routes = [
  {
    path: '',
    component: FasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FasePageRoutingModule {}
