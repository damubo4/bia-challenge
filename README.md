# Bia Challenge

## Descripción
Este proyecto es una aplicación web desarrollada como parte del desafío técnico para Bia Energy. La aplicación es una dashboard interactiva que muestra información de países utilizando Angular como framework principal.

## Características
- Dashboard dinámico de países
- Interfaz moderna y responsive
- Integración de componentes reutilizables
- Estilos modernos con SCSS

## Requisitos Previos
- Node.js (versión recomendada: 18.x o superior)
- Angular CLI
- Git

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/damubo4/bia-challenge.git
```

2. Navega al directorio del proyecto:
```bash
cd bia-challenge
```

3. Instala las dependencias:
```bash
npm install
```

## Ejecución

Para ejecutar la aplicación en modo desarrollo:
```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## Estructura del Proyecto
```
src/
├── app/
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── components/
│   │   ├── dashbboard-countries/
│   │   │   ├── dashbboard-countries.component.html
│   │   │   ├── dashbboard-countries.component.scss
│   │   │   └── dashbboard-countries.component.ts
│   │   ├── detail-country/
│   │   │   ├── detail-country.component.html
│   │   │   ├── detail-country.component.scss
│   │   │   └── detail-country.component.ts
│   │   └── header/
│   │       ├── header.component.html
│   │       ├── header.component.scss
│   │       └── header.component.ts
│   └── services/
│       ├── countries.service.ts
│       ├── countries.service.spec.ts
│       ├── theme-color.service.ts
│       └── theme-color.service.spec.ts
├── styles.scss
└── ...
```

## Tecnologías Utilizadas
- Angular
- TypeScript
- SCSS
- HTML5
- Git

## Licencia
Este proyecto está bajo licencia MIT.
