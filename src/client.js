import FHIR from "fhirclient";

const url = process.env.VUE_APP_FHIR_URL;
if (typeof url === "undefined") {
    throw "Constant VUE_APP_FHIR_URL is undefined.";
}

const client = FHIR.client(url);

export const search = (perPage, currentPage, sort = "_id") => {
    const query = new URLSearchParams();

    if (perPage > 0) {
      query.set("_count", perPage);
    }

    if (currentPage > 1) {
      query.set("_getpagesoffset", perPage * (currentPage - 1));
    }

    if (sort) {
      query.set("_sort", sort);
    }

    return client.request("Patient?" + query);
};

export const read = async (id) => {
    return client.request(`Patient/${id}`);
};

export const update = async (obj) => {
    return client.update(obj);
};

export default client;
