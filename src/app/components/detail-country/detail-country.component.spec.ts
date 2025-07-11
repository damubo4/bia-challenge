import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { DetailCountryComponent } from "./detail-country.component";
import { CountriesService } from "../../services/countries.service";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { HttpClient } from "@angular/common/http";

const mockCountryDetail = [
  {
    name: {
      common: 'Colombia',
      nativeName: {
        spa: { official: 'República de Colombia', common: 'Colombia' }
      }
    },
    currencies: {
      COP: { name: 'Colombian peso', symbol: '$' }
    },
    flags: {
      png: 'colombia.png',
      alt: 'The flag of Colombia is composed of three horizontal bands of yellow, blue and red.'
    },
    population: 50882884,
    region: 'Americas',
    subregion: 'South America',
    capital: ['Bogotá'],
    tld: ['.co'],
    languages: {
      spa: 'Spanish'
    },
    borders: ['BRA', 'ECU', 'PAN', 'PER', 'VEN']
  }
];

class MockCountriesService {
  getDetailCountry(name: string) {
    return of(mockCountryDetail);
  }
}

class MockActivatedRoute {
  params = of({ name: "Colombia" });
}

describe("DetailCountryComponent", () => {
  let component: DetailCountryComponent;
  let fixture: ComponentFixture<DetailCountryComponent>;
  let countriesService: CountriesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DetailCountryComponent,
        CommonModule,
        MatButtonModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: CountriesService, useClass: MockCountriesService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: HttpClient, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailCountryComponent);
    component = fixture.componentInstance;
    countriesService = TestBed.inject(CountriesService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should fetch country details on init", () => {
    spyOn(countriesService, "getDetailCountry").and.callThrough();
    component.ngOnInit();
    expect(countriesService.getDetailCountry).toHaveBeenCalledWith("Colombia");
    expect(component.country()).toEqual(mockCountryDetail);
  });

  it("should get the first official native name", () => {
    component.country.set(mockCountryDetail);
    const nativeName = component.getFirstOfficialName();
    expect(nativeName).toBe("Colombia");
  });

  it("should get the currency name", () => {
    component.country.set(mockCountryDetail);
    const currency = component.getCurrency();
    expect(currency).toBe("Colombian peso");
  });

  it("should handle country with no native name", () => {
    const countryWithoutNativeName = [
      { name: { common: "Test" }, currencies: {}, flags: { png: 'test.png', alt: '' } },
    ];
    (countryWithoutNativeName[0].name as any)["nativeName"] = {};
    component.country.set(countryWithoutNativeName);
    const nativeName = component.getFirstOfficialName();
    expect(nativeName).toBeUndefined();
  });

  it("should handle country with no currency", () => {
    const countryWithoutCurrency = [
      { name: { common: "Test", nativeName: {} }, currencies: {}, flags: { png: 'test.png', alt: '' } },
    ];
    component.country.set(countryWithoutCurrency);
    const currency = component.getCurrency();
    expect(currency).toBeUndefined();
  });
});
