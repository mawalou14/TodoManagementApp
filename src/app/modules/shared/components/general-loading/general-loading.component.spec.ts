import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLoadingComponent } from './general-loading.component';

describe('GeneralLoadingComponent', () => {
  let component: GeneralLoadingComponent;
  let fixture: ComponentFixture<GeneralLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralLoadingComponent]
    });
    fixture = TestBed.createComponent(GeneralLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
