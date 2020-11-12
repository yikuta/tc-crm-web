<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="客户字段" name="CUSTOMER">
        <el-row class="padding-top-sm padding-bottom-sm border-bottom-main">
          <el-col :span="24" class="text-left text-convention text-df">预设字段</el-col>
        </el-row>
        <el-table :data="tableData['CUSTOMER'].system" size="mini">
          <el-table-column label="字段名称" prop="fieldName"></el-table-column>
          <el-table-column label="API Name" prop="apiName"></el-table-column>
          <el-table-column label="创建时间" prop="createTime"></el-table-column>
          <el-table-column label="创建人" prop="creatorName"></el-table-column>
          <el-table-column label="字段类型">
            <template slot-scope="scope">{{ scope.row.fieldType | fieldType }}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.enable ? 'success' : 'info'" size="mini">{{ scope.row.enable ? '启用' : '停用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="{ row }">
              <el-button v-if="row.apiName !== 'CUSTOMER_NAME'" @click="handleEdit(row)" type="primary" size="mini">编辑</el-button>
              <el-button  v-if="row.apiName !== 'CUSTOMER_NAME' && row.apiName !== 'CUSTOMER_TYPE'" @click="handleStop(row)" :type="row.enable ? 'danger' : 'success'" size="mini">{{ row.enable ? '停用' : '启用' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="padding-top padding-bottom-sm border-bottom-main">
          <el-col :span="12" class="text-left text-convention text-df">自定义字段</el-col>
          <el-col :span="12" class="text-right">
            <el-button type="primary" size="mini" @click="handleEdit(false)">新建</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData['CUSTOMER'].user" size="mini">
          <el-table-column label="字段名称" prop="fieldName"></el-table-column>
          <el-table-column label="API Name" prop="apiName"></el-table-column>
          <el-table-column label="创建时间" prop="createTime"></el-table-column>
          <el-table-column label="创建人" prop="creatorName"></el-table-column>
          <el-table-column label="字段类型">
            <template slot-scope="scope">{{ scope.row.fieldType | fieldType }}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.enable ? 'success' : 'info'" size="mini">{{ scope.row.enable ? '启用' : '停用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
              <el-button @click="handleStop(scope.row)" :type="scope.row.enable ? 'danger' : 'success'" size="mini">{{ scope.row.enable ? '停用' : '启用' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="跟进记录字段" name="FOLLOW">
        <el-row class="padding-top padding-bottom-sm border-bottom-main">
          <el-col :span="24" class="text-left text-convention text-df">预设字段</el-col>
        </el-row>
        <el-table :data="tableData['FOLLOW'].system" size="mini">
          <el-table-column label="字段名称" prop="fieldName"></el-table-column>
          <el-table-column label="API Name" prop="apiName"></el-table-column>
          <el-table-column label="创建时间" prop="createTime"></el-table-column>
          <el-table-column label="创建人" prop="creatorName"></el-table-column>
          <el-table-column label="字段类型">
            <template slot-scope="scope">{{ scope.row.fieldType | fieldType }}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.enable ? 'success' : 'info'" size="mini">{{ scope.row.enable ? '启用' : '停用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="{ row }">
              <el-button @click="handleEdit(row)" type="primary" size="mini">编辑</el-button>
              <el-button @click="handleStop(row)" :type="row.enable ? 'danger' : 'success'" size="mini" v-if="row.apiName !== 'RECORD_CONTENT'">{{ row.enable ? '停用' : '启用' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="padding-top padding-bottom-sm border-bottom-main">
          <el-col :span="12" class="text-left text-convention text-df">自定义字段</el-col>
          <el-col :span="12" class="text-right">
            <el-button type="primary" size="mini" @click="handleEdit(false)">新建</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData['FOLLOW'].user" size="mini">
          <el-table-column label="字段名称" prop="fieldName"></el-table-column>
          <el-table-column label="API Name" prop="apiName"></el-table-column>
          <el-table-column label="创建时间" prop="createTime"></el-table-column>
          <el-table-column label="创建人" prop="creatorName"></el-table-column>
          <el-table-column label="字段类型">
            <template slot-scope="scope">{{ scope.row.fieldType | fieldType }}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.enable ? 'success' : 'info'" size="mini">{{ scope.row.enable ? '启用' : '停用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
              <el-button @click="handleStop(scope.row)" :type="scope.row.enable ? 'danger' : 'success'" size="mini">{{ scope.row.enable ? '停用' : '启用' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <form-dialog :visible.sync="visible" :form="formInfo" @change="editFinish" :tab="activeName"></form-dialog>
  </div>
</template>

<script>
  import FormDialog from './templates/form.vue'
  import { ObjectTypeByKey } from '@/utils/filters'
  import { getObjectList, updateOpenObjectStatus } from '@/api/system/object'
  export default {
    name: 'DictionaryListIndex',
    components: {
      FormDialog
    },
    data() {
      return {
        tableData: {
          CUSTOMER: {
            system: [], // 系统字段
            user: [] // 用户添加字段
          },
          FOLLOW: {
            system: [], // 系统字段
            user: [] // 用户添加字段
          }
        },
        activeName: 'CUSTOMER',
        formInfo: null,
        visible: false
      }
    },
    filters: {
      fieldType(value) {
        try {
          return ObjectTypeByKey[value].name
        } catch (e) {
          return ''
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getObjectList(this.activeName).then(res => {
          if (res.code === 200 && res.result.length) {
            // 处理数据，如果数据信息中有创建者的 id，则表明不是系统创建的，反之则是系统创建的
            res.result.forEach(item => {
              if (item.creatorId !== -1) {
                this.tableData[this.activeName].user.push(item)
              } else {
                this.tableData[this.activeName].system.push(item)
              }
            })
          }
        })
      },
      handleTabClick(tab, event) {
        // 切换 tab
        this.activeName = tab.name
        if (!this.tableData[this.activeName].user.length || !this.tableData[this.activeName].system.length) {
          // 判断当前列表是否有数据并修正数据
          this.tableData[this.activeName] = {
            user: [],
            system: []
          }
          this.getList()
        }
      },
      handleEdit(row) {
        // 进入编辑状态
        this.formInfo = row || null
        this.visible = true
      },
      editFinish() {
        // 编辑完成
        this.tableData[this.activeName] = {
          user: [],
          system: []
        }
        this.getList()
      },
      handleStop(row) {
        this.$confirm(`确认要${row.enable ? '停用' : '启用'}该字段吗？`, '提示', {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          updateOpenObjectStatus(row.fieldId).then(res => {
            this.$notify.success(`${row.enable ? '停用' : '启用'}字段成功。`)
            row.enable = !row.enable
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
