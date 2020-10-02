import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstrucoesModalPage } from './instrucoes-modal.page';

describe('InstrucoesModalPage', () => {
  let component: InstrucoesModalPage;
  let fixture: ComponentFixture<InstrucoesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrucoesModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstrucoesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
