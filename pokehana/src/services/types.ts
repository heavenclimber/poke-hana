export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface WeaknessOrResistance {
  type: string;
  value: string;
}

export interface SetImages {
  symbol: string;
  logo: string;
}

export interface SetInfo {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Record<string, string>;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImages;
}

export interface PriceDetail {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number | null;
}

export interface Prices {
  holofoil?: PriceDetail;
  reverseHolofoil?: PriceDetail;
  normal?: PriceDetail;
  reverseHolo?: PriceDetail;
}

export interface PriceInfo {
  url: string;
  updatedAt: string;
  prices: Prices;
}

export interface Images {
  small: string;
  large: string;
}

export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes?: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  attacks?: Attack[];
  weaknesses?: WeaknessOrResistance[];
  resistances?: WeaknessOrResistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: SetInfo;
  number: string;
  artist?: string;
  rarity?: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: Record<string, string>;
  images: Images;
  tcgplayer?: PriceInfo;
  cardmarket?: PriceInfo;
}

export interface PokemonApiResponse {
  count: number;
  data: PokemonCard[];
}
