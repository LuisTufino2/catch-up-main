import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Character } from '../../../domain/model/character.entity';
import { CharacterCard } from '../character-card/character-card';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CharacterCard, TranslatePipe],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css',
})
export class CharacterList {
  readonly characters = input.required<Character[]>();
}

