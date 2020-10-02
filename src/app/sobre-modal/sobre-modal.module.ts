import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SobreModalPageRoutingModule } from './sobre-modal-routing.module';

import { SobreModalPage } from './sobre-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SobreModalPageRoutingModule
  ],
  declarations: [SobreModalPage]
})
export class SobreModalPageModule {}
