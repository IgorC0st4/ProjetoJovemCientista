import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtualizarDadosModalPage } from './atualizar-dados-modal.page';

describe('AtualizarDadosModalPage', () => {
  let component: AtualizarDadosModalPage;
  let fixture: ComponentFixture<AtualizarDadosModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarDadosModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtualizarDadosModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
