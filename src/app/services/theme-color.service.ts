import { Injectable, signal, computed } from "@angular/core";
import { DOCUMENT } from "@angular/common"; 
import { inject } from "@angular/core"; 

@Injectable({
  providedIn: "root",
})
export class ThemeColorService {
  private readonly STORAGE_KEY = "themePreference"; // Clave para localStorage
  private document = inject(DOCUMENT); // Inyectamos el objeto document

  // Signal para el estado actual del tema (true = dark, false = light)
  // Inicializamos leyendo del localStorage o usando la preferencia del sistema
  private _isDarkTheme = signal<boolean>(this.getInitialThemePreference());

  // Signal computada para exponer el estado del tema
  public isDarkTheme = computed(() => this._isDarkTheme());

  constructor() {
    // Al iniciar el servicio, aplicamos el tema inicial al body
    this.applyThemeToBody(this._isDarkTheme());
  }

  // Obtiene la preferencia inicial del localStorage o del sistema
  private getInitialThemePreference(): boolean {
    const storedPreference = localStorage.getItem(this.STORAGE_KEY);
    if (storedPreference !== null) {
      return storedPreference === "dark";
    }
    // Si no hay preferencia guardada, usa la preferencia del sistema operativo
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  // Aplica o remueve la clase 'dark-theme' del body
  private applyThemeToBody(isDark: boolean): void {
    if (isDark) {
      this.document.body.classList.add("dark-theme");
      localStorage.setItem(this.STORAGE_KEY, "dark");
    } else {
      this.document.body.classList.remove("dark-theme");
      localStorage.setItem(this.STORAGE_KEY, "light");
    }
  }

  // Alterna el tema entre claro y oscuro
  toggleTheme(): void {
    this._isDarkTheme.update((currentValue) => {
      const newTheme = !currentValue;
      this.applyThemeToBody(newTheme);
      return newTheme;
    });
  }
}
