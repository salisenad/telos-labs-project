export class Country {
  iso2: string;
  name: string;

  constructor(obj = {}) {
    this.iso2 = obj['iso2'] ? obj['iso2'] : '';
    this.name = obj['name'] ? obj['name'] : '';
  }
}
