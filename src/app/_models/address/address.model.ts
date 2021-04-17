export class Address {
  id: number;
  street1: string;
  street2: string;
  town: string;
  country: string;
  contactId: string;


  constructor(obj = {}) {
    this.id = obj['id'] ? obj['id'] : 0;
    this.street1 = obj['street1'] ? obj['street1'] : '';
    this.street2 = obj['street2'] ? obj['street2'] : '';
    this.town = obj['town'] ? obj['town'] : '';
    this.country = obj['country'] ? obj['country'] : '';
    this.contactId = obj['contactId'] ? obj['contactId'] : '';
  }

}
