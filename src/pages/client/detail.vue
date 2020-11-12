<template>
  <div class="app-container">
    <el-row class="padding-bottom border-bottom-main margin-bottom">
      <el-col :span="12" class="text-bold">客户详情</el-col>
      <el-col :span="12" class="text-right" v-if="baseData.id">
        <el-button type="primary" size="mini" @click="handleGet" v-if="!baseData.isPriveteCustomer">领取</el-button>
        <el-button v-np="'CUSTOMER_DESTROY'" type="primary" size="mini" @click="handleDelete">作废</el-button>
        <el-button v-np="'CUSTOMER_CHANGE_STATUS'" type="primary" size="mini" @click="CooperationVisible = true" v-if="baseData.isPriveteCustomer">更改合作状态</el-button>
        <el-button v-np="'CUSTOMER_MOVE_SEA'" type="primary" size="mini" @click="SwitchPoolVisible = true" v-if="baseData.isPriveteCustomer && !isHighSea">转入公海</el-button>
        <el-button v-np="'CUSTOMER_CHANGE_ADMIN'" type="primary" size="mini" @click="ChangePersonVisible = true">变更负责人</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="14">
        <el-row class="padding-bottom-sm margin-bottom-sm border-bottom-seat">
          <el-col :span="12" class="">
            <span>基本信息</span>
            <span class="text-sm padding-left" v-if="baseData.customerResourceId">转换线索：<el-button type="text" size="mini" @click="$router.push(`/thread/detail?resourceId=${baseData.customerResourceId}&type=${baseData.isPriveteCustomer ? 'private' : 'public'}`)">{{ baseData.customerResourceName }}</el-button></span>
          </el-col>
          <el-col :span="12" class="text-right" v-if="[3, 4].includes(auth)">
            <el-button type="success" size="mini" @click="$router.push(`/client/form/${customerId}`)" v-np="'CUSTOMER_EDIT'">编辑</el-button>
          </el-col>
        </el-row>
        <div class="padding-bottom-sm">
          <el-row class="user-info-line">
            <el-col class="padding-bottom-sm" :span="item.key === 'ADDRESS' ? 24 : 12" v-for="(item, index) in otherOption" :key="index">
              <el-row v-if="item.key === 'ADDRESS'">
                <el-row class="padding-bottom-sm">地址：</el-row>
                <el-row>
                  <el-col :span="12" class="padding-bottom-sm">
                    <el-row>
                      <el-col :span="6" class="text-df text-right text-second">定位地址：</el-col>
                      <el-col :span="18" class="text-second text-df">{{ item | getDot }}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" class="padding-bottom-sm">
                    <el-row>
                      <el-col :span="6" class="text-df text-right text-second">地区：</el-col>
                      <el-col :span="18" class="text-second text-df">{{ item | getAddress }}</el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12" class="padding-bottom-sm">
                    <el-row :span="12">
                      <el-col :span="6" class="text-df text-right text-second">详情地址：</el-col>
                      <el-col :span="18" class="text-second text-df">{{ item | getDetailAddress }}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-row>
              <el-row v-else>
                <el-col :span="6" class="text-df">{{ item.name }}：</el-col>
                <el-col :span="18" class="text-second text-df" v-if="item.type === 'IMAGE'">
                  <!--处理图片-->
                  <img width="50" height="50" :src="item.value" />
                </el-col>
                <template v-else>
                  <el-col v-if="item.type === 'RICH_TEST'">
                    <!--处理富文本-->
                    <div :html="item.value"></div>
                  </el-col>
                  <el-col :span="18" class="text-second text-df" v-else>{{ item | getValue }}</el-col>
                </template>
              </el-row>
            </el-col>
            <el-col class="padding-bottom-sm text-df" :span="12" v-if="baseData.isPriveteCustomer">
              <el-row>
                <el-col :span="6">负责人：</el-col>
                <el-col :span="18">{{ baseData.responsibilityUserName }}</el-col>
              </el-row>
            </el-col>
            <el-col class="padding-bottom-sm text-df" :span="12" v-if="baseData.isPriveteCustomer && !auth">
              <el-row>
                <el-col :span="6">负责团队：</el-col>
                <el-col :span="18">{{ baseData.userDepartmentName }}<el-button type="text" size="mini" @click="ResourceVisible = true">负责团队&gt;</el-button></el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="padding-bottom">
            <div :span="24" class="padding-bottom-sm margin-bottom-sm border-bottom-seat">系统信息</div>
            <el-row>
              <el-col :span="12" class="padding-bottom-sm">
                <el-row>
                  <el-col :span="6" class="text-df">创建人：</el-col>
                  <el-col :span="18" class="text-second text-df">{{ baseData.creatorName }}</el-col>
                </el-row>
              </el-col>
              <el-col :span="12" class="padding-bottom-sm">
                <el-row>
                  <el-col :span="6" class="text-df">创建时间：</el-col>
                  <el-col :span="18" class="text-second text-df">{{ baseData.createTime }}</el-col>
                </el-row>
              </el-col>
              <el-col :span="12" class="padding-bottom-sm">
                <el-row>
                  <el-col :span="6" class="text-df">最后跟进时间：</el-col>
                  <el-col :span="18" class="text-second text-df">{{ baseData.lastFollowUpTime }}</el-col>
                </el-row>
              </el-col>
              <el-col :span="12" class="padding-bottom-sm">
                <el-row>
                  <el-col :span="6" class="text-df">合作状态：</el-col>
                  <el-col :span="18" class="text-second text-df">{{ baseData.cooperationStatus }}</el-col>
                </el-row>
              </el-col>
              <el-col :span="12" class="padding-bottom-sm">
                <el-row>
                  <el-col :span="6" class="text-df">最后修改时间：</el-col>
                  <el-col :span="18" class="text-second text-df">{{ baseData.lastUpdateTime }}</el-col>
                </el-row>
              </el-col>
              <el-col :span="12" class="padding-bottom-sm">
                <el-row>
                  <el-col :span="6" class="text-df">最后修改人：</el-col>
                  <el-col :span="18" class="text-second text-df">{{ baseData.lastUpdateUserName }}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-if="!isHighSea && [2, 4].includes(auth)">
          <el-row class="padding-bottom-sm margin-bottom-sm border-bottom-seat">
            <el-col :span="24" class="">操作日志</el-col>
          </el-row>
          <el-table size="mini" :data="logList">
            <el-table-column label="操作时间" prop="createTime"></el-table-column>
            <el-table-column label="日志内容" prop="content"></el-table-column>
            <el-table-column label="操作人" prop="operator"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="10" v-if="[2, 4].includes(auth)">
        <record-list :customerId="customerId" v-np="'FOLLOW_RECORD_VIEW_LIST'" :auth="auth"></record-list>
      </el-col>
    </el-row>
    <change-peron :visible.sync="ChangePersonVisible" @change="handleUserChange"></change-peron>
    <switch-pool :visible.sync="SwitchPoolVisible" @change="handleChangeSea"></switch-pool>
    <cooperation-modal :visible.sync="CooperationVisible" @change="handleChangeCooperationStatus"></cooperation-modal>
    <customer-resource :visible.sync="ResourceVisible" :customerId="baseData.id"></customer-resource>
  </div>
