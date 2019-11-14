<template>
  <el-form ref="form"
           :model="item"
           :rules="rules"
           label-position="left"
           label-width="0px"
           class="card-box loginform loginheight">
    <h3 class="title">element-demo</h3>
    <el-form-item prop="username">
      <el-col :span="24">
        <el-input type="text"
                  v-model="item.username"
                  auto-complete="off"
                  @keyup.enter.native="submit"
                  placeholder="输入您的用户名">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item prop="password">
      <el-col :span="24">
        <el-input type="password"
                  v-model="item.password"
                  auto-complete="off"
                  @keyup.enter.native="submit"
                  placeholder="输入密码">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary"
                 style="width:100%;height: 42px; font-size: 16px;"
                 :loading="loading"
                 @click.native.prevent="submit">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import axios from 'axios'
  import FormMixins from '@/mixins/FormMixins'

  const rules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  }

  export default {
    mixins: [FormMixins],
    data() {
      return {
        loading: false,
        item: {
          username: null,
          password: null,
        },
        rules,
      }
    },
    created() {
      if (process.env.NODE_ENV !== 'production') {
        this.item.username = 'admin'
        this.item.password = '123456'
      }
    },
    methods: {
      async submit() {
        await this.submitForm()

        this.loading = true

        const rsp = await axios.post('/api/login', this.item)

        if (rsp.code === 0) {
          window.localStorage.setItem('token', rsp.result)

          if (this.$route.query.r) {
            window.location.href = this.$route.query.r
          }
          else {
            this.$router.push({ path: '/' })
            // window.location.href = '/'
          }
          return
        }
        else {
          this.$alert(rsp.msg || '用户名或密码错误!')
        }

        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .login {
    background-color: #f0f2f5;
    display: block;
    padding: 10px 0px;
  }

  .card-box {
    padding: 20px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #fff;
    margin: 120px auto;
    width: 400px;
    /*border: 2px solid #8492A6;*/
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #333;
    font-size: 32px;
  }

  .loginform {
    width: 300px;
    color: #eee;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -60%);
    z-index: 100;
  }
</style>
