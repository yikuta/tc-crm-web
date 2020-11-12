<template>
  <div class="app-container">
    <el-row class="padding-bottom-sm border-bottom-main">
      <el-col :span="12" class="">线索合并</el-col>
      <el-col :span="12" class="text-right">
        <span class="text-info text-sm padding-right-sm">线索合并后会将被合并线索的负责团队、跟进记录等合并到目标线索</span>
      </el-col>
    </el-row>
    <div class="text-df table-box margin-top" v-if="loading">
      <el-row class="bg-seat text-bold">
        <el-col class="header-line">
          <div>字段</div>
          <div>线索</div>
        </el-col>
        <el-col :span="10">{{resource1.title}}</el-col>
        <el-col :span="10">{{resource2.title}}</el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">设为目标线索</el-col>
        <el-col :span="10"><el-radio v-model="form.targetId" label="resource1.targetId" @change="targetIdChange">线索1</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.targetId" label="resource2.targetId" @change="targetIdChange">线索2</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">联系人</el-col>
        <el-col :span="10"><el-radio v-model="form.resourceName" label="resource1.resourceName">{{resource1.resourceName}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.resourceName" label="resource2.resourceName">{{resource2.resourceName}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">门店名称</el-col>
        <el-col :span="10"><el-radio v-model="form.shopName" label="resource1.shopName">{{resource1.shopName}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.shopName" label="resource2.shopName">{{resource2.shopName}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">联系人电话</el-col>
        <el-col :span="10"><el-radio v-model="form.phoneNumber" label="resource1.phoneNumber">{{resource1.phoneNumber}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.phoneNumber" label="resource2.phoneNumber">{{resource2.phoneNumber}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">门店店招</el-col>
        <el-col :span="10"><el-radio v-model="form.shopBoard" label="resource1.shopBoard">{{resource1.shopBoard}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.shopBoard" label="resource2.shopBoard">{{resource2.shopBoard}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">所在地区</el-col>
        <el-col :span="10"><el-radio v-model="form.regionId" label="resource1.regionVo">{{resource1.regionVo[2].name + resource1.regionVo[1].name + resource1.regionVo[0].name}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.regionId" label="resource2.regionVo">{{resource2.regionVo[2].name + resource2.regionVo[1].name + resource2.regionVo[0].name}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">详细地址</el-col>
        <el-col :span="10"><el-radio v-model="form.address" label="resource1.address">{{resource1.address}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.address" label="resource2.address">{{resource2.address}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">备注</el-col>
        <el-col :span="10"><el-radio v-model="form.remark" label="resource1.remark">{{resource1.remark}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.remark" label="resource2.remark">{{resource2.remark}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">线索来源</el-col>
        <el-col :span="10"><el-radio v-model="form.channelType" disabled label="resource1.channelType">{{resource1.channelType.describe}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.channelType" disabled label="resource2.channelType">{{resource2.channelType.describe}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">负责人</el-col>
        <el-col :span="10"><el-radio v-model="form.principalUser" disabled label="resource1.principalUser">{{resource1.principalUser}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.principalUser" disabled label="resource2.principalUser">{{resource1.principalUser}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">负责人所属部门</el-col>
        <el-col :span="10"><el-radio v-model="form.department" disabled label="resource1.department">{{resource1.department}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.department" disabled label="resource2.department">{{resource2.department}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">创建人</el-col>
        <el-col :span="10"><el-radio v-model="form.createUser" disabled label="resource1.createUser">{{resource1.createUser}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.createUser" disabled label="resource2.createUser">{{resource2.createUser}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">创建时间</el-col>
        <el-col :span="10"><el-radio v-model="form.createTime" disabled label="resource1.createTime">{{resource1.createTime}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.createTime" disabled label="resource2.createTime">{{resource2.createTime}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">最后跟进时间</el-col>
        <el-col :span="10"><el-radio v-model="form.followTime" disabled label="resource1.followTime">{{resource1.followTime}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.followTime" disabled label="resource2.followTime">{{resource2.followTime}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">状态</el-col>
        <el-col :span="10"><el-radio v-model="form.status" disabled label="resource1.status">{{resource1.status.describe}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.status" disabled label="resource2.status">{{resource1.status.describe}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">最后修改时间</el-col>
        <el-col :span="10"><el-radio v-model="form.updateTime" disabled label="resource1.updateTime">{{resource1.updateTime}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.updateTime" disabled label="resource2.updateTime">{{resource2.updateTime}}</el-radio></el-col>
      </el-row>
      <el-row class="text-convention">
        <el-col style="width:180px">最后修改人</el-col>
        <el-col :span="10"><el-radio v-model="form.updateUser" disabled label="resource1.updateUser">{{resource1.updateUser}}</el-radio></el-col>
        <el-col :span="10"><el-radio v-model="form.updateUser" disabled label="resource2.updateUser">{{resource2.updateUser}}</el-radio></el-col>
      </el-row>
    </div>
    <div>
      <el-button type="primary" size="mini" @click="save">确定</el-button>
      <el-button size="mini" @click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
  import { getDetails } from '@/api/resource/detail'
  import { mergeResource } from '@/api/resource/menu'
  export default {
    name: 'Merge',
    data() {
      return {
        loading: false,
        form: {
          targetId: '',
          resourceName: '',
          shopName: '',
          phoneNumber: '',
          shopBoard: '',
          regionId: '',
          address: '',
          remark: '',
          mergeId: ''
        },
        title1: '',
        title2: '',
        resource1: {},
        resource2: {}
      }
    },
    mounted() {
      this._getDetails(this.$route.query.resourceId1, '1')
      this._getDetails(this.$route.query.resourceId2, '2')
    },
    methods: {
      save() {
        let form = JSON.parse(JSON.stringify(this.form))
        form = {
          id: this[form.targetId.split('.')[0]][form.targetId.split('.')[1]],
          resourceName: this[form.resourceName.split('.')[0]][form.resourceName.split('.')[1]],
          customerOrResourceName: this[form.customerOrResourceName.split('.')[0]][form.customerOrResourceName.split('.')[1]],
          customerOrResourceName2: this[form.customerOrResourceName2.split('.')[0]][form.customerOrResourceName2.split('.')[1]],
          shopName: this[form.shopName.split('.')[0]][form.shopName.split('.')[1]],
          phoneNumber: this[form.phoneNumber.split('.')[0]][form.phoneNumber.split('.')[1]],
          shopBoard: this[form.shopBoard.split('.')[0]][form.shopBoard.split('.')[1]],
          regionId: this[form.regionId.split('.')[0]][form.regionId.split('.')[1]][0].id,
          address: this[form.address.split('.')[0]][form.address.split('.')[1]],
          remark: this[form.remark.split('.')[0]][form.remark.split('.')[1]],
          mergeId: this[form.mergeId.split('.')[0]][form.mergeId.split('.')[1]],
          mergeName: this[form.mergeName.split('.')[0]][form.mergeName.split('.')[1]]
        }
        this._mergeResource(form)
      },
      targetIdChange(val) {
        if (val.split('.')[0] === 'resource1') {
          this.form = {
            targetId: 'resource1.targetId',
            title: 'resource1.resourceName',
            resourceName: 'resource1.resourceName',
            customerOrResourceName: 'resource1.resourceName',
            customerOrResourceName2: 'resource2.resourceName',
            shopName: 'resource1.shopName',
            phoneNumber: 'resource1.phoneNumber',
            shopBoard: 'resource1.shopBoard',
            regionId: 'resource1.regionVo',
            address: 'resource1.address',
            remark: 'resource1.remark',
            channelType: 'resource1.channelType',
            principalUser: 'resource1.principalUser',
            department: 'resource1.department',
            createUser: 'resource1.createUser',
            createTime: 'resource1.createTime',
            followTime: 'resource1.followTime',
            status: 'resource1.status',
            updateTime: 'resource1.updateTime',
            updateUser: 'resource1.updateUser',
            mergeId: 'resource2.targetId',
            mergeName: 'resource2.resourceName'
          }
        } else {
          this.form = {
            targetId: 'resource2.targetId',
            title: 'resource2.resourceName',
            resourceName: 'resource2.resourceName',
            customerOrResourceName: 'resource1.resourceName',
            customerOrResourceName2: 'resource2.resourceName',
            shopName: 'resource2.shopName',
            phoneNumber: 'resource2.phoneNumber',
            shopBoard: 'resource2.shopBoard',
            regionId: 'resource2.regionVo',
            address: 'resource2.address',
            remark: 'resource2.remark',
            channelType: 'resource2.channelType',
            principalUser: 'resource2.principalUser',
            department: 'resource2.department',
            createUser: 'resource2.createUser',
            createTime: 'resource2.createTime',
            followTime: 'resource2.followTime',
            status: 'resource2.status',
            updateTime: 'resource2.updateTime',
            updateUser: 'resource2.updateUser',
            mergeId: 'resource1.targetId',
            mergeName: 'resource1.resourceName'
          }
        }
      },
      _mergeResource(data) {
        return mergeResource(data).then((res) => {
          if (res.code === 200) {
            this.$notify.success(res.message)
            this.$router.go(-1)
          }
        })
      },
      _getDetails(data, index) {
        return getDetails(data).then((res) => {
          if (res.code === 200) {
            const result = res.result
            this['resource' + index] = {
              targetId: result.customerResourceVo.resourceId,
              title: result.customerResourceVo.resourceName,
              resourceName: result.customerResourceVo.resourceName,
              shopName: result.customerResourceVo.shopName,
              phoneNumber: result.customerResourceVo.phoneNumber,
              shopBoard: result.shopBoard,
              regionVo: result.customerResourceVo.regionVo,
              address: result.address,
              remark: result.remark,
              channelType: result.channelType,
              principalUser: result.customerResourceVo.principalUser,
              department: result.department,
              createUser: result.customerResourceVo.createUser,
              createTime: result.customerResourceVo.createTime,
              followTime: result.followTime,
              status: result.customerResourceVo.status,
              updateTime: result.updateTime,
              updateUser: result.updateUser
            }
            this.form = {
              targetId: 'resource1.targetId',
              title: 'resource1.resourceName',
              resourceName: 'resource1.resourceName',
              customerOrResourceName: 'resource1.resourceName',
              customerOrResourceName2: 'resource2.resourceName',
              shopName: 'resource1.shopName',
              phoneNumber: 'resource1.phoneNumber',
              shopBoard: 'resource1.shopBoard',
              regionId: 'resource1.regionVo',
              address: 'resource1.address',
              remark: 'resource1.remark',
              channelType: 'resource1.channelType',
              principalUser: 'resource1.principalUser',
              department: 'resource1.department',
              createUser: 'resource1.createUser',
              createTime: 'resource1.createTime',
              followTime: 'resource1.followTime',
              status: 'resource1.status',
              updateTime: 'resource1.updateTime',
              updateUser: 'resource1.updateUser',
              mergeId: 'resource2.targetId',
              mergeName: 'resource2.resourceName'
            }
            this.loading = true
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.app-container{
  .table-box{
    .header-line{position:relative;width:180px;overflow: hidden;height:50px;
      &:before{width:200%;height:1px;content: '';position:absolute;left:0;transform: rotate(15deg);background:#C0C4CC; transform-origin: 0% 0%; }
      >div{
        &:first-child{position:absolute;bottom:-5px;left:0px;}
        &:last-child{position:absolute;top:-5px;right:10px;}
      }
    }
    >div{height:50px;line-height:50px;text-indent: 10px;}
  }
}
</style>
