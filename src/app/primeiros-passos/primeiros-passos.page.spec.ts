import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrimeirosPassosPage } from './primeiros-passos.page';

describe('PrimeirosPassosPage', () => {
  let component: PrimeirosPassosPage;
  let fixture: ComponentFixture<PrimeirosPassosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeirosPassosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrimeirosPassosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
