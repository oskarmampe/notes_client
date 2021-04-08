<template>
  <el-row>
    <el-col>
      <div>
        <div>
          <div>{{folder.name}}</div>
        </div>
      </div>
    </el-col>
    <el-col v-if="!isTeam(folder) && subRoute==='folder'">
      <FolderDetail :folder="folder"></FolderDetail>
    </el-col>
  </el-row>
</template>
<script>
import { GetFolder } from '../constants/query.gql'
import FolderDetail from './FolderDetail.vue'
export default {
  components: {
    FolderDetail
  },
  beforeRouteUpdate (to, from, next) {
    this.subRoute = to.name
    next()
  },
  data() {
    return {
      subRoute: 'folder',
      folderName: '',
      folder: {
        shareWith: []
      },
    }
  },
  apollo: {
    getFolder: {
      query: GetFolder,
      variables() {
        return {id: this.$route.params.id}
      },
      result ({data: { getFolder }}) {
        this.folder = getFolder
        this.folderName = this.folder.name
        if (this.isTeam) {
          document.title = `${this.folder.name}`          
        }
      },
    }
  },
  methods: {
    isTeam(folder) {
      return !folder.parent && folder.shareWith.length === 0
    }
  }
}
</script>
