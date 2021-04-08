<template>
  <div>
  </div>
</template>
<script>
export default {
  props: ['folder'],
  mounted() {
    document.title = `${this.folder.name}`
  },
}
</script>
