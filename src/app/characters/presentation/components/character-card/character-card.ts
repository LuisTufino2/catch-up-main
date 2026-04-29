import { Component, inject, input } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Character } from '../../../domain/model/character.entity';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatCardImage,
    MatButton,
    MatIcon,
    TranslatePipe,
  ],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCard {
  private readonly snackBar = inject(MatSnackBar);
  private readonly translateService = inject(TranslateService);

  readonly character = input.required<Character>();

  async shareCharacter(): Promise<void> {
    const character = this.character();
    const shareData = {
      title: character.name,
      text: `${character.name} • ${character.species}`,
      url: character.url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        this.openSnackBar('characters.share.success');
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(character.url);
        this.openSnackBar('characters.share.copied');
        return;
      }

      this.openSnackBar('characters.share.unavailable');
    } catch {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(character.url);
          this.openSnackBar('characters.share.copied');
          return;
        } catch {
          // Fall through to the generic error message.
        }
      }

      this.openSnackBar('characters.share.failed');
    }
  }

  private openSnackBar(messageKey: string): void {
    this.snackBar.open(
      this.translateService.instant(messageKey),
      this.translateService.instant('shared.close'),
      { duration: 3000 },
    );
  }
}

