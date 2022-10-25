<template>
  <div>
    <div v-if="saving">Saving</div>
    <div v-if="loading">Loading</div>
    <div v-else>
      <b-form @submit.stop.prevent="submit">
        <b-form-group label="Passport" label-cols="2">
          <b-form-input v-model="patient.ppn"/>
        </b-form-group>

        <b-form-group label="SS" label-cols="2">
          <b-form-input v-model="patient.ss"/>
        </b-form-group>

        <b-form-group label="Family name" label-cols="2">
          <b-form-input v-model="patient.familyName"/>
        </b-form-group>

        <b-form-group label="Given name" label-cols="2">
          <b-form-input v-model="patient.givenName"/>
        </b-form-group>

        <b-form-group label="Birthdate" label-cols="2">
          <b-form-datepicker :value="patient.birthDate" @input="patient.birthDate = new Date($event + 'T00:00:00Z')"/>
        </b-form-group>

        <b-form-group label-cols="2">
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
import { read, update } from "@/client"
import Patient from "@/model/Patient"

export default {
  props: ['id'],
  data() {
    return {
      loading: true,
      saving: false,
      patient: null
    }
  },
  async created() {
    this.load()
  },
  methods: {
    async load() {
      const resource = await read(this.id)
      this.loading = false
      this.patient = new Patient(resource)
    },
    async submit() {
      const resource = this.patient.obj
      this.saving = true
      await update(resource)
      this.saving = false
      this.load()
    }
  }
}
</script>
