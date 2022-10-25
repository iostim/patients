export default class Patient {
  obj;

  constructor(obj) {
    this.obj = obj;
  }

  get id() {
    return this.obj.id
  }

  set id(value) {
    this.obj.id = value;
  }

  #findIdentifier(code) {
    const idObj = this.obj.identifier.find(id => id?.type?.coding[0]?.code == code);
    if (idObj) return idObj
  }

  get ppn() {
    return this.#findIdentifier("PPN")?.value;
  }

  set ppn(value) {
    let idObj = this.#findIdentifier("PPN");
    if (!idObj) {
      idObj = { type: { coding: [ { code: "PPN" } ] } };
      this.obj.identifier.push(idObj);
    }
    idObj.value = value;
  }

  get ss() {
    return this.#findIdentifier("SS")?.value;
  }

  set ss(value) {
    let idObj = this.#findIdentifier("SS");
    if (!idObj) {
      idObj = { type: { coding: [ { code: "SS" } ] } };
      this.obj.identifier.push(idObj);
    }
    idObj.value = value;
  }

  get familyName() {
    return this.obj.name[0]?.family;
  }

  set familyName(value) {
    let name = this.obj.name[0];
    if (!name) {
      this.obj.name = name = {};
    }
    name.family = value;
  }

  get givenName() {
    return this.obj.name[0]?.given && this.obj.name[0].given.join(" ");
  }

  set givenName(value) {
    let name = this.obj.name[0];
    if (!name) {
      this.obj.name = name = {}
    }
    let given = name.given;
    if (!given) {
      name.given = given = [];
    }
    given[0] = value;
  }

  get gender() {
    return this.obj.gender;
  }

  set gender(value) {
    this.obj.gender = value;
  }

  get birthDate() {
    return new Date(this.obj.birthDate + "T00:00:00Z");
  }

  set birthDate(value) {
    this.obj.birthDate = value.toISOString().substring(0,10);
  }
}
