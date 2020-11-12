<template>
  <div class="page-container">
    <el-card class="login-form-layout">
      <el-form autoComplete="off" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">CRM 管理系统</h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model.trim="loginForm.username"
            autoComplete="off"
            maxlength="11"
            placeholder="请输入登录手机号"
          >
            <span slot="prefix">
              <i class="el-icon-user"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model.trim="loginForm.password"
            autoComplete="off"
            show-password
            maxlength="8"
            placeholder="请输入登录密码"
          >
            <span slot="prefix">
              <i class="el-icon-unlock"></i>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item class="code-item" prop="graphicCode">
          <el-input
            name="graphicCode"
            @keyup.enter.native="handleLogin"
            v-model.trim="loginForm.graphicCode"
            autoComplete="off"
            maxlength="6"
            placeholder="图形验证码"
          >
            <i class="el-icon-files" slot="prefix"></i>
          </el-input>
          <el-image :src="imgCodeSrc"
                    title="点击更换验证码"
                    class="code-img"
                    v-if="!loadingCode"
                    @click="handleGetImageCode">
            <div slot="error"
                 class="image-slot"
                 @click="handleGetImageCode">
              <i class="el-icon-refresh"> 点击重新获取</i>
            </div>
          </el-image>
          <div class="loading-code"
               v-else>
            <i class="el-icon-loading"></i>
            正在获取验证码
          </div>
        </el-form-item>
       <!-- <el-form-item prop="smsCode"
                      class="code-item"
                      v-if="whiteFlag">
          <el-input @keyup.enter.native="handleLogin"
                    v-model.trim="loginForm.smsCode "
                    autoComplete="on"
                    maxlength="4"
                    placeholder="请输入验证码">
          </el-input>
          <el-button type="primary"
                     plain
                     @click="sentCode"
                     :disabled="!!timer"><span class="cut-txt">{{timer?`${cutTime}秒后重试`:'立即获取验证码'}}</span></el-button>
        </el-form-item>-->
        <el-form-item class="code-item">
          <el-checkbox v-model="rememberPwd">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="login-center-layout">
      <img :src="backgroundImage" alt="">
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import regexp from '@/constant/regexp'
  import { setCookie, getCookie, removeCookie } from '@/utils/support'
  import loginCenterBg from '@/assets/images/login_center_bg.png'
  import { login } from '@/api/login'
  import { unInvalidPwd } from '@/utils/auth'
  const Base64 = require('js-base64').Base64
  const validateGraphicCode = (rule, value, callback) => {
    const numWordReg = /^[A-Za-z0-9]{6}$/
    if (!value) {
      callback(new Error('请输入正确的验证码'))
    } else if (!numWordReg.test(value)) {
      callback(new Error('请输入正确的验证码'))
    } else {
      callback()
    }
  }

  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          graphicCode: ''
        },
        loginRules: {
          username: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { pattern: regexp.phone, message: '请输入正确电话号码', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 8, message: '请输入6-8位登录密码', trigger: 'blur' }
          ],
          graphicCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { required: true, message: '请输入正确的验证码', validator: validateGraphicCode, trigger: 'blur' }
          ]
        },
        loadingCode: false,
        imgCodeSrc: '123456',
        whiteFlag: true,
        cutTime: 60,
        timer: 0,
        rememberPwd: false,
        beforeLoginInfo: {},
        loading: false,
        pwdType: 'password',
        backgroundImage: loginCenterBg,
        dialogVisible: false,
        supportDialogVisible: false
      }
    },
    created() {
      // 判断密码是否已经存了一周
      !unInvalidPwd() && this.getCookieUserInfo()
      this.handleGetImageCode()
    },
    methods: {
      handleLogin() {
        // 登陆
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            login({
              imageVerificationCode: this.loginForm.graphicCode,
              phone: this.loginForm.username,
              password: md5(this.loginForm.password),
              phoneVerificationCode: ''
            }).then(res => {
              if (res.code === 200) {
                this.$store.dispatch('setUserInfo', res.result)
                this.$store.dispatch('setToken', res.result.token)
                this.$store.dispatch('setPermissions', res.result.permissions)
                setCookie('username', this.loginForm.username)
                this.$notify.success('登录成功')
                // 如果选择了记住密码-存入密码
                if (this.rememberPwd) {
                  setCookie('password', Base64.encode(this.loginForm.password))
                } else {
                  removeCookie('password')
                }
                setCookie('logintime', new Date().getTime())
                sessionStorage.setItem('lastTime', new Date().getTime())
                location.href = '/'
              } else {
                this.handleGetImageCode()
              }
            })
          }
        })
      },
      getCookieUserInfo() {
        // 用户信息
        const _name = getCookie('username') || ''
        const _pwd = getCookie('password') || ''
        if (_pwd) {
          this.loginForm.username = _name
          this.loginForm.password = Base64.decode(_pwd)
          this.rememberPwd = true
        }
        this.$store.commit('SET_NAME', _name)
      },
      handleGetImageCode() {
        this.imgCodeSrc = `${process.env.VUE_APP_API_BASE_URL}/api/crm/web/login/getGraphicCode?random=${Math.random()}`
      },
      rememberPassword() {}
    }
  }
</script>

<style scoped lang="scss">
  .code-item {
    /deep/ {
      .el-form-item__content {
        display: flex;
        align-items: center;
      }

      .loading-code {
        width: 238px;
        color: #409eff;
        text-align: center;
      }

      .image-slot {
        text-align: center;
        color: #409eff;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .cut-txt {
      width: 98px;
      display: inline-block;
    }

    .el-input {
      margin-right: 5px;
    }

    .el-button {
      margin-left: 2px;
      width: 140px;
    }

    .code-img {
      width: 238px;
      height: 40px;
      vertical-align: middle;
      cursor: pointer;
    }
  }

  .login-form-layout {
    position: absolute;
    z-index: 20;
    left: 0;
    right: 0;
    width: 400px;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    margin: 0 auto;
    border-top: 10px solid #409eff;

    .login-title {
      text-align: center;
      margin: 16px 0;
    }
  }

  .login-center-layout {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    padding-top: 180px;

    img {
      background: #409eff;
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
