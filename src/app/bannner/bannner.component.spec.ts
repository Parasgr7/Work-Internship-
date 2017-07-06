import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannnerComponent } from './bannner.component';

describe('BannnerComponent', () => {
  let component: BannnerComponent;
  let fixture: ComponentFixture<BannnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
