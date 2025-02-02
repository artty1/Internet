import { Person } from "../models/common";

export class FilterCommonData {

  public listPerson_Committee(datasource: Array<Person>): Array<Person> {
    return datasource.filter(item => item.PERSON_TYPE == 'C');
  }
  public listPerson_Attorney(datasource: Array<Person>): Array<Person> {
    return datasource.filter(item => item.PERSON_TYPE == 'A');
  }
  public listPerson_Trader(datasource: Array<Person>): Array<Person> {
    return datasource.filter(item => item.PERSON_TYPE == 'T');
  }
  public listPerson_Other(datasource: Array<Person>): Array<Person> {
    return datasource.filter(item => item.PERSON_TYPE == 'O');
  }

}
