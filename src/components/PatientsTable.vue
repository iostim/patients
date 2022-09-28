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
import client from "@/client";

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
    this.items = await client.request("Patient", { pageLimit: 3, flat: true });
  }
}
</script>
