import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimeirosPassosPage } from './primeiros-passos.page';

const routes: Routes = [
  {
    path: '',
    component: PrimeirosPassosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimeirosPassosPageRoutingModule {}
