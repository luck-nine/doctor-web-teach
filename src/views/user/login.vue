<template>
    <article>
        <el-row class="loginIndex">
            <el-col :span="12">
                <div class="login">
                    <el-form class="login-form">
                        <div class="title">
                            <img src="../../assets/logo/byyl-logo1.png" class="logo-img">
                        </div>
                        <el-form-item>
                            <el-input type="text" placeholder="请输入手机号" v-model="username">
                                <template #prefix>
                                    <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="password" placeholder="请输入密码" v-model="password">
                                <template #prefix>
                                    <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
                                </template>
                            </el-input>
                        </el-form-item>
                        <div style="width: 100%;text-align: left;">
                            <el-checkbox v-model="rememberMe" style="margin: 0 0 25px 0;" checked>记住我</el-checkbox>
                            <span class="rememberPass">
                                <a href="#">忘记密码</a>
                                <a href="#" @click.prevent="openRegisterDialog">注册</a>
                            </span>
                        </div>
                        <el-form-item style="width: 100%;">
                            <el-button
                                    @click="handleLogin"
                                    :loading="loading"
                                    type="primary"
                                    style="width: 100%;">
                                <span v-if="!loading">登录</span>
                                <span v-else>登  录  中...</span>
                            </el-button>
                        </el-form-item>
                        <el-form-item style="width: 100%;">
                            <el-button
                                    @click="getInfo"
                                    :loading="loading"
                                    type="primary"
                                    style="width: 100%;">
                                <span v-if="!loading">获得信息</span>
                                <span v-else>获  得  中...</span>
                            </el-button>
                        </el-form-item>
                        <el-form-item style="width: 100%;">
                            <el-button
                                    @click="logout"
                                    :loading="loading"
                                    type="primary"
                                    style="width: 100%;">
                                <span v-if="!loading">安全退出</span>
                                <span v-else>退  出  中...</span>
                            </el-button>
                        </el-form-item>
                        <el-radio-group v-model="agree" style="margin: 0 0 25px 0;">
                            <el-radio>同意隐私协议和服务条款</el-radio>
                        </el-radio-group>
                        <!--  底部  -->
                        <div class="el-login-footer">
                            <div>
                                <span>帮助</span>
                                <span>隐私</span>
                                <span>条款</span>
                            </div>
                            <div>Copyright@2022  白医医疗技术部出品</div>
                        </div>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="11" :offset="1">
                <el-row class="navigationRow">
                    <el-col :span="5">
                        <div class="navigationDiv">
                            <svg-icon icon-class="iconPark-classroom" class="navigationSvn"/>
                            <div class="navigationTitle">我的患者</div>
                        </div>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <div class="navigationDiv">
                            <svg-icon icon-class="stLine-cloud-upload-l" class="navigationSvn"/>
                            <div class="navigationTitle">动态心电上传</div>
                        </div>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <div class="navigationDiv">
                            <svg-icon icon-class="if-history" class="navigationSvn"/>
                            <div class="navigationTitle">接诊记录</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="navigationRow">
                    <el-col :span="5">
                        <div class="navigationDiv">
                            <svg-icon icon-class="iconPark-flash-payment" class="navigationSvn"/>
                            <div class="navigationTitle">极速问诊</div>
                        </div>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <div class="navigationDiv">
                            <svg-icon icon-class="iconPark-pesticide" class="navigationSvn"/>
                            <div class="navigationTitle">药械商城</div>
                        </div>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <div class="navigationDiv">
                            <svg-icon icon-class="iconPark-bookshelf" class="navigationSvn"/>
                            <div class="navigationTitle">学习交流</div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="navigationRow">
                    <el-col :span="5">
                        <div class="navigationDiv">
                            <svg-icon icon-class="antOutline-control" class="navigationSvn"/>
                            <div class="navigationTitle">慢病管理</div>
                        </div>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <div class="navigationDiv">
                            <svg-icon icon-class="antOutline-insurance" class="navigationSvn"/>
                            <div class="navigationTitle">保险套餐</div>
                        </div>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <div class="navigationDiv">
                            <svg-icon icon-class="md-chevron_right" class="navigationSvn"/>
                            <div class="navigationTitle">下一页</div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-dialog
                v-model="dialogVisible"
                title="用户注册"
                width="30%"
                :close-on-click-modal="false"
                :append-to-body="true"
                :before-close="handleClose">
            <el-row>
                <el-form :model="form" label-width="120px" ref="addForm" :rules="rules">
                    <el-form-item label="手机号" prop="username">
                        <el-input type="text" placeholder="请输入手机号" v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input type="password" placeholder="请输入密码" v-model="form.confirmPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input type="text" placeholder="请输入姓名" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input type="text" placeholder="请输入地址" v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照" prop="businessLicense">
                        <el-upload
                                ref="uploadRef"
                                class="upload-demo"
                                action="#"
                                :auto-upload="true"
                                :http-request="requestUpload"
                                :limit="1"
                                :on-remove="handleRemove"
                                :before-upload="beforeUpload">
                            <template #trigger>
                                <el-icon :size="20">
                                    <Plus />
                                </el-icon>
                            </template>
                            <!-- 显示图片的样式 -->
                            <div v-if="options.businessLicenseImg">
                                <img :src="options.businessLicenseImg" width="100" height="100">
                            </div>
                            <template #tip>
                                <div class="el-upload__tip">
                                    只能上传jpg/png图片 文件大小不能超过2M
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="营业执照" prop="businessLicense">
                        <el-input type="text" placeholder="请选择营业执照" v-model="form.businessLicense" class="form-el-input"></el-input>
                    </el-form-item>
                    <el-form-item label="医师证书" prop="certificate">
                        <el-input type="text" placeholder="请选择医师证书" v-model="form.certificate" class="form-el-input"></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button type="primary" @click="handleRegister">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </article>
