import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SobreModalPage } from './sobre-modal.page';

describe('SobreModalPage', () => {
  let component: SobreModalPage;
  let fixture: ComponentFixture<SobreModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobreModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SobreModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
