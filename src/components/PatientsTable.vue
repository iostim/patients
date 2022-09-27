<template>
  <b-table striped hover :fields="fields" :items="items">
    <template #cell(familyName)="data">
      {{ data.item.name[0] && data.item.name[0].family }}
    </template>
    <template #cell(givenName)="data">
      {{ data.item.name[0] && data.item.name[0].given.join(" ") }}
    </template>
  </b-table>
</template>

<script>
import FHIR from "fhirclient";

export default {
  data() {
    return {
      fields: [
        { key: "id", label: "ID" },
        { key: "familyName", label: "Family name" },
        { key: "givenName", label: "Given name" }
      ],
      items: []
    }
  },
  async created() {
    // FIXME: Move URL to some config
    // FIXME: Move client to some module
    const protocol = window.location.protocol;
    const host = window.location.host;
    const path = '/fhir';
    const url = `${protocol}//${host}${path}`;
    const client = FHIR.client(url);
    const res = await client.request("Patient", { pageLimit: 3, flat: true });
    this.items = res;
  }
}
</script>
