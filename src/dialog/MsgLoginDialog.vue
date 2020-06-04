<template>

    <van-popup
            class="msg_login"
            v-model="show"
            round
            :close-on-click-overlay="overlay"

    >
        <div class="content">

            <img class="top_img" :src="require('../assets/img/tczstb.png')"/>

            <img class="guanbi" :src="require('../assets/img/gbanicon.png')" @click="close()"/>
        </div>
        <div class="content_1">
            <span class="span_1">登录</span>
            <van-field v-model="phone_num"
                       id="edit_phone_id" placeholder="请输入安徽移动手机号" type="number"
                       oninput="if(value.length>11)value=value.slice(0,11)"
                       class="input_phone"
                       autocomplete="off"/>

            <div class="yzm_div">
                <van-field v-model="msg_num"
                           id="edit_msg_id" placeholder="请输入验证码" type="number"
                           oninput="if(value.length>11)value=value.slice(0,11)"
                           class="input_msg"
                           autocomplete="off"/>


                <van-button @click="getmsg()" :class="[ isdaojishi ? 'btn_hqyzm_dao' : 'btn_yzm' ]">{{isdaojishi ?
                    time+'秒后重新获取' : '获取验证码' }}
                </van-button>
            </div>

            <van-button class="btn_login" @click="login_commit()">登录</van-button>
        </div>

    </van-popup>
</template>
<script type="es6">

    export default {
        name: 'msglogindialog',
        props: {

            isshow: {
                type: Boolean,

                default: false,
                required: true,
            }
        },
        data () {
            return {
                overlay: false,
                show: this.isshow,
                phone_num: "",
                msg_num: "",
                msgclickable: true,
                isdaojishi: false,
                time: 60,
            }
        },
        components: {},
        activated(){


        },
        created(){


        },
        update(){

        },

        mounted() {

        },
        methods: {
            login_commit(){
                console.log("登录");
                if (this.phone_num == "") {

                    this.Toast("手机号码不能为空！");
                    return
                }
                if (this.msg_num == "") {

                    this.Toast("验证码不能为空！");
                    return
                }
                this.login_interface();


            },
            getmsg(){
                if (this.msgclickable) {
                    if (this.phone_num == "") {
                        this.Toast("手机号码不能为空！");
                        return
                    } else {
                        let self = this;
                        //调用获取验证码接口
                        self.$axios.post("/noLogin/smsVerifyCode.msp", {
                                    loginName: self.phone_num
                                })
                                .then(res => {

                                    let retcode = res.data.retcode;
                                    if (retcode == 0) {


                                        self.Toast("短信验证码下发成功！");

                                        self.msgclickable = false;
                                        let interval = setInterval(
                                                function GetRTime() {
                                                    self.time--;
                                                    if (self.time < 1) {
                                                        if (interval != '') {
                                                            clearInterval(interval);
                                                            self.msgclickable = true;
                                                            self.isdaojishi = false;
                                                            self.time = 60
                                                        }
                                                    } else {
                                                        self.isdaojishi = true;
                                                    }
                                                }
                                                , 1000)

                                    } else {
                                        let retmsg = res.data.retmsg;
                                        self.Toast(retmsg);
                                        this.msg_num = "";
                                    }
                                }).catch(error => {
                            console.log("网络异常" + error);

                        })
                    }
                }

            },
            login_interface(){
                //调用登录接口
                let self = this;
                //调用获取验证码接口
                self.$axios.post("/noLogin/codeLoginWap.msp", {
                            loginName: self.phone_num,
                            vcode: self.msg_num
                        })
                        .then(res => {

                            let retcode = res.data.retcode;
                            if (retcode == 0) {//登录成功
                                let param = [];
                                self.show = false;
                                param[0] = 1;
                                param[1] = self.phone_num;
                                self.$emit('back', param);
                            } else {
                                let retmsg = res.data.retmsg;
                                self.Toast(retmsg);

                            }
                        }).catch(error => {
                    console.log("网络异常" + error);

                })

            },
            close(){
                this.show = false;
                let param = [];
                param[0] = 0;
                param[1] = this.show
                this.$emit('back', param);

            }

        },
        watch: {
            isshow() {

                this.show = this.isshow;

            }
        }

    }
</script>
<style lang="less" scoped>
    .msg_login {
        width: 640px;
        height: 633px;
        display: block;
        position: fixed;
        background: transparent;
        border-radius: 12px;
    }

    .content {
        width: 100%;
        height: 100px;
        display: block;
        position: relative;
        z-index: 2000;
        background: transparent;
        bottom: -40px;

    .top_img {
        width: 225px;
        height: auto;
        display: block;
        position: relative;
        margin: 0 auto;

    }

    .guanbi {
        width: 31px;
        height: 31px;
        position: absolute;
        float: right;
        right: 0px;
        top: 0px;
    }

    }

    .content_1 {
        width: 640px;
        height: 533px;
        position: relative;

        background: rgba(255, 255, 255, 1);
        border-radius: 12px;

    .span_1 {
        font-size: 26px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(1, 143, 230, 1);
        line-height: 46px;
        display: block;
        position: relative;
        top: 100px;
        text-align: center;
    }

    .input_phone {
        width: 588px;
        height: 80px;
        display: block;
        position: relative;
        top: 130px;
        margin: 0 auto;
        outline: none;
        border: none;
        border: 1px solid rgba(204, 204, 204, 1);

        font-size: 28px;
        padding-top: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 46px;
        appearance: none;
        -moz-appearance: none; /* Firefox */
        -webkit-appearance: none; /* Safari 和 Chrome */
    }

    .yzm_div {
        width: 588px;
        height: 80px;
        display: block;
        position: relative;
        margin: 0 auto;
        top: 150px;
    }

    .yzm_div .input_msg {
        width: 60%;
        height: 100%;
        display: block;
        position: relative;
        margin: 0 auto;
        float: left;
        left: 0px;
        outline: none;
        border: none;
        border: 1px solid rgba(204, 204, 204, 1);

        font-size: 28px;
        padding-top: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 46px;
        appearance: none;
        -moz-appearance: none; /* Firefox */
        -webkit-appearance: none; /* Safari 和 Chrome */
    }

    .btn_yzm {
        width: 37%;
        height: 100%;
        float: right;
        right: 0rem;
        position: relative;
        display: block;

        background-color: #018FE6;
        color: white;
        font-size: 26px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 46px;
        text-align: center;
        outline: none;
        border: none;
    }

    .btn_login {
        width: 588px;
        height: 80px;
        background: rgba(1, 143, 230, 1);
        border-radius: 40px;
        display: block;
        position: relative;
        margin: 0 auto;

        color: white;
        font-size: 32px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 46px;
        text-align: center;
        outline: none;
        border: none;
        top: 190px;
    }

    .btn_hqyzm_dao {
        width: 37%;
        height: 100%;
        float: right;
        right: 0rem;
        position: relative;
        display: block;
        background-color: #c0c0c0;
        color: white;
        font-size: 26px;
        line-height: 46px;

        text-align: center;
        outline: none;
        border: none;
    }

    }
</style>
