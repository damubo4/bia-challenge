import { Component, inject } from "@angular/core";
import { CountriesService } from "../../services/countries.service";

@Component({
  selector: "app-dashbboard-countries",
  imports: [],
  templateUrl: "./dashbboard-countries.component.html",
  styleUrl: "./dashbboard-countries.component.scss",
})
export class DashbboardCountriesComponent {
  countriesService = inject(CountriesService);

  ngOnInit(): void {
    this.countriesService.getAllCountries().subscribe((countries) => {
      console.log(countries);
    });

    this.countriesService.getDetailCountry("argentina").subscribe((country) => {
      console.log(country);
    });
  }
}
