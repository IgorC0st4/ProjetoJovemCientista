import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstrucoesModalPageRoutingModule } from './instrucoes-modal-routing.module';

import { InstrucoesModalPage } from './instrucoes-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstrucoesModalPageRoutingModule
  ],
  declarations: [InstrucoesModalPage]
})
export class InstrucoesModalPageModule {}
