<template>
      <div>


        <div id="userTable">


          <el-table
            :data="userData"
            style="width: 100%">

            <el-table-column
              prop="id"
              label="序号"
              width="180">
            </el-table-column>

            <el-table-column
              prop="name"
              label="名字"
              width="180">
            </el-table-column>

            <el-table-column
              prop="createDate"
              label="创建时间">
            </el-table-column>

            <el-table-column prop="id" label="操作" width="180%">

              <template slot-scope="scope">
                <el-button size="mini" @click="updateUser(scope.row)">修改</el-button>
                <el-button  size="mini"  type="danger" @click="deleteUser(scope.row)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>

          <el-pagination

            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-sizes="sizes"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count">

          </el-pagination>


        </div>



        <el-dialog title="用户信息修改" :visible.sync="updateUserHtml">
          <el-form ref="form" :model="updateUserForm" label-width="80px">

            <input type="hidden" v-model="updateUserForm.id">


            <el-row>
              <el-col :span="12">
                <el-form-item label="账号" prop="name">
                  <el-input v-model="updateUserForm.name"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="密码">
                  <el-input v-model="updateUserForm.password" show-password></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="12">
                <el-form-item label="生日">
                  <div class="block">
                    <el-date-picker
                      v-model="updateUserForm.createDate"
                      align="right"
                      type="date"
                      placeholder="创建日期">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item>
              <el-button type="primary" @click="updateUserFormSubmit">提交</el-button>
              <el-button @click="updateUserHtml=false">取消</el-button>
            </el-form-item>

          </el-form>
        </el-dialog>

      </div>


</template>

<script>
    export default {
        name: "User",
        data(){
            return{
              userData:[],
              count: 0,
              sizes: [2, 3, 5, 10],
              size: 5,
              //修改弹框
              updateUserHtml:false,
              //修改表单
              updateUserForm:{
                id:"",
                name:"",
                password:"",
                createDate:""
              }
            }
        },
        methods:{
          handleCurrentChange:function(page){ //跳转页面
            console.log(page);
            this.queryData(page);
          },
          handleSizeChange:function(size){ //跳转页面
            this.size=size;
            this.queryData(1);
          },
          queryData:function (page) {
            this.$ajax.get("http://localhost:8082/api/log/queryDataB?page="+page+"&size="+this.size).then(res=>{
              this.data=res.data.data;
              this.count = res.data.data.count;
            }).catch(rs=>{
              this.$message.error("出现错误");
            })

          },
          //点击修改按钮
          updateUser:function (row) {
            //清空修改弹框内容
            this.updateUserForm={};
            //给表单赋值
            this.updateUserForm = row;
            //弹框弹出
            this.updateUserHtml=true;
          },//点击修改提交按钮
          updateUserFormSubmit:function(){

            this.updateUserForm.birthday = null;
            this.updateUserForm.createDate = null;
            this.$ajax.post("http://localhost:8081/api/user/updateUser",this.$qs.stringify(this.updateUserForm)).then(res=>{

              this.$message.success("修改成功");

              this.updateUserHtml = false;

              this.queryData();
            })
          },
          deleteUser:function (row) {
            this.$ajax.get("http://localhost:8081/api/user/deleteUser?id="+row.id).then(res=> {
              this.queryData();
              this.$message.success("删除成功");
            });
          },
        },
        created:function (){
          this.queryData();
        }
    }
</script>

<style scoped>

</style>
