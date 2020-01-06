<style>
    #index {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        /*background: url({{imgurl}}) no-repeat;*/
        /*:style="{backgroundImage: 'url('+ img +')'，backgroundSize:cover }"*/
        color: #2c3e50;
        margin-top: 20px;
    }
    
    .b {
        height: 557px;
        padding-top: 40px;
    }
    
    .loading-wrapper {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: #aedff8;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
<template>
    <div id="index" :style="{backgroundImage: 'url(' + imgurl + ')' }">
        <div class="loading-wrapper" v-show="showLoading">
            <Loading></Loading>
        </div>
        <div class="b">
            <h1>{{msg}}</h1>

            <i-button type="text" @click="modal1=true"> 登录</i-button>

            <Modal v-model="modal1" title="使用手机登录" @on-ok="login" @on-cancel="cancel">

                <i-input placeholder="手机号码" clearable v-model="user.phone" number:true maxlength:11> </i-input>
                <i-input placeholder="密码" type="password"  clearable v-model="user.pwd" style="margin-top:10px"></i-input>
                <Button @click="modal2=true;modal1 =false" type="text">没有用户？去注册</Button>
            </Modal>
            <Modal v-model="modal2" title="手机注册" @on-ok="register" @on-cancel="$Message.info('取消注册')">
                <Input placeholder="手机号码" clearable v-model="rgPhone" @on-blur="rg_input_blur"></Input>
                <Input placeholder="昵称" clearable v-model="name" style="margin-top:10px"></Input>
                <Input placeholder="输入密码" clearable type="password" password clear v-model="rgPassword" style="margin-top:10px"></Input>
                <Input placeholder="确认密码" clearable password type="password" v-model="reRgPassword" @on-blur="rg_input_pwd_blur" style="margin-top:10px"> </Input>
            </Modal>
        </div>
    </div>

</template>
<script>
    import Loading from '@/components/Loading.vue'
    import { login } from '@/request/api'; // 导入自定义api接口

    var phone2 = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; //校验电话号
    export default {
        components: {
            Loading
        },
        data() {
            return {
                msg: 'do somthing',
                modal1: false, //登录modal
                modal2: false,// 注册modal
                user: { // 登录用户
                    phone: '',
                    pwd: '',
                },
                rgPhone: '', // 注册电话
                name: '',
                rgPassword: '', //注册密码
                reRgPassword: '',
                isPhone: true, //电话格式正确？
                isPwdEquls: true,// 密码相同？
                imgurl: 'http://chuantu.xyz/t6/710/1578289233x2890211686.jpg',
                showLoading: true, // 显示loading

            }
        },
        mounted() {
            let bgImg = new Image()
            bgImg.src = this.imgurl // 获取背景图片的url
            bgImg.onerror = () => {
                console.log('img onerror')
            }
            bgImg.onload = () => { // 等背景图片加载成功后 去除loading
                this.showLoading = false
            };

        },
        methods: {

            login() {
                if (this.user.phone.length == 11 && (phone2.test(this.user.phone))) {
                    this.user.pwd = this.$md5(this.user.pwd);
                    console.log('md5----'+JSON.stringify(this.user))
                    // login(this.user).then(res => {
                    //     log.info('登录成功')
                    //     // this.$router.push('/dosomething/sport')
                    //     this.$Message.info('登录成功')
                    // },err=>{
                        
                    // })
                    this.$post('/users', this.user).then(res => {
                        // ...
                        console.log('..login'+JSON.stringify(res))
                        if(res.code==200){
                            this.$router.push('/dosomething/book')
                        }else{
                            this.$Message.error(res.msg)
                        }
                    },err=>{})
                } else {
                    this.modal1 = true;
                    this.$Message.error('请输入正确格式的电话号码')
                }
            },
            cancel() {
                this.$Message.info("取消登录")
            },
            // 注册
            register() {
                if (!this.isPhone) {
                    this.$Message.error('请输入正确格式的手机号码');
                    this.modal2 = true;
                    return
                } else if (!this.isPwdEquls) {
                    this.$Message.error('密码不一致')
                    this.modal2 = true;
                    return
                }
                //todo 调用后台注册 md5 pwd
                var user = {
                    'name': this.name,
                    'pwd': this.pwd,
                    'phone': this.phone
                };

                this.$Message.info("注册成功")
            },
            //md5 str
            md5(str) {
                return this.$md5(str);
            },

            rg_input_blur() {
                if (!(this.phone.length == 11 && (phone2.test(this.phone)))) {
                    this.$Message.error('请输入正确格式的手机号码');
                    this.isPhone = false;
                }
            },
            rg_input_pwd_blur() {
                if (!this.rgPassword === this.reRgPassword) {
                    this.isPwdEquls = false;
                    this.$Message.error('两次密码不同')
                }
            },
            notice(notcie) {
                this.$Notice.open({
                    title: '今天待做',
                    desc: '!!' + notice
                })
            }


        }

    }

</script>