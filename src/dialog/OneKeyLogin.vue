<template>
    <van-popup
            class="msg_login"
            v-model="show"
            round
            :close-on-click-overlay="overlay"

    >
        <div class="content">
            <span class="span_1">确认用号码<br/>{{phonenum}}<br/>登录？</span>
            <van-button class="btn_cansel" @click="cansel()">其他号码</van-button>
            <van-button class="btn_ok" @click="ok()">确定</van-button>
        </div>
    </van-popup>

</template>
<script type="es6">

    export default {
        name: 'loading',
        data () {
            return {
                overlay: false,
                show: false,
                phonenum: "",
                baseurl: "https://a.ahwxcs.com/wap",
                base64EncodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                base64DecodeChars: new Array(
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
                        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
                        -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
                        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1)
            }
        },
        props: {},
        mounted() {
            var sign = YDRZ.getSign("300011938501", "1.2");     //请注意2个参数之间的顺序，


            console.log(sign);
            this.get_RsaSign(sign);
        },
        methods: {
            cansel(){
                let param = [];
                param[0] = 2;//0:取号失败；1：取号成功 ;2 :其他号码
                param[1] = ""
                this.show = false;
                this.$emit('back', this.show);
            },
            ok(){
                this.onekeylogin_interface();

            },

            base64encode(str){
                var out, i, len;
                var c1, c2, c3;
                len = str.length;
                i = 0;
                out = "";
                while (i < len) {
                    c1 = str.charCodeAt(i++) & 0xff;
                    if (i == len) {
                        out += base64EncodeChars.charAt(c1 >> 2);
                        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                        out += "==";
                        break;
                    }
                    c2 = str.charCodeAt(i++);
                    if (i == len) {
                        out += base64EncodeChars.charAt(c1 >> 2);
                        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                        out += "=";
                        break;
                    }
                    c3 = str.charCodeAt(i++);
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                    out += base64EncodeChars.charAt(c3 & 0x3F);
                }
                return out;

            },
            base64decode(str){
                var c1, c2, c3, c4;
                var i, len, out;
                len = str.length;
                i = 0;
                out = "";
                while (i < len) {
                    /* c1 */
                    do {
                        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                    } while (i < len && c1 == -1);
                    if (c1 == -1)
                        break;
                    /* c2 */
                    do {
                        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                    } while (i < len && c2 == -1);
                    if (c2 == -1)
                        break;
                    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                    /* c3 */
                    do {
                        c3 = str.charCodeAt(i++) & 0xff;
                        if (c3 == 61)
                            return out;
                        c3 = base64DecodeChars[c3];
                    } while (i < len && c3 == -1);
                    if (c3 == -1)
                        break;
                    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                    /* c4 */
                    do {
                        c4 = str.charCodeAt(i++) & 0xff;
                        if (c4 == 61)
                            return out;
                        c4 = base64DecodeChars[c4];
                    } while (i < len && c4 == -1);
                    if (c4 == -1)
                        break;
                    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
                }
                return out;

            },
            get_RsaSign(sign){
                let self = this;
                self.$axios.post("/noLogin/getEncrypts.msp", {
                            sign: sign
                        })
                        .then(res => {
                            var retcode = res.data.retcode;
                            if (retcode == 0) {
                                var sign1 = self.base64decode(res.data.sign);
                                console.log("RSA加密后的sign：" + sign1);

                                //获取token
                                YDRZ.getTokenInfo({
                                    data: {//请求的参数
                                        version: '1.2', //接口版本号 （必填）
                                        appId: '300011938501', //应用Id （必填）
                                        sign: sign1,//RSA加密后的sign（必填）
                                        openType: 1, //移动取号接口填写1,三网取号接口填写0 （必填，联调时必须填写为1）
                                        expandParams: '',
                                        //expandParams: 'phoneNum=18225517618',//扩展参数  格式：参数名=值  多个时使用 | 分割（选填，联调环境只能模拟取号，联调时需填写phoneNum=188185*****  手机号可以随便填写，生产可不填）
                                        isTest: "",//是否启用测试线地址（传0时为启用不为0或者不传时为不启用）
                                    },
                                    success: function (res) {//成功回调
                                        console.log("token=" + res.token + " res.userInformation=" + res.userInformation);
                                        self.checkToken(res.token, self.base64encode(res.userInformation));
                                    },
                                    error: function (res) {//错误回调
                                        console.log(res);
                                        let param = [];
                                        param[0] = 0;//0:取号失败；1：登录成功 ;2 :其他号码
                                        param[1] = "";
                                        self.show = false;
                                        self.$emit('back', param);
                                    }
                                });


                            } else {
                                let param = [];
                                param[0] = 0;//0:取号失败；1：登录成功 ;2 :其他号码
                                param[1] = "";
                                self.show = false;
                                self.$emit('back', param);
                            }
                        }).catch(error => {
                    console.log("网络异常" + error);

                })


            },
            checkToken(token, userInformation){
                let self = this;
                self.$axios.post("/noLogin/newCheckToken.msp", {
                            token: token,
                            userInformation: userInformation
                        })
                        .then(res => {
                            console.log(res.data);
                            var retcode = res.data.retcode;
                            if (retcode == 0) {
                                var retdata = res.data.retdata;
                                var phonenum = retdata.username;

                                self.phonenum = phonenum;
                                self.show = true;


                            } else {
                                let param = [];
                                param[0] = 0;//0:取号失败；1：登录成功 ;2 :其他号码
                                param[1] = '';
                                self.show = false;
                                self.$emit('back', param);
                            }


                        }).catch(error => {
                    console.log("网络异常" + error);

                })


            },
            onekeylogin_interface(){
                let self = this;
                self.$axios.post("/noLogin/unifyOneKeyLogin.msp", {})
                        .then(res => {
                            console.log(res.data);
                            var retcode = res.data.retcode;
                            if (retcode == 0) {
                                let param = [];
                                param[0] = 1;//0:取号失败；1：登录成功 ;2 :其他号码
                                param[1] = self.phonenum;
                                self.show = false;
                                self.$emit('back', param);

                            } else {

                                let retmsg = res.data.retmsg;
                                self.Toast(retmsg);
                            }


                        }).catch(error => {
                    console.log("网络异常" + error);

                })

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
        height: 250px;
        display: block;
        position: fixed;
        background: transparent;
        border-radius: 12px;
    }

    .content {
        width: 100%;
        height: 100%;
        background-color: white;
        padding: 30px;
        border-radius: 12px;
    }

    .span_1 {
        width: 100%;
        height: auto;
        display: block;
        position: relative;
        text-align: center;
        font-size: 30px;
        line-height: 30px;
        margin-bottom: 30px;
    }

    .btn_cansel {
        width: 180px;
        height: 50px;
        position: relative;
        background-color: #a0a0a0;
        font-size: 26px;
        line-height: 30px;
        margin-right: 90px;
        color: white;
        text-align: center;
        border-radius: 12px;
    }

    .btn_ok {
        width: 180px;
        height: 50px;
        position: relative;
        background-color: rgba(1, 143, 230, 1);
        font-size: 26px;
        line-height: 30px;
        color: white;
        text-align: center;
        border-radius: 12px;
    }

    @keyframes changDeg {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>
