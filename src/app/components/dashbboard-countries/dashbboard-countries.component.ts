import { Component, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CountriesService } from "../../services/countries.service";
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: "app-dashbboard-countries",
  imports: [CommonModule, ReactiveFormsModule, MatSlideToggleModule, MatInputModule, MatSelectModule, MatMenuModule],
  templateUrl: "./dashbboard-countries.component.html",
  styleUrl: "./dashbboard-countries.component.scss",
})
export class DashbboardCountriesComponent {
  countriesService = inject(CountriesService);
  countries = signal<any[]>([]);
  countriesFiltered = signal<any[]>([]);
  formFilters: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formFilters = this.fb.group({
      name: ["", Validators.required],
      region: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllCountries();

    this.formFilters.get("name")?.valueChanges.subscribe((name) => {
      this.filterCountries(name);
    });

    this.formFilters.get("region")?.valueChanges.subscribe((region) => {
      this.filterCountriesByRegion(region);
    });

    // this.countriesService.getDetailCountry("argentina").subscribe((country) => {
    //   console.log(country);
    // });
  }

  getAllCountries() {
    this.countriesService.getAllCountries().subscribe((countries: any) => {
      this.countries.set(countries);
      this.countriesFiltered.set(countries);
    });
  }

  filterCountries(name: string) {
    this.countriesFiltered.set(
      this.countries().filter((country) =>
        country.name.common.toLowerCase().includes(name.toLowerCase())
      )
    );
  }

  filterCountriesByRegion(region: string) {
    this.countriesFiltered.set(
      this.countries().filter((country) => country.region === region)
    );
  }
}