</template>

<script>
  import RecordList from './templates/detail/record'
  import ChangePeron from './templates/detail/changePerson'
  import switchPool from './templates/detail/switchPool'
  import { getCustomerDetail, deleteCustomer, updateCustomerCooperationStatus, moveToOpenSea, updateCustomerResponsibleUser, receiveCustomer } from '@/api/customer/menu'
  import { getReport } from '@/api/report'
  export default {
    name: 'ClientDetail',
    components: {
      RecordList,
      ChangePeron,
      switchPool,
      CooperationModal: resolve => {
        return require(['./templates/detail/cooperation.vue'], resolve)
      },
      CustomerResource: resolve => {
        return require(['./templates/detail/customerResource.vue'], resolve)
      }
    },
    data() {
      return {
        customerId: 0,
        ChangePersonVisible: false, // 修改负责人
        SwitchPoolVisible: false, // 转换线索池
        CooperationVisible: false, // 合作状态修改
        UserChangeVisible: false, // 用户变更
        ResourceVisible: false, // 团队弹窗
        logList: [], // 日志
        otherOption: {}, // 基础信息
        baseData: {}, // 原始信息
        isHighSea: false, // 是否是公海
        auth: 0 // 权限
      }
    },
    created() {
      this.init()
    },
    filters: {
      getValue(item) {
        switch (item.type) {
          case 'AREA':
            // 处理区域
            try {
              let text = ''
              const lst = JSON.parse(item.value)
              lst.forEach(obj => {
                text = text ? `${text}/${obj.name}` : obj.name
              })
              return text
            } catch (e) {
              return ''
            }
          default:
            return item.value
        }
      },
      getDot(item) {
        // 获取丁文
        try {
          return JSON.parse(item.value).location.value || '-'
        } catch (e) {
          return '-'
        }
      },
      getAddress(item) {
        // 获得地址
        try {
          return `${JSON.parse(JSON.parse(item.value).area.realData)[0].name}-${JSON.parse(JSON.parse(item.value).area.realData)[1].name}-${JSON.parse(JSON.parse(item.value).area.realData)[2].name}` || '-'
        } catch (e) {
          return '-'
        }
      },
      getDetailAddress(item) {
        // 获得详细地址
        try {
          return JSON.parse(item.value).address.value || '-'
        } catch (e) {
          return '-'
        }
      }
    },
    methods: {
      init() {
        this.isHighSea = !!this.$route.query.sea
        this.customerId = this.$route.params.id
        if (this.customerId) {
          this.getCustomerDetail()
        }
      },
      getCustomerDetail() {
        // 获取客户详情
        getCustomerDetail(this.customerId).then(res => {
          if (res.code === 200) {
            this.baseData = res.result
            this.dealBaseInfo(res.result.otherOption)
            this.dealAuth(res.result)
          }
        })
      },
      dealAuth(result) {
        /*
        * 1、给成员的权限为只读、普通成员时，该成员只能查看：该客户客户基本信息、系统信息
        * 2、给成员的权限为只读、联合跟进人时，该成员只能查看：该客户基本信息、系统信息、跟进记录、和操作日志的权限
        * 3、给成员的权限为读写、普通成员时，该成员：只具备查看或编辑该客户客户基本信息、系统信息的权限
        * 4、给成员的权限为读写、联合跟进人时，具备查看或编辑该客户基本信息、系统信息、跟进记录（新建跟进记录和回复跟进记录）、和操作日志的权限
        * */
        if (!result) return
        if (result.permission.value === 1 && result.role.value === 1) {
          this.auth = 1
        }
        if (result.permission.value === 1 && result.role.value === 2) {
          this.auth = 2
        }
        if (result.permission.value === 2 && result.role.value === 1) {
          this.auth = 3
        }
        if (result.permission.value === 2 && result.role.value === 2) {
          this.auth = 4
        }
        if (!this.isHighSea && [2, 4].includes(this.auth)) {
          this.getReport()
        }
      },
      dealBaseInfo(value) {
        // 组装基础信息数据
        try {
          const arr = JSON.parse(value)
          arr.forEach(item => {
            // 形成新的数据结构
            if (this.otherOption[item.apiName]) {
              // 如果已经有了 apiName
              this.otherOption[item.apiName].value = `${this.otherOption[item.apiName].value}, ${item.fieldValue}`
            } else {
              this.otherOption[item.apiName] = {
                key: item.apiName,
                name: item.fieldName,
                value: item.fieldValue,
                type: item.fieldType
              }
            }
          })
        } catch (e) {
          // 抛出错误
        }
      },
      getReport() {
        // 获取日志
        getReport({
          pageNo: 1,
          pageSize: 20,
          identifier: this.customerId,
          operationLogModule: 'CUSTOMER_OPERATION',
          isPrivate: true
        }).then(res => {
          if (res.code === 200) {
            this.logList = res.result.itemVOs
          }
        })
      },
      handleDelete() {
        // 作废
        this.$confirm('作废数据将会终止业务流程，并放入回收站所有人员不可见，确定要作废吗？', '提示', {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          deleteCustomer({
            id: this.baseData.id,
            userId: this.$store.getters.userInfo.userId,
            customerOrResourceName: this.baseData.customerName
          }).then(res => {
            if (res.code === 200) {
              this.$notify.success('作废成功')
              setTimeout(() => {
                if (this.$route.query.sea) {
                  // 如果是公海，跳转到公海
                  this.$router.push('/client/highSea')
                } else {
                  this.$router.push('/client/index')
                }
              }, 1000)
            }
          })
        })
      },
      handleChangeCooperationStatus(result) {
        // 更改合作状态
        updateCustomerCooperationStatus({
          id: this.baseData.id,
          cooperationStatus: result,
          userId: this.$store.getters.userInfo.userId,
          customerOrResourceName: this.baseData.customerName
        }).then(res => {
          if (res.code === 200) {
            this.getCustomerDetail()
            this.$notify.success('更改成功')
          }
        })
      },
      handleChangeSea(result) {
        // 转入公海
        moveToOpenSea({
          openSeaId: result.openSeaId,
          id: this.baseData.id,
          userId: this.$store.getters.userInfo.userId,
          customerOrResourceName: this.baseData.customerName,
          publicSeaName: result.openSeaName
        }).then(res => {
          if (res.code === 200) {
            this.getCustomerDetail()
            this.$notify.success('转入成功')
            setTimeout(() => {
              location.replace(`/client/detail/${this.$route.params.id}?sea=${result.openSeaId}`)
            }, 1000)
          }
        })
      },
      handleUserChange(result) {
        // 变更负责人
        if (result) {
          updateCustomerResponsibleUser({
            id: this.baseData.id,
            responsibleUserId: result.id,
            customerOrResourceName: this.baseData.customerName, // 销售线索名称
            newPrincipalUser: result.name,
            oldPrincipalUser: this.baseData.leaderName
          }).then(res => {
            if (res.code === 200) {
              this.getCustomerDetail()
              this.$notify.success('变更成功')
            }
          })
        }
      },
      handleGet() {
        // 领取
        this.$confirm('确定领取这个客户吗？', '提示', {
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(() => {
          receiveCustomer({
            id: this.baseData.id,
            customerOrResourceName: this.baseData.customerName,
            userId: this.$store.getters.userInfo.userId
          }).then(res => {
            if (res.code === 200) {
              this.$notify.success('领取成功')
              setTimeout(() => {
                location.replace(`/client/detail/${this.$route.params.id}`)
              }, 1000)
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
