import { Routes } from "@angular/router";
import { DashbboardCountriesComponent } from "./components/dashbboard-countries/dashbboard-countries.component";
import { DetailCountryComponent } from "./components/detail-country/detail-country.component";

export const routes: Routes = [
  { path: "", component: DashbboardCountriesComponent },
  { path: "all-countries", component: DashbboardCountriesComponent },
  { path: "country/:id", component: DetailCountryComponent },
  { path: "**", redirectTo: "all-countries" },
];
