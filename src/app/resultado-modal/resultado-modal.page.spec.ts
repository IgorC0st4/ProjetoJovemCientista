import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultadoModalPage } from './resultado-modal.page';

describe('ResultadoModalPage', () => {
  let component: ResultadoModalPage;
  let fixture: ComponentFixture<ResultadoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
