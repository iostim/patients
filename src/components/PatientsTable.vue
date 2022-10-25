<template>
  <div>
    <b-pagination :per-page="perPage" v-model="currentPage" :total-rows="totalRows" />
    <b-table
      striped
      hover
      :fields="fields"
      :items="update"
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="edit"
    />
  </div>
</template>

<script>
import { search } from "@/client"
import Patient from "@/model/Patient"

const fields = [
  {
    key: "id",
    label: "ID"
  },
  {
    key: "ppn",
    label: "Passport Number"
  },
  {
    key: "ss",
    label: "Social Security Number"
  },
  {
    key: "familyName",
    label: "Family name"
  },
  {
    key: "givenName",
    label: "Given name"
  },
  {
    key: "gender",
    label: "Gender"
  },
  {
    key: "birthDate",
    label: "Birthdate",
    formatter: value => value?.toLocaleDateString()
  }
]

export default {
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields,
      totalRows: 0
    }
  },
  methods: {
    async update(ctx) {
      try {
        const response = await search(ctx.perPage, ctx.currentPage)
        const total = response.total
        const entries = response.entry.map(e => new Patient(e.resource))
        this.totalRows = total
        return entries
      } catch (error) {
        console.error(error)
        return []
      }
    },
    edit(item) {
      this.$router.push({name: 'edit', params: {id: item.id}})
    }
  }
}
</script>
