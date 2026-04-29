import { computed, inject, Injectable, signal } from '@angular/core';
import { Character } from '../domain/model/character.entity';
import { CharacterApi } from '../infrastructure/character-api';

@Injectable({ providedIn: 'root' })
export class CharacterStore {
  private readonly characterApi = inject(CharacterApi);
  private readonly charactersSignal = signal<Character[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly loadedSignal = signal(false);

  readonly characters = computed(() => this.charactersSignal());
  readonly loading = computed(() => this.loadingSignal());
  readonly error = computed(() => this.errorSignal());
  readonly hasCharacters = computed(() => this.charactersSignal().length > 0);

  loadCharacters(force = false): void {
    if (this.loadingSignal() || (this.loadedSignal() && !force)) {
      return;
    }

    if (force) {
      this.loadedSignal.set(false);
      this.charactersSignal.set([]);
    }

    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.characterApi.getAllCharacters().subscribe({
      next: (characters) => {
        this.charactersSignal.set(characters);
        this.loadedSignal.set(true);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('characters.error.load-failed');
        this.loadedSignal.set(false);
        this.loadingSignal.set(false);
      },
    });
  }
}

