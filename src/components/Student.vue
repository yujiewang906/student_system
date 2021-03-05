<template>


  <div>
        <div id="studentTable">

          <el-table
            :data="studentData"
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
              prop="sex"
              label="性别"
              :formatter="fmtDel"
            >
            </el-table-column>

            <el-table-column
              prop="birthday"
              label="生日">
            </el-table-column>

            <el-table-column
              prop="score"
              label="分数"
              width="120">
            </el-table-column>


            <el-table-column prop="id" label="操作" width="180%">

              <template slot-scope="scope">
                <el-button size="mini" @click="updateStudent(scope.row)">修改</el-button>
                <el-button  size="mini"  type="danger" @click="deleteStudent(scope.row)">删除</el-button>
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



    <!--新增弹框-->
    <el-dialog title="录入属性信息" :visible.sync="addOrUpdateFormFlag">
      <!--rules用于验证表单-->
      <el-form :model="addOrUpdateStudentForm" ref="addStudentForm" :rules="rule"  label-width="80px">

        <el-input type="hidden" v-model="addOrUpdateStudentForm.id"/>

        <el-form-item label="属性名称" prop="name">
          <el-input v-model="addOrUpdateStudentForm.name" autocomplete="off" ></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="addOrUpdateStudentForm.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <el-radio :label="2">未知</el-radio>
          </el-radio-group>
        </el-form-item>

          <el-col :span="12">
            <el-form-item label="生日">
              <div class="block">
                <el-date-picker
                  v-model="addOrUpdateStudentForm.birthday"
                  align="right"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>

        <!--<el-form-item label="属性中文名" prop="nameCH">
          <el-input  v-model="addStudentForm.nameCH"></el-input>
        </el-form-item>
-->
        <el-form-item label="学生爱好">
          <el-checkbox-group
            v-model="hobby"
            :min="1"
            :max="3">
            <el-checkbox v-for="hobby in hobbys" :label="hobby" :key="hobby">{{hobby}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="分数" prop="score">
          <el-input v-model="addOrUpdateStudentForm.score" autocomplete="off" ></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addOrUpdateFormFlag = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateStudentSubmit">确 定</el-button>
      </div>

    </el-dialog>





  </div>
</template>

<script>
    export default {
        name: "Student",
      data(){
        return{
          studentData:[],
          count: 0,
          sizes: [2, 3, 5, 10],
          size: 5,
          //修改弹框
          addOrUpdateFormFlag:false,
          //修改表单
          addOrUpdateStudentForm:{
            id:"",
            name:"",
            sex:"",
            birthday:"",
            hobby:"",
            score:""
          },
            //爱好
            hobbys:[]
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
          this.$ajax.get("http://localhost:8082/api//queryData?page="+page+"&size="+this.size).then(res=>{
            this.data=res.data.data;
            this.count = res.data.count;
          }).catch(rs=>{
            this.$message.error("出现错误");
          })

        },
        //点击修改按钮
        updateStudent:function (row) {
          //清空修改弹框内容
          this.addOrUpdateStudentForm={};
          //给表单赋值
          //回显爱好弹框
          var isHobby = this.addOrUpdateStudentForm.hobby.split(",");
          row.hobby = isHobby;
          this.addOrUpdateStudentForm = row;
          //弹框弹出
          this.addOrUpdateFormFlag=true;
        },//点击修改或者提交按钮
        addOrUpdateStudentSubmit:function(){
            if (this.addOrUpdateStudentForm.id!=null&&this.addOrUpdateStudentForm.id!=""){
                //id 不为空是修改
                this.$ajax.post("http://localhost:8081/api//updateStudent",this.$qs.stringify(this.addOrUpdateStudentForm)).then(res=>{
                  this.$message.success("修改成功");
                  this.addOrUpdateFormFlag = false;
                  this.queryData();
              }).catch(rs=>{
                  this.$message.error("出现错误");
                })
            }else{
                //否则是新增
              this.$ajax.post("http://localhost:8081/api//addStudent",this.$qs.stringify(this.addOrUpdateStudentForm)).then(res=>{
                this.$message.success("新增成功");
                this.addOrUpdateFormFlag = false;
                this.queryData();
              }).catch(rs=>{
                this.$message.error("出现错误");
              })

            }
        },
        deleteStudent:function (row) {
          this.$ajax.get("http://localhost:8081/api//deleteStudent?id="+row.id).then(res=> {
            this.queryData(1);
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
