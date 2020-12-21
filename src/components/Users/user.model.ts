export default class User {
  id: number;
  telephoneNumber: string;
  fullName: string;
  dateBirth: string;
  isTithe: boolean;
  street: string;
  houseNumber: string;
  neighborhood: string;
  city: string;
  generalRecord: string;
  individualRecord: string;
  role: string;
  celebration_allowed_count: number;

  constructor(
    telephoneNumber: string,
    fullName: string,
    dateBirth: string,
    isTithe: boolean,
    street: string,
    houseNumber: string,
    neighborhood: string,
    city: string,
    generalRecord: string,
    individualRecord: string,
    role: string,
    celebration_allowed_count: number,
  ) {
    this.telephoneNumber = telephoneNumber;
    this.fullName = fullName;
    this.dateBirth = dateBirth;
    this.isTithe = isTithe;
    this.street = street;
    this.houseNumber = houseNumber;
    this.neighborhood = neighborhood;
    this.city = city;
    this.generalRecord = generalRecord;
    this.individualRecord = individualRecord;
    this.role = role;
    this.celebration_allowed_count = celebration_allowed_count;
  }
}
