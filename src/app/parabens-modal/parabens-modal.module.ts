import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParabensModalPageRoutingModule } from './parabens-modal-routing.module';

import { ParabensModalPage } from './parabens-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParabensModalPageRoutingModule
  ],
  declarations: [ParabensModalPage]
})
export class ParabensModalPageModule {}
