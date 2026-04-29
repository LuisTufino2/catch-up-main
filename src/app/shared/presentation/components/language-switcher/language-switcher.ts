import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';

const supportedLanguages = ['en', 'es'] as const;

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [MatButtonToggleGroup, MatButtonToggle, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  readonly languages = supportedLanguages;
  currentLang: typeof supportedLanguages[number];

  constructor(private readonly translate: TranslateService) {
    const browserLang = this.translate.getBrowserLang()?.toLowerCase();
    const initialLang: typeof supportedLanguages[number] = browserLang === 'es' ? 'es' : 'en';

    this.translate.setDefaultLang('en');
    this.currentLang = this.translate.currentLang === 'es' ? 'es' : initialLang;
    this.translate.use(this.currentLang);
  }

  useLanguage(language: string): void {
    if (language === 'en' || language === 'es') {
      this.currentLang = language;
      this.translate.use(language);
    }
  }
}
