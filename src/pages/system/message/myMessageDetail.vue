<template>
  <div class="">
    <div class="padding-bottom-sm">
      <span class="text-second">标题：</span>
      <span class="text-main">{{ messageData.messageTitle }}</span>
    </div>
    <div class="padding-bottom-sm">
      <span class="text-second">发送人：</span>
      <span class="text-main">{{ messageData.creatorName }}</span>
    </div>
    <div class="padding-bottom-sm">
      <span class="text-second">发送时间：</span>
      <span class="text-main">{{ messageData.createTime }}</span>
    </div>
    <div class="padding-bottom-sm">
      <span class="text-second">内容：</span>
      <span class="text-main">{{ messageData.messageContent }}</span>
    </div>
    <div class="">
      <el-button type="default" size="mini" @click="$router.push('/message/index')">返回</el-button>
    </div>
  </div>
</template>

<script>
  import { getMessageDetail } from '@/api/system/message'
  export default {
    name: 'MyMessageDetail',
    data() {
      return {
        messageData: {}
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        getMessageDetail(this.$route.params.id).then(res => {
          this.messageData = res.result
        })
      }
    }
  }
</script>

<style lang="scss" scoped></style>
