<template>
  <div>
    <h1>Index patients</h1>
    <patients-table/>
  </div>
</template>

<script>
import PatientsTable from '@/components/PatientsTable'

export default {
  components: {
    PatientsTable
  }
}
</script>
