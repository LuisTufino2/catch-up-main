import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, of, switchMap, forkJoin } from 'rxjs';
import { Character } from '../domain/model/character.entity';
import { CharacterAssembler } from './character-assembler';
import { CharacterResponse } from './character-response';

@Injectable({ providedIn: 'root' })
export class CharacterApi {
  private readonly baseUrl = environment.rickAndMortyApiBaseUrl;
  private readonly charactersEndpointPath = environment.rickAndMortyCharactersEndpointPath;
  private readonly http = inject(HttpClient);

  getCharacters(page = 1): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.baseUrl}${this.charactersEndpointPath}`, {
      params: { page },
    });
  }

  getAllCharacters(): Observable<Character[]> {
    return this.getCharacters(1).pipe(
      switchMap((firstPage) => {
        if ((firstPage.info?.pages ?? 1) <= 1) {
          return of(CharacterAssembler.toEntitiesFromResponse(firstPage));
        }

        const additionalRequests = Array.from(
          { length: firstPage.info.pages - 1 },
          (_, index) => this.getCharacters(index + 2),
        );

        return forkJoin(additionalRequests).pipe(
          map((responses) => CharacterAssembler.toEntitiesFromResponses([firstPage, ...responses])),
        );
      }),
    );
  }
}

