import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CountriesService {
  private apiUrl =
    "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags";
  private apiDetailUrl = "https://restcountries.com/v3.1/name";
  http = inject(HttpClient);

  getAllCountries() {
    return this.http.get(this.apiUrl);
  }

  getDetailCountry(name: string) {
    return this.http.get(`${this.apiDetailUrl}/${name}`);
  }
}
