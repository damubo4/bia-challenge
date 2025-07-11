import { Component, inject, signal } from "@angular/core";
import { CountriesService } from "../../services/countries.service";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-detail-country",
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: "./detail-country.component.html",
  styleUrl: "./detail-country.component.scss",
})
export class DetailCountryComponent {
  countryDetailService = inject(CountriesService);
  aRoute = inject(ActivatedRoute);
  country = signal<any>([]);

  ngOnInit(): void {
    this.getDetailCountry();
  }

  getDetailCountry() {
    this.aRoute.params.subscribe((params) => {
      this.countryDetailService
        .getDetailCountry(params["name"])
        .subscribe((country: any) => {
          this.country.set(country);
          this.getFirstOfficialName();
          this.getCurrency();
        });
    });
  }

  getFirstOfficialName(): string | undefined {
    const keys = Object.keys(this.country()[0].name.nativeName);
    if (keys.length > 0) {
      const firstKey = keys[keys.length - 1];
      return this.country()[0].name.nativeName[firstKey].common;
    }
    return undefined;
  }

  getCurrency(): string | undefined {
    const keys = Object.keys(this.country()[0].currencies);
    if (keys.length > 0) {
      const firstKey = keys[keys.length - 1];
      return this.country()[0].currencies[firstKey].name;
    }
    return undefined;
  }
}
