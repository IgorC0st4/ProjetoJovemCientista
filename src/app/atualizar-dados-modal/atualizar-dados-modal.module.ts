import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtualizarDadosModalPageRoutingModule } from './atualizar-dados-modal-routing.module';

import { AtualizarDadosModalPage } from './atualizar-dados-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AtualizarDadosModalPageRoutingModule
  ],
  declarations: [AtualizarDadosModalPage]
})
export class AtualizarDadosModalPageModule {}
