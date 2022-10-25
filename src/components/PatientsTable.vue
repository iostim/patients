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
import client from "@/client"

const parseDate = s => {
  if (!s) return s
  return new Date(Date.parse(s + "T00:00:00"))
}

const makeIdFormatter = code => (_, __, item) => {
  const obj = item.identifier.find(id => id?.type?.coding[0]?.code == code)
  if (obj) return obj.value
}

const fields = [
  {
    key: "id",
    label: "ID"
  },
  {
    key: "ppn",
    label: "Passport Number",
    formatter: makeIdFormatter("PPN")
  },
  {
    key: "ss",
    label: "Social Security Number",
    formatter: makeIdFormatter("SS")
  },
  {
    key: "familyName",
    label: "Family name",
    formatter: (_, __, item) => item.name[0] && item.name[0].family
  },
  {
    key: "givenName",
    label: "Given name",
    formatter: (_, __, item) => item.name[0] && item.name[0].given.join(" ")
  },
  {
    key: "gender",
    label: "Gender",
    formatter: value => value
  },
  {
    key: "birthDate",
    label: "Birthdate",
    formatter: value => parseDate(value).toLocaleDateString()
  }
]

const fetch = (perPage, currentPage) => {
  const query = new URLSearchParams()

  if (perPage > 0) {
    query.set("_count", perPage)
  }

  if (currentPage > 1) {
    query.set("_getpagesoffset", perPage * (currentPage - 1))
  }

  return client.request("Patient?" + query)
}

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
        const response = await fetch(ctx.perPage, ctx.currentPage)
        this.totalRows = response.total
        return response.entry.map(e => e.resource)
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
