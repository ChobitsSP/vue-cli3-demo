<template>
  <div>
    form main

    <el-form :model="item">
      <el-form-item label="name"
                    prop="name">
        <el-input v-model="item.name"></el-input>
      </el-form-item>

      <el-form-item label="clist"
                    prop="clist">
        <el-button size="mini"
                   type="success"
                   @click="add">add</el-button>

        <el-row v-for="(citem, i) in item.clist"
                :key="i">
          <FormChild :item="citem"></FormChild>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import FormChild from "./FormChild.vue";

  import { ModelItem, GetAllFrom } from "../models/Index.ts";

  import { FormValidate } from "@/mixins/FormMixins.ts";


  export default {
    components: {
      FormChild
    },
    provide() {
      return {
        item: this.item
      }
    },
    props: {
      tab: Object
    },
    data() {
      return {
        item: null
      }
    },
    created() {
      this.item = this.tab.item;
      this.init();
    },
    methods: {
      init() {

      },
      add() {
        this.item.clist.push(new ModelItem());
      },
      async ValidAllForm() {
        let isErr = false;

        const list = GetAllFrom(this);

        for (let i = 0; i < list.length; i++) {
          const form = list[i];

          try {
            await FormValidate(form);
          }
          catch {
            isErr = true;
          }
        }

        return isErr;
      },
      async submit() {
        const isErr = await this.ValidAllForm();
        if (isErr) return;
        this.$message.success("success");
      }
    }
  }
</script>

<style>
</style>