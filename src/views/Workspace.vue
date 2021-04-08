<template>
  <div>

    <div>
      <aside>
        <div v-if="getTeam.id"
            @click.left.stop="$router.push({name: 'folder', params: {id: getTeam.id}})">
          <div v-bind:class="{active: $route.params.id === getTeam.id}">
            <div></div>
            <span>{{ getTeam.name }}</span>
          </div>
        </div>

      </aside>

      <div>
        <router-view :key="$route.fullPath"></router-view>
      </div>

    </div>

  </div>

</template>

<script>
import { GetTeam } from '../constants/query.gql'

export default {
  data() {
    return {
      getTeam: {},
    }
  },
  apollo: {
    getTeam: {
      query: GetTeam,
    },
  },
}
</script>
