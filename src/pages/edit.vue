<template>
  <div>
    <h1>Edit patient</h1>
    <patient-form :id="id"/>
  </div>
</template>

<script>
import PatientForm from '@/components/PatientForm'

export default {
  props: ['id'],
  components: {
    PatientForm
  }
}
</script>
