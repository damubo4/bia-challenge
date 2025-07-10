import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbboardCountriesComponent } from './dashbboard-countries.component';

describe('DashbboardCountriesComponent', () => {
  let component: DashbboardCountriesComponent;
  let fixture: ComponentFixture<DashbboardCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbboardCountriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbboardCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
