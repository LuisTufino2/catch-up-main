export interface CharacterResponse {
  info: CharacterInfoResponse;
  results: CharacterResourceResponse[];
}

export interface CharacterInfoResponse {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterResourceResponse {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterReferenceResponse;
  location: CharacterReferenceResponse;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterReferenceResponse {
  name: string;
  url: string;
}

