# Rick and Morty Explorer

## Overview
Rick and Morty Explorer is an Angular application that showcases characters from the public [Rick and Morty API](https://rickandmortyapi.com/). It follows a layered DDD-inspired structure, uses Angular Signals for state, Angular Material for the UI, and ngx-translate for internationalization.

## Features
- Top toolbar with the app logo, title, and EN/ES language selector.
- Character gallery with 3 cards per row on desktop.
- Character cards with image, name, species, status, gender, origin, and location.
- View details in a new browser tab.
- Share character using the Web Share API or clipboard fallback.
- General footer with copyright and developer attribution.

## Technologies
- Angular 21
- TypeScript
- Angular Material
- Angular HttpClient
- Angular Signals
- ngx-translate

## Project Structure
- `src/app/characters`: domain, infrastructure, application, and presentation layers for the character feature.
- `src/app/shared`: reusable UI shell components such as layout, language switcher, and footer.
- `public/i18n`: translation dictionaries for English and Spanish.

## Run locally

```bash
npm install
npm run start
```

Open `http://localhost:4200/` in your browser.

## Build

```bash
npm run build
```

## Tests

```bash
npm run test
```

## Notes
- Replace the placeholder developer data in `src/environments/environment.ts` and `src/environments/environment.development.ts` with your real code, name, and surname if required by your instructor.
