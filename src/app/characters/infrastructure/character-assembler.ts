import { Character } from '../domain/model/character.entity';
import { CharacterLocation } from '../domain/model/location.entity';
import { CharacterOrigin } from '../domain/model/origin.entity';
import { CharacterResponse, CharacterResourceResponse } from './character-response';

export class CharacterAssembler {
  static toEntitiesFromResponse(response: CharacterResponse): Character[] {
    return response.results.map((resource) => this.toEntity(resource));
  }

  static toEntitiesFromResponses(responses: CharacterResponse[]): Character[] {
    return responses.flatMap((response) => this.toEntitiesFromResponse(response));
  }

  private static toEntity(resource: CharacterResourceResponse): Character {
    const character = new Character();

    character.id = resource.id;
    character.name = resource.name;
    character.status = resource.status;
    character.species = resource.species;
    character.type = resource.type;
    character.gender = resource.gender;
    character.image = resource.image;
    character.url = resource.url;
    character.origin = this.toOrigin(resource.origin);
    character.location = this.toLocation(resource.location);

    return character;
  }

  private static toOrigin(origin: CharacterResourceResponse['origin']): CharacterOrigin {
    const characterOrigin = new CharacterOrigin();
    characterOrigin.name = origin?.name ?? '';
    characterOrigin.url = origin?.url ?? '';
    return characterOrigin;
  }

  private static toLocation(location: CharacterResourceResponse['location']): CharacterLocation {
    const characterLocation = new CharacterLocation();
    characterLocation.name = location?.name ?? '';
    characterLocation.url = location?.url ?? '';
    return characterLocation;
  }
}

