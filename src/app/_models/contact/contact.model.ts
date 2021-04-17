export class Contact {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;

  constructor(obj = {}) {
    this.id = obj['id'] ? obj['id'] : 0;
    this.first_name = obj['first_name'] ? obj['first_name'] : '';
    this.last_name = obj['last_name'] ? obj['last_name'] : '';
    this.avatar = obj['avatar'] ? obj['avatar'] : '';
  }
}
