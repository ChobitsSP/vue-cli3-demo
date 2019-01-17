<template>
  <div>
    <el-row>
      <TableFilter :model="filter">
        <el-button type="primary"
                   :loading="loading"
                   @click="refresh">查询</el-button>
        <el-button type="success"
                   :loading="loading"
                   @click="exportCsv('文件名1')">导出</el-button>
      </TableFilter>
    </el-row>
    <el-row>
      <el-col :offset="18"
              :span="6">
        <el-input v-model="q"
                  placeholder="搜索">
          <el-button slot="prepend"
                     :loading="loading"
                     @click="refresh">刷新</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-table ref="table"
                v-loading="loading"
                @selection-change="handleSelectionChange"
                @row-click="toggleRowSelection"
                @sort-change="sortChange"
                :data="items"
                border
                style="width: 100%">
        <el-table-column type="selection"
                         width="55"></el-table-column>
        <el-table-column prop="date"
                         label="日期"
                         :formatter="CellFormat.NewTimeFmt"
                         sortable="custom">
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名"
                         :formatter="CellFormat.name_fmt"
                         sortable="custom">
        </el-table-column>
        <el-table-column prop="address"
                         label="地址"
                         sortable="custom">
        </el-table-column>
        <el-table-column label="操作"
                         width="80">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="info"
                       @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     layout="total, sizes, prev, pager, next, jumper"
                     :current-page.sync="pager.page_no"
                     :page-sizes="[10, 25, 50, 100]"
                     :page-size="pager.page_size"
                     :total="total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import TableClient from '@/mixins/TableClient.ts'
  import { Filter, CellFormat } from './models/Index.ts'
  import TableFilter from './components/TableFilter.vue'

  export default {
    mixins: [TableClient],
    components: {
      TableFilter,
    },
    data() {
      return {
        loading: false,
        filter: new Filter(),
        CellFormat,
      }
    },
    created() {
      this.sort_name = 'CreateTime'
      this.is_desc = true
      this.refresh()
    },
    methods: {
      async refresh() {
        this.loading = true

        try {
          this.tableData = await this.filter.List()
        } catch (err) {
          this.$message.error(err.message)
        }
        finally {
          this.loading = false
        }
      }
    }
  }
</script>
