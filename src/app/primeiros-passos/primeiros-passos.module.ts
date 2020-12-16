import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrimeirosPassosPageRoutingModule } from './primeiros-passos-routing.module';

import { PrimeirosPassosPage } from './primeiros-passos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimeirosPassosPageRoutingModule
  ],
  declarations: [PrimeirosPassosPage]
})
export class PrimeirosPassosPageModule {}