</template>

<script>
    import { login,list,logout } from '@/api/login'
    import { setToken,removeToken } from '@/utils/auth'
    import { validatePhone } from '@/utils/validate'
    import { register } from '@/api/localDoctor'
    import { materialsUpload } from '@/api/common'
    import { ElMessage } from 'element-plus'
    export default {
        name: "loginIndex",
        data(){
            // 写代码
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                  if (this.form.confirmPassword !== '') {
                      //this.$refs["addForm"]
                      this.$refs.addForm.validateField('confirmPassword');
                  }
                  callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致！'));
                } else {
                    callback();
                }
            };
            return{
                options: {
                    businessLicenseImg: undefined,
                    certificateImg: undefined
                },
                rules: {
                    username: [
                        {required: true, message: "请输入用户名"},
                        {validator: validatePhone, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: 'blur'},
                        {min: 6, max: 16, message: "长度在6到16个字符", trigger: 'blur'},
                        {validator: validatePass, trigger: "blur"}
                    ],
                    confirmPassword: [
                        {required: true, message: "请确认密码", trigger: 'blur'},
                        {min: 6, max: 16, message: "长度在6到16个字符", trigger: 'blur'},
                        {validator: validatePass2, trigger: "blur"}
                    ],
                    name: [
                        {required: true, message: "请输入真实姓名"}
                    ],
                    address: [
                        {required: true, message: "请输入地址"}
                    ],
                },
                form: {
                    username: undefined,
                    password: undefined,
                    confirmPassword: undefined,
                    name: undefined,
                    address: undefined,
                    businessLicense: undefined,
                    certificate: undefined
                },
                dialogVisible: false,
                username: "",
                password: "",
                rememberMe: false,
                loading: false,
                agree: false
            }
        },
        methods: {
            // 上传预处理
            beforeUpload(file){
                console.log("上传前的处理 验证图片格式大小  如果想让图片正常执行 return true    不满足验证 return false");
                console.log(file);
                let isLt2M = file.size / 1024 /1024 < 5;
                if(!isLt2M){
                    ElMessage({
                        showClose: true,
                        message: "上传图片或视频大小不能超过2MB！",
                        type: 'error',
                        duration: 5 * 1000
                    })
                    return false;
                }
                // 验证是否是图片
                if (file.type.indexOf("image/") == -1) {
                    ElMessage({
                        showClose: true,
                        message: "文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。",
                        type: 'error',
                        duration: 5 * 1000
                    })
                    return false;
                } else {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    console.log(reader,"reader");
                    reader.onload= () => {
                        this.options.businessLicenseImg = reader.result;
                    };
                    return true;
                }
            },
            // 图片移除
            handleRemove(param){
                console.log("文件移除");
                console.log(param);
                this.options.businessLicenseImg = undefined;
            },
            // 覆盖默认的上传行为
            requestUpload(param){
                console.log("文件上传");
                console.log(param);
                // 保存该文件
                this.form.businessLicense = param.file;
            },
            async handleRegister(){
                /*this.$refs["addForm"].validate(valid=>{
                    console.log(valid);
                    if(valid){
                        console.log("diaoyong");
                        register(this.form).then(response=>{
                            if(response.code==200){
                                ElMessage({
                                    showClose: true,
                                    message: "注册成功",
                                    type: 'success'
                                })
                                // 关闭
                                this.handleClose();
                            }
                        }).catch(err=>{
                            console.log(err);
                        }).finally(()=>{

                        });
                    }
                });*/

                /*const formData = new FormData()
                formData.append('file',this.form.businessLicense);
                console.log(formData);
                console.log(this.form.businessLicense);
                materialsUpload(formData).then(response=>{
                    console.log("上传完毕后的回调");
                    console.log(response);
                });*/

                /*let valid = await this.$refs["addForm"].validate(valid=>{});
                // 如果验证通过
                if(valid){
                    // 文件上传
                    const formData = new FormData()
                    formData.append('file',this.form.businessLicense);
                    console.log(formData);
                    console.log(this.form.businessLicense);
                    let businessLicensePath = await materialsUpload(formData).then(response=>{
                        console.log("上传完毕后的回调");
                        console.log(response);
                        return response.data;
                    }).catch(err=>{
                        console.log(err);
                    }).finally(()=>{});

                    this.form.businessLicensePath = businessLicensePath;
                    console.log("注册接口调用");
                    register(this.form).then(response=>{
                        if(response.code==200){
                            ElMessage({
                                showClose: true,
                                message: "注册成功",
                                type: 'success'
                            })
                            // 关闭
                            this.handleClose();
                        }
                    }).catch(err=>{
                        console.log(err);
                    }).finally(()=>{

                    });
                }*/


                this.$refs["addForm"].validate(valid=>{
                    console.log(valid);
                    if(valid){
                        console.log("diaoyong");
                        // 上传文件加到form中
                        // 文件上传
                        const formData = new FormData()
                        // 两张图片
                        formData.append('businessLicense',this.form.businessLicense);
                        formData.append('certificate',this.form.businessLicense);
                        // 表单数据
                        formData.append('username',this.form.username);
                        formData.append('password',this.form.password);
                        formData.append('name',this.form.name);
                        formData.append('address',this.form.address);
                        console.log(formData);
                        register(formData).then(response=>{
                            console.log(response);
                            if(response.code==200){
                                ElMessage({
                                    showClose: true,
                                    message: "注册成功",
                                    type: 'success'
                                })
                                // 关闭
                                this.handleClose();
                                // 重置表单
                                this.$refs["addForm"].resetFields();
                                // 重置上传组件
                                this.resetUpload();
                            }
                        }).catch(err=>{
                            console.log(err);
                        }).finally(()=>{

                        });
                    }
                });
            },
            resetUpload(){
                // 上传组件重置
                this.$refs.uploadRef.clearFiles();
                this.options.businessLicenseImg = undefined
                this.options.certificateImg = undefined
            },
            handleClose(){
                this.dialogVisible = false;
                // 重置表单
                this.$refs["addForm"].resetFields();
                // 重置上传组件
                this.resetUpload();
            },
            openRegisterDialog(){
                this.dialogVisible = true;
                // 重置表单
                this.$refs["addForm"].resetFields();
            },
            handleLogin(){
                console.log("username="+this.username);
                console.log("password="+this.password);
                login(this.username,this.password).then(response=>{
                    console.log('登录验证完成后，返回的结果')
                    console.log(response)
                    if(response.code == 200){
                        //登录成功
                        //存token
                        setToken(response.token)
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            getInfo(){
                list().then(response=>{
                    console.log('获得商品测试数据')
                    console.log(response);
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            logout(){
                logout().then(response=>{
                    console.log('用户退出')
                    console.log(response);
                    if(response.code==200){
                        // 移除cookie token
                        removeToken();
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .loginIndex{
        border: 1px solid #C3C3C3;
    }
    article{
        padding: 10px;
    }
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-size: cover;
        border: 1px solid #D4D4D4;
        width: 100%;
    }
    .login-form {
        border-radius: 6px;
        background: #ffffff;
        width: 400px;
        padding: 25px 25px 5px 25px;
    }
    .login-form .input-icon {
        height: 10px;
        width: 10px;
        margin-left: 2px;
        font-size: 14px;
        margin-top: 10px;
    }
    .login-form .el-input {
        height: 38px;
    }

    .login-form .el-input input {
        height: 38px;
    }
    .login-form .title {
        margin: 0 auto 30px auto;
        text-align: center;
        color: #707070;
    }

    .login-form .title .logo-img {
        width: 200px;
    }
    .login-form .rememberPass {
        font-size: 14px;
        float: right;
    }
    .login-form .rememberPass a{
        color: #409EFF;
        text-decoration: none;
        margin-left: 10px;
    }
    .login-form .el-login-footer {
        margin: 50px 0;
        height: 40px;
        width: 100%;
        text-align: center;
        font-family: Arial;
        font-size: 12px;
        letter-spacing: 1px;
    }
    .login-form .el-login-footer div {
        padding-bottom: 10px;
    }
    .login-form .el-login-footer div span {
        margin-right: 20px;
    }

    .navigationRow {
        margin-bottom: 20px;
    }
    .navigationDiv {
        text-align: center;
        background-color: white;
        height: 150px;
        padding-top: 10px
    }

    .navigationDiv .navigationSvn {
        font-size: 100px;
        line-height: 150px;
    }

    .navigationDiv .navigationTitle {
        font-size: 20px;
        font-weight: bold;
        color: #5B5B5B;
        padding-top: 10px;
    }
</style>