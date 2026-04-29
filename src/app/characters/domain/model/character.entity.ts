import { CharacterLocation } from './location.entity';
import { CharacterOrigin } from './origin.entity';

export class Character {
  id = 0;
  name = '';
  status = '';
  species = '';
  type = '';
  gender = '';
  image = '';
  url = '';
  origin = new CharacterOrigin();
  location = new CharacterLocation();
}

