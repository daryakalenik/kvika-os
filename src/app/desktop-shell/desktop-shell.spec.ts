import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopShell } from './desktop-shell';

describe('DesktopShell', () => {
  let component: DesktopShell;
  let fixture: ComponentFixture<DesktopShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopShell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
