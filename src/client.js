import FHIR from "fhirclient"

const url = process.env.VUE_APP_FHIR_URL
if (typeof url === "undefined") {
    throw "Constant VUE_APP_FHIR_URL is undefined."
} 

export default FHIR.client(url)
