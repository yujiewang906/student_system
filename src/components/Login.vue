<template>



    <div class="login-wrap">
      <div class="ms-login">
        <div class="ms-title">学生管理系统</div>
        <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
          <el-form-item prop="name">
            <el-input v-model="param.name" placeholder="name">
              <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="password"
              v-model="param.password"
              @keyup.enter.native="submitForm()"
            >
              <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
            </el-input>
          </el-form-item>
          <el-row>
              <div class="login-btn">
                  <el-col :span="11">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                  </el-col >

                  <el-col :span="11">
                    <el-button type="primary" @click="addUser()">注册</el-button>
                  </el-col>
              </div>
          </el-row>
          <p class="login-tips">Tips : 用户名和密码必填。</p>
        </el-form>
      </div>


  <!--新增用户信息-->
      <el-dialog title="用户信息注册" :visible.sync="registerUserHtml">
        <el-form ref="form" :model="addUserForm" label-width="80px">

          <input type="hidden" v-model="addUserForm.id">

          <el-row>
            <el-col :span="12">
              <el-form-item label="账号" prop="name">
                <el-input v-model="addUserForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="密码">
                <el-input v-model="addUserForm.password" show-password></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="创建日期">
                <div class="block">
                  <el-date-picker
                    v-model="addUserForm.createDate"
                    align="right"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>



          <el-row>
          <el-form-item>
            <el-button type="primary" @click="addUserFormSubmit">提交</el-button>
            <el-button @click="registerUserHtml=false">取消</el-button>
          </el-form-item>
          </el-row>
        </el-form>
      </el-dialog>



    </div>
</template>

<script>
    export default {
        name: "Login",
        data: function() {
          return {
            param: {
              name: '',
              password: '',
            },
            rules: {
              name: [{ required: false, message: '请输入用户名', trigger: 'blur' }],
              password: [{ required: false, message: '请输入密码', trigger: 'blur' }],
            },

            registerUserHtml: false,//注册用户的模板
            addUserForm:{
              name:"",
              password:"",
              crateDate:"",
            },

          };
        },
            methods: {
              //点击提交按钮
              addUserFormSubmit:function () {
                this.$ajax.post("http://192.168.1.35:8083/user/insertUser",this.$qs.stringify(this.addUserForm)).then(res=>{
                  //debugger;
                  this.registerUserHtml=false;
                  this.$message.success("注册成功，快去登录吧");
                }).catch(rs=>{
                    this.$message.error("出现异常")
                });
              },
              //点击注册按钮
              addUser:function () {
                this.addUserForm = {};
                this.registerUserHtml=true;
              },
              /*登录提交按钮*/
              submitForm:function() {
                this.$refs.login.validate(valid => {
                  if (valid) {
                    this.$ajax.post("http://192.168.1.35:8083/user/login",this.$qs.stringify(this.param)).then(res=>{
                      debugger;
                      if (res.data.data != "") {
                        debugger;
                        //如果token值不为空   将token放入到浏览器中
                        window.sessionStorage.setItem("user",JSON.stringify({name:this.param.name}));
                        this.$message.success('登录成功');
                        this.$router.push('/One');
                      }
                    }).catch(rs=>function(){
                      this.$message.error('请输入账号和密码');
                      console.log('error submit!!');
                    })
                  } else {
                    return false;
                  }
                });
              },
            },

    }
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/student.jpg);
    background-size: 100%;
  }
  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }
  .ms-content {
    padding: 30px 30px;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }
  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
</style>
