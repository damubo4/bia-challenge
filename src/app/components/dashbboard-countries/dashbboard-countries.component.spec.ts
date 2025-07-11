import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { DashbboardCountriesComponent } from "./dashbboard-countries.component";
import { CountriesService } from "../../services/countries.service";

const mockCountries = [
  {
    name: { common: "Colombia" },
    region: "Americas",
    flags: { png: "colombia.png", svg: "colombia.svg" },
    population: 50000000,
    capital: ["Bogotá"],
  },
  {
    name: { common: "Argentina" },
    region: "Americas",
    flags: { png: "argentina.png", svg: "argentina.svg" },
    population: 45000000,
    capital: ["Buenos Aires"],
  },
  {
    name: { common: "Spain" },
    region: "Europe",
    flags: { png: "spain.png", svg: "spain.svg" },
    population: 47000000,
    capital: ["Madrid"],
  },
];

class MockCountriesService {
  getAllCountries() {
    return of(mockCountries);
  }
}

describe("DashbboardCountriesComponent", () => {
  let component: DashbboardCountriesComponent;
  let fixture: ComponentFixture<DashbboardCountriesComponent>;
  let countriesService: CountriesService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashbboardCountriesComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: CountriesService, useClass: MockCountriesService },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy("navigate") },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashbboardCountriesComponent);
    component = fixture.componentInstance;
    countriesService = TestBed.inject(CountriesService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should fetch and set countries on init", () => {
    spyOn(countriesService, "getAllCountries").and.callThrough();
    component.ngOnInit();
    expect(countriesService.getAllCountries).toHaveBeenCalled();
    expect(component.countries().length).toBe(3);
    expect(component.countriesFiltered().length).toBe(3);
    expect(component.countriesFiltered()[0].name.common).toBe("Colombia");
  });

  it("should filter countries by name when form value changes", fakeAsync(() => {
    component.ngOnInit();
    const nameInput = component.formFilters.get("name");
    nameInput?.setValue("col");
    tick(500);
    fixture.detectChanges();
    expect(component.countriesFiltered().length).toBe(1);
    expect(component.countriesFiltered()[0].name.common).toBe("Colombia");
  }));

  it("should filter countries by region", () => {
    component.countries.set(mockCountries);
    component.filterCountriesByRegion("Europe");
    expect(component.countriesFiltered().length).toBe(1);
    expect(component.countriesFiltered()[0].name.common).toBe("Spain");
  });

  it("should navigate to country detail", () => {
    const countryName = "Colombia";
    component.countryDetail(countryName);
    expect(router.navigate).toHaveBeenCalledWith(["country", countryName]);
  });

  it("should handle empty result when filtering by name", () => {
    component.countries.set(mockCountries);
    component.filterCountries("NonExistentCountry");
    expect(component.countriesFiltered().length).toBe(0);
  });

  it("should handle empty result when filtering by region", () => {
    component.countries.set(mockCountries);
    component.filterCountriesByRegion("Asia");
    expect(component.countriesFiltered().length).toBe(0);
  });
});
