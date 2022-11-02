class Trade {
  trader: string;
  longOrShort: string;
  units: number;
  marketName: string;

  constructor(
    _trader: string,
    _longOrShort: string,
    _units: number,
    _marketName: string
  ) {
    this.trader = _trader;
    this.longOrShort = _longOrShort;
    this.units = _units;
    this.marketName = _marketName;
  }

  // just returns a string that summarises everything
  format() {
    return `${this.trader} went ${this.longOrShort} ${this.units} in ${this.marketName}`;
  }
}

const trade1 = new Trade("Chris", "long", 40, "Kintro Inc");

console.log("logging out hte instance of the class:")
console.log(trade1.format)

export default Trade;
