<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-button size="mini"
                 type="success"
                 @click="add">
        add tab
      </el-button>
    </div>
    <el-tabs v-model="editableTabsValue"
             type="card"
             :closable="true"
             @edit="handleTabsEdit">
      <el-tab-pane :key="item.id"
                   v-for="item in tablist"
                   :label="item.id"
                   :name="item.id">
        <FormMain :tab="item"
                  @close="close(item.id)"></FormMain>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import _ from "lodash";
  import FormMain from './components/FormMain.vue';
  import { FormModel } from "./models/Index.ts";

  export default {
    components: {
      FormMain,
    },
    data() {
      return {
        tablist: [],
        editableTabsValue: '2',
        tabIndex: 0,
      }
    },
    created() {

    },
    methods: {
      add() {
        const id = (this.tabIndex++).toString();

        let item = null;

        if (this.tablist.length > 0) {
          // 复制最后一个 cloneDeep
          const row = this.tablist[this.tablist.length - 1];
          item = _.cloneDeep(row.item);
        } else {
          // 新建一个
          item = new FormModel();
        }

        const tabinfo = { id, item: item };
        this.tablist.push(tabinfo);
        this.editableTabsValue = id;
      },
      close(targetName) {
        const isCur = targetName === this.editableTabsValue;
        this.tablist = this.tablist.filter(t => t.id !== targetName);

        if (isCur && this.tablist.length > 0) {
          const i = this.tablist.length - 1;
          const item = this.tablist[i];
          this.editableTabsValue = item.id;
        }
      },
      handleTabsEdit(targetName, action) {
        if (action === 'remove') {
          this.close(targetName);
        }
      }
    }
  }
</script>

<style>
</style>
