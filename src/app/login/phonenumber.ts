export class Phonenumber {
  country: string;
  number: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.number;
    return `+${num}`;
  }
}
