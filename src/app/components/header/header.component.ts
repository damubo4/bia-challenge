import { Component, inject } from "@angular/core";
import { ThemeColorService } from "../../services/theme-color.service";

@Component({
  selector: "app-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  themeColorService = inject(ThemeColorService);
}
