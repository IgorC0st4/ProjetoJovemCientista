import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditosModalPageRoutingModule } from './creditos-modal-routing.module';

import { CreditosModalPage } from './creditos-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditosModalPageRoutingModule
  ],
  declarations: [CreditosModalPage]
})
export class CreditosModalPageModule {}
