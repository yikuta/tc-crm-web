<template>
  <div class="selected-people">
    <template v-if="cmpSearchBox === 2">
      <el-input @focus="_queryUserAndDepartmentList" type="text" size="mini" v-model="selected.name" :placeholder="`请选择${cmpName}`"></el-input>
    </template>
    <template v-if="cmpSearchBox === 1">
      <span>{{selected.name}}</span>
      <el-button class="selectedBtn" type="text" @click="_queryUserAndDepartmentList">+选择{{ cmpName }}</el-button>
    </template>
    <el-dialog
      v-if="dialogVisible"
      :title="`选择${cmpName}`"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      append-to-body
      width="30%">
      <el-autocomplete
        v-model="select"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        value-key="name"
        value="id"
        @select="handleSelectChange"
      ></el-autocomplete>
      <el-tabs>
        <el-tab-pane :label="`按${cmpName}姓名查看`">
          <div class="tabItem">
            <el-radio-group v-model="radio" @change="handleRadioChange">
              <el-radio class="radioItem" v-for="(item, index) in options" :key="index" :label="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="按组织架构查看">
          <div class="tabItem">
            <el-tree
              :data="treeData"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick">
            </el-tree>
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { queryUserAndDepartmentList } from '@/api/resource/detail'
export default {
  name: 'selectedPeople',
  model: {
    prop: 'selected',
    event: 'on-selected'
  },
  props: {
    selected: {
      type: Object,
      default: () => {}
    },
    cmpSearchBox: { // 默认：1 输入框：2
      type: Number,
      default: 1
    },
    cmpName: {
      type: String,
      default: '员工'
    }
  },
  data() {
    return {
      dialogVisible: false,
      options: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      departmentVoList: [],
      timeout: null,
      select: '',
      radio: ''
    }
  },
  created() {
    // this._queryUserAndDepartmentList()
  },
  methods: {
    querySearchAsync(queryString, cb) {
      var options = this.options
      var results = queryString ? options.filter(this.createStateFilter(queryString)) : options
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return (select) => {
        if (select.phone) {
          if (select.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0) {
            return (select.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
          } else if (select.phone.toLowerCase().indexOf(queryString.toLowerCase()) === 0) {
            return (select.phone.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
          }
        } else {
          if (select.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0) {
            return (select.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
          }
        }
      }
    },
    handleSelectChange(val) {
      // let selected = ''
      // this.options.map((item) => {
      //   if (item.id === val) {
      //     selected = item
      //   }
      // })
      this.$emit('on-selected', val)
      this.dialogVisible = false
    },
    handleRadioChange(val) {
      let selected = ''
      this.options.map((item) => {
        if (item.id === val) {
          selected = item
        }
      })
      this.$emit('on-selected', selected)
      this.dialogVisible = false
    },
    handleNodeClick(val) {
      if (val.departmentId) {
        this.$emit('on-selected', val)
        this.dialogVisible = false
      }
    },
    deal(data) {
      let departmentVoList = []
      data.map((item) => {
        if (item.childrenList) {
          this.deal(item.childrenList)
          item.userVoList ? departmentVoList = item.childrenList.concat(item.userVoList) : departmentVoList = item.childrenList.concat([])
        } else {
          departmentVoList = item.userVoList ? item.userVoList : []
        }
        item.children = departmentVoList
      })
    },
    _queryUserAndDepartmentList() {
      return queryUserAndDepartmentList().then((res) => {
        if (res.code === 200) {
          this.options = res.result.simpleUserVoList
          this.departmentVoList = res.result.departmentVoList
          this.deal(this.departmentVoList)
          this.treeData = this.departmentVoList
          this.dialogVisible = true
        }
      })
    }
  }
}
</script>
<style lang="scss">
.selected-people .selectedBtn {
  display: inline-block;
  margin-left: 8px;
}
.tabItem {
  height: 330px;
  overflow: auto;
}
.radioItem {
  display: block;
  margin: 8px 0;
}
</style>
