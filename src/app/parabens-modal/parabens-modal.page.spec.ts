import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParabensModalPage } from './parabens-modal.page';

describe('ParabensModalPage', () => {
  let component: ParabensModalPage;
  let fixture: ComponentFixture<ParabensModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParabensModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParabensModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
