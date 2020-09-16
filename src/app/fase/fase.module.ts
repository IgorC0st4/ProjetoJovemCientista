import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FasePageRoutingModule } from './fase-routing.module';

import { FasePage } from './fase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FasePageRoutingModule
  ],
  declarations: [FasePage]
})
export class FasePageModule {}
