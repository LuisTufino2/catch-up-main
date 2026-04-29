import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { CharacterStore } from '../../../../characters/application/character.store';
import { CharacterList } from '../../../../characters/presentation/components/character-list/character-list';
import { Footer } from '../footer/footer';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbar, MatProgressSpinner, TranslatePipe, LanguageSwitcher, Footer, CharacterList],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  private readonly store = inject(CharacterStore);

  protected readonly characters = this.store.characters;
  protected readonly loading = this.store.loading;
  protected readonly error = this.store.error;

  ngOnInit(): void {
    this.store.loadCharacters();
  }
}
