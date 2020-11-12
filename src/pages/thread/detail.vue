<template>
  <div class="app-container" v-if="loading">
    <el-row class="padding-bottom border-bottom-main margin-bottom">
      <el-col :span="12" class="text-bold">线索详情</el-col>
      <el-col :span="12" class="text-right" v-if="$route.query.type == 'private' && formData.currentUserOperationVo">
        <el-button type="primary" size="mini" v-np="'RESOURCE_DESTROY'" v-show="formData.currentUserOperationVo.permission.value == 2" @click="handleDelete">作废</el-button>
        <el-button type="primary" size="mini" v-np="'RESOURCE_CHANGE_CUSTOMER'" v-show="formData.currentUserOperationVo.permission.value == 2" v-if="formData.customerResourceVo.status.value == 2" @click="changeToCustomer">转为客户</el-button>
        <el-button type="primary" size="mini" v-np="'RESOURCE_MOVE_POOL'" v-show="formData.currentUserOperationVo.permission.value == 2" @click="SwitchPoolVisible = true" v-if="formData.customerResourceVo.status.value == 2">转入线索池</el-button>
        <el-button type="primary" size="mini" v-np="'RESOURCE_CHANGE_ADMIN'" v-show="formData.currentUserOperationVo.permission.value == 2" @click="ChangePersonVisible = true" v-if="formData.customerResourceVo.status.value == 2">变更负责人</el-button>
        <!-- <el-button type="primary" size="mini" @click="ChangePersonVisible = true">分配</el-button> -->
      </el-col>
      <el-col :span="12" class="text-right" v-else-if="$route.query.type == 'public'">
        <el-button type="primary" size="mini" v-if="formData.customerResourceVo.status.value == 2" @click="handleGet">领取</el-button>
        <el-button type="primary" size="mini" v-np="'RESOURCE_DESTROY'" @click="handleDelete">作废</el-button>
        <el-button type="primary" size="mini" v-np="'RESOURCE_CHANGE_ADMIN'" v-if="formData.customerResourceVo.status.value == 2" @click="ChangePersonVisible = true">变更负责人</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="14">
        <el-row class="padding-bottom">
          <el-col :span="12" class="">
            <span>基本信息</span>
            <span class="text-sm padding-left" v-if="formData.relationCustomer.customerName">转换客户：<el-button type="text" size="mini" @click="$router.push({ path: '/client/detail/' + formData.relationCustomer.customerId })">{{formData.relationCustomer.customerName}}</el-button></span>
          </el-col>
          <el-col :span="12" class="text-right" v-if="$route.query.type == 'private' && formData.currentUserOperationVo">
            <el-button type="success" size="mini" v-np="'RESOURCE_EDIT'" @click="edit" v-show="formData.currentUserOperationVo.permission.value == 2">编辑</el-button>
          </el-col>
          <el-col :span="12" class="text-right" v-else-if="$route.query.type == 'public' && formData.currentUserOperationVo">
            <el-button type="success" size="mini" v-np="'RESOURCE_EDIT'" @click="edit" v-show="formData.currentUserOperationVo.permission.value == 2">编辑</el-button>
          </el-col>
        </el-row>
        <div class="">
          <el-form label-width="110px" size="mini">
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人">{{formData.customerResourceVo.resourceName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="门店名称">{{formData.customerResourceVo.shopName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人电话">{{formData.customerResourceVo.phoneNumber}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="门店店招">
                  <img style="height:100px;width:100px;" :src="formData.shopBoard.indexOf('http') > -1 ? formData.shopBoard : formData.shopBoardPre + formData.shopBoard" alt="门店店招" srcset="">
                </el-form-item>
              </el-col>
              <!-- <el-col :span="24">
                <el-col :span="4">
                  <el-form-item label="地址"></el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form size="mini">
                    <el-col :span="24" v-if="formData.positionVo">
                      <el-form-item label="定位地址">{{formData.positionVo.address}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="所在区域">{{getArea(formData.customerResourceVo.regionVo)}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="详情地址">{{formData.address}}</el-form-item>
                    </el-col>
                  </el-form>
                </el-col>
              </el-col> -->
              <el-col :span="24">
                <el-form-item label="地址"></el-form-item>
              </el-col>
              <el-col :span="24" v-if="formData.positionVo">
                <el-form-item label="定位地址">{{formData.positionVo.address}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所在区域">{{getArea(formData.customerResourceVo.regionVo)}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="详情地址">{{formData.address}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注">{{formData.remark}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="线索来源">{{formData.channelType.describe}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="principalUser" label="负责人" v-if="$route.query.type == 'private'">
                  <span>{{formData.customerResourceVo.principalUser}}</span>
                  <!-- <div v-if="formData.currentUserOperationVo">
                    <el-button @click="CustomerResourceVisible = true" v-if="formData.currentUserOperationVo.permission.value == 2" type="text" style="position: absolute;right: 30px;">负责团队></el-button>
                  </div> -->
                  <el-button @click="CustomerResourceVisible = true" type="text" style="position: absolute;right: 30px;">负责团队></el-button>
                </el-form-item>
                <el-form-item label="负责人" v-else>
                  <span>{{formData.customerResourceVo.principalUser}}</span>
                  <!-- <el-button @click="CustomerResourceVisible = true" type="text" style="position: absolute;right: 30px;">负责团队></el-button> -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人所属部门">{{formData.department}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div>
          <el-row class="padding-bottom">
            <el-col :span="12" class="text-df">系统信息</el-col>
          </el-row>
          <el-form label-width="110px" size="mini" class="search-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="创建人">{{formData.customerResourceVo.createUser}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="创建时间">{{formData.customerResourceVo.createTime}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最后跟进时间">{{formData.followTime}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态">{{formData.customerResourceVo.status.describe}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最后修改时间">{{formData.updateTime}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最后修改人">{{formData.updateUser}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div v-if="$route.query.type == 'private' && formData.currentUserOperationVo">
          <el-row class="padding-bottom" v-show="formData.currentUserOperationVo.role.value !== 1">
            <el-col :span="12" class="text-danger text-df">操作日志</el-col>
          </el-row>
          <el-table size="mini" :data="tableData" v-show="formData.currentUserOperationVo.role.value !== 1">
            <el-table-column label="操作时间" prop="createTime"></el-table-column>
            <el-table-column label="日志内容" prop="content"></el-table-column>
            <el-table-column label="操作人" prop="operator"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="10" v-if="formData.currentUserOperationVo" v-np="'FOLLOW_RECORD_VIEW_LIST'">
        <record-list :recordLists="formData" @on-freshData="onFreshData" v-show="formData.currentUserOperationVo.role.value !== 1"></record-list>
      </el-col>
    </el-row>
    <change-peron :visible.sync="ChangePersonVisible" :userList="userList" :formData="formData" @on-freshData="onFreshData"></change-peron>
    <switch-pool :visible.sync="SwitchPoolVisible" :formData="formData"></switch-pool>
    <customer-resource :visible.sync="CustomerResourceVisible" :adminGroup="formData.adminGroupVo" :formData="formData"></customer-resource>
  </div>
</template>

<script>
  import { getDetails, deleteResource, pollResource, getAllUser, findOperationLogByPage } from '@/api/resource/detail'
  import RecordList from './templates/detail/record'
  import ChangePeron from './templates/detail/changePeron'
  import switchPool from './templates/detail/switchPool'
  import customerResource from './templates/detail/customerResource'
  export default {
    name: 'ThreadDetail',
    components: {
      RecordList,
      ChangePeron,
      switchPool,
      customerResource
    },
    data() {
      return {
        formData: {},
        tableData: [],
        ChangePersonVisible: false,
        SwitchPoolVisible: false,
        CustomerResourceVisible: false,
        userList: [],
        loading: false
      }
    },
    mounted() {
      this._getDetails(this.$route.query.resourceId)
      this._getAllUser()
      this._findOperationLogByPage({
        identifier: this.$route.query.resourceId,
        operationLogModule: 'RESOURCE_OPERATION',
        isPrivate: true
      })
    },
    methods: {
      handleDelete() {
        // 作废
        this.$confirm('作废数据将会终止业务流程，并放入回收站所有人员不可见，确定要作废吗？', '提示', {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          this._deleteResource({
            customerOrResourceName: this.formData.customerResourceVo.resourceName,
            id: this.$route.query.resourceId
          })
        })
      },
      handleGet() {
        // 领取
        this.$confirm('确定领取这条线索吗？', '提示', {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          this._pollResource({
            customerOrResourceName: this.formData.customerResourceVo.resourceName,
            id: this.$route.query.resourceId,
            publicSeaName: '线索池1'
          })
        })
      },
      changeToCustomer() {
        this.$router.push({ path: '/thread/conversion', query: { resourceId: this.$route.query.resourceId, resourceName: this.formData.customerResourceVo.resourceName } })
      },
      edit() {
        this.$router.push({ path: '/thread/editForm', query: { type: 'edit', resourceId: this.$route.query.resourceId, isPrivate: this.$route.query.type === 'private' ? 'private' : 'public' } })
      },
      getArea(area) {
        const list = JSON.parse(JSON.stringify(area)).reverse()
        let text = ''
        list.map((item) => {
          text += item.name
        })
        return text
      },
      _pollResource(data) {
        return pollResource(data).then((res) => {
          if (res.code === 200) {
            this.$notify.success('领取成功')
            this.$router.go(-1)
          }
        })
      },
      _deleteResource(data) {
        return deleteResource(data).then((res) => {
          if (res.code === 200) {
            this.$notify.success('作废成功')
            this.$router.go(-1)
          }
        })
      },
      onFreshData() {
        // 刷新详情
        this._getDetails(this.$route.query.resourceId)
      },
      _getDetails(data) {
        return getDetails(data).then((res) => {
          if (res.code === 200) {
            if (res.result.followRecords) {
              res.result.followRecords.map((item) => {
                let record = JSON.parse(item.record)
                record = record.filter(n => n)
                item.record = JSON.stringify(record)
              })
            }
            this.formData = JSON.parse(JSON.stringify(res.result))
            this.loading = true
          }
        })
      },
      _getAllUser() {
        return getAllUser().then((res) => {
          if (res.code === 200) {
            this.userList = res.result
          }
        })
      },
      _findOperationLogByPage(data) {
        return findOperationLogByPage(data).then((res) => {
          if (res.code === 200) {
            this.tableData = res.result.itemVOs
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.principalUser /deep/ .el-form-item__content {
  display: flex;
}
</style>
