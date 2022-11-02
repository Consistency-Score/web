// type direction = "long" | "short";

export interface ITrade {
  marketName: string;
  units: number;
  direction: string;
  unixtime: number;
}
