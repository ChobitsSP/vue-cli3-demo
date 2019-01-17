import CsvExport from '../utils/CsvExport'

export default {
  data() {
    return {
      tableData: [],
      checklist: [],
      q: '',
      pager: {
        page_no: 1,
        page_size: 10,
      },
      sort_name: null,
      is_desc: false,
      total: 0
    }
  },
  methods: {
    refresh() {

    },
    handleSelectionChange(list: any[]) {
      this.checklist = list
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    handleCurrentChange(val: number) {
      this.pager.page_no = val
      this.refresh()
    },
    handleSizeChange(val: number) {
      this.pager.page_size = val
      this.refresh()
    },
    sortChange(obj: { prop: string, order: string }) {
      this.sort_name = obj.prop
      this.is_desc = obj.order === 'descending'
      this.refresh()
    },
    toggleRowSelection(row) {
      const i = this.checklist.indexOf(row)
      this.$refs.table.toggleRowSelection(row, i === -1)
    },
    exportCsv(filename: string = 'file1') {
      const columns = this.$refs.table.$children.filter(t => t.prop != null)
      CsvExport(this.tableData, columns, filename)
    }
  },
  computed: {
    filterItems() {
      return this.filterBy(this.tableData, this.q)
    },
    items() {
      const items = this.filterItems
      return items
    },
    OldPager() {
      return {
        page_no: this.pager.page_no,
        page_size: this.pager.page_size,
        sort_name: this.sort_name,
        is_desc: this.is_desc,
        total_result: this.total
      };
    }
  }
}