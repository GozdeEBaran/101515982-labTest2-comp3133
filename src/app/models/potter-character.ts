/** Wand object returned by the HP API */
export interface PotterWand {
  wood: string;
  core: string;
  length: number | string | null;
}

/** Character document from https://hp-api.onrender.com/ */
export interface PotterCharacter {
  id: string;
  name: string;
  species: string;
  house: string;
  wizard: boolean;
  ancestry: string;
  wand: PotterWand;
  actor: string;
  image: string;
  gender?: string;
  alive?: boolean;
}
