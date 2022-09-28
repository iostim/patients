import FHIR from "fhirclient";

const url = process.env.VUE_APP_FHIR_URL;
const client = FHIR.client(url);

export default client;
