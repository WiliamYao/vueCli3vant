<template>
    <div ref="detailX" class="detailX" id="detailXid">
        <div v-for="(item,index) in detailXList" v-bind:key='index'>
            <!-- 设计需求 -->
            <div>
                <!-- {{item.list.name}} -->
                <van-collapse v-model="activeNames" accordion v-if="item.flag==1">
                    <van-collapse-item  :name="index">
                        <div slot="title">{{item.workDemand.createTime}} {{item.title}}</div>
                        <ul class="contentBox">
                            <li>
                                <p class="title">需求创建人</p>
                                <p class="name" @click="openGotop">{{item.creatorUser}}</p>
                            </li>
                            <li>
                                <p class="title">需求名称{{item.workDemand.demandTypeName}}</p>
                            </li>
                            <li>
                                <p class="title">需求类型</p>
                                <p class="text">{{item.workDemand.demandTypeName}}</p>
                            </li>
                            <li>
                                <p class="title">需求描述</p>
                                <p class="text">{{item.workDemand.demandDes}}</p>
                            </li>
                            <li>
                                <p class="title">需求广告位位置或尺寸</p>
                                <p class="text">{{item.workDemand.demandDes}}</p>
                            </li>
                            <li>
                                <p class="title">风格要求</p>
                                <p class="text">{{item.workDemand.styleDes}}</p>
                            </li>
                            <li>
                                <p class="title">备注提醒</p>
                                <p class="text">{{item.workDemand.remarks}}</p>
                            </li>
                            <li>
                                <p class="title">期望完成时间</p>
                                <p class="text">{{item.workDemand.expectTime}}</p>
                            </li>
                            <li>
                                <p class="title">指派</p>
                                <p class="text">{{item.workDemand.designerName}}</p>
                            </li>
                        </ul>
                    </van-collapse-item>
                </van-collapse>
            </div>
            <!-- <div v-if="item.flag==2">
                {{item.lists.name}}
            </div> -->
            <!-- 设计成品 -->
            <div v-if="item.flag==3">
                <!-- {{item.listz.name}} -->
                <van-collapse v-model="activeNames" accordion>
                    <van-collapse-item v-for="(item,index) in detailXList" v-bind:key='index' :name="index">
                        <div slot="title">{{item.title}}</div>
                        <ul class="contentBox">
                            <li>
                                <p class="title">UI设计师</p>
                                <p class="name" @click="openGotop(itme.creatorId)">{{item.handlerUser}}</p>
                            </li>
                            <li>
                                <p class="title">设计情况<i class="sart">*</i></p>
                                <!-- <p class="text">链接：{{item}}</p> -->
                                <p class="text">提取码：111</p>
                                <!-- {{item.workDesign.designDes}} -->
                            </li>
                            <li>
                                <p class="title">输出物</p>
                                <p class="text" v-for='(item2,index) in item.fileList' v-bind:key="index">{{ item2.description }}</p>
                                <p></p>
                            </li>
                        </ul>
                    </van-collapse-item>
                </van-collapse>
            </div>
            <div v-if="item.flag==4">
                
            </div>
            <div class="btnBox" v-if="designerbtn">
                <van-button type="info" class="btn btn-l" @click="zhuandesignBtn(item.workDemand.demandId,item.handlerId)">转派</van-button>
                <!-- {{item.workDemand}} -->
                <van-button type="info" class="btn" @click="designBtn(item.workDemand.demandId,item.workDemand.designerId,item.handlerId)">提交设计</van-button>
            </div>
            <div class="btnBox" v-if="createrbtn">
                <van-button type="info" class="btnX" @click="inspect(item.workDemand.demandId,item.workDemand.designerId,item.handlerId)">验收</van-button>
            </div>
        </div>
        

        <!-- 遮罩层 -->
        <div class="coverBox" :class="{ 'coverBoxs': isCover }" @click="closeGotop"></div>
        <div class="GotopBox" :class="{ 'GotopBoxAnimate': isActive }">
            <ul class="titleBox">
                <li class="cancle" @click="closeGotop">取消</li>
                <!-- ？需求创建 -->
                <li>UI设计师</li>
                <li class="opration" v-if="operatorType">
                    <i class="iconadd">+</i>
                    <!-- @click="goXQ" -->
                    <div class='text' @click="goXQ(item.workDemand.demandId,item.handlerId)">
                        创建需求
                    </div>
                </li>   
                <li class="opration" v-else>
                    <i class="iconadd"></i>
                    <div class='text' @click="isActive = false;isCover=false">
                        确定
                    </div>
                </li>
                <div class='text' @click="isActive = false" v-else>
                        确定
                    </div>
            </ul>
            <ul class="contextList">
                <li>
                    <div class="f-fl name">部门</div>
                    <div class="f-fl tail">{{departMent}}</div>
                </li>
                <li>
                    <div class="f-fl name">姓名</div>
                    <div class="f-fl tail">{{departName}}</div>
                </li>
                <li>
                    <div class="f-fl name">手机号</div>
                    <div class="f-fl tail">{{departtelphone}}</div>
                    <div class="telBox f-fl">
                        <div class="img-box icon">
                            <img src="../assets/glpt_bdsjhicon.png" alt="" srcset="">
                        </div>
                    </div>
                </li>
                <li>
                    <div class="f-fl name">邮箱</div>
                    <div class="f-fl tail">
                        <input type="text" :value="departEmail" readonly="readonly" id="copyObj">
                    </div>
                    <div class="telBox f-fl" @click="CopyUrl">
                        <div class="img-box icon">
                            <img src="../assets/glpt_fzyxicon.png" alt="" srcset="">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="es6">
import Vue from 'vue';
//import { Tab, Tabs, Calendar, ,  } from 'vant';
import { Collapse, CollapseItem,Toast,Button  } from "vant"

Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Toast);
Vue.use(Button);

    export default {
        name: 'home',
        props: {},
        data () {
            return {
                activeNames: ['1'],
                activeName: '1',
                isActive:false,
                isCover:false,
                detailXList:'',
                tetle:['text'],
                workDemand:false, // 页面需求成品
                workDesign:false,  // 页面设计成品
                aList:[
                    {
                        flag:1,
                        list:{
                            name:'倒霉事'
                        }
                    },
                    {
                        flag:3,
                        listz:{
                            name:'做这种'
                        }
                    },
                    {
                        flag:2,
                        lists:{
                            name:'转派'
                        }
                    }
                ],
                demandId:'' ,// 从链接获取的id
                designerbtn: false, // 设计师按钮
                createrbtn:false, // 创建者按钮
                departMent:'', // 部门名称
                departName:'', // 部门姓名
                departtelphone:'' ,// 部门手机号
                departEmail:'',
                operatorType:false,  //  可操作人身份，1需求创建者，2设计师，0任何人不可操作
                desid:''
            }
        },
        components: {
        },
        created(){
            
        },
        mounted() {
            this.demandId = this.GetQueryString("demandId");
            // var self = this
            // self.$axios.get('work_getCreatorWorkList.msp', {
            //     start:'0',
            //     limit:'10',
            //     flag:'3'
            // })
            // .then(function (res) {
            //     console.log('接口数据')
            //     console.log(res)
                
            //     self.list = res.data.data
            //     //self.loading = false;
            //     self.finished = true;
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
            this.getRouterData()
            this.getUserInfo()
        },
        activated() {
            this.getRouterData()
        },
        methods: {
            // 验收
            inspect(demandId,userId){
               window.location.href = "https://www.ahwxcs.com/wap/publish/wap/resource/noLogin/H5/planb/inspect.html?demandId="+demandId+'&designId='+this.desid +'&userId='+userId
            },
            // 创建需求
            goXQ(demandId,userId){
                window.location.href = "https://www.ahwxcs.com/wap/publish/wap/resource/noLogin/H5/planb/edit.html?demandId="+demandId+'&userId=' + userId
            },
            // 提交设计
            designBtn(demandId,userId){
                window.location.href = "https://www.ahwxcs.com/wap/publish/wap/resource/noLogin/H5/planb/Submit.html?demandId="+demandId+'&designId='+this.desid+'&userId='+userId
            },
            // 转派
            zhuandesignBtn(demandId,userId){
                window.location.href = "https://www.ahwxcs.com/wap/publish/wap/resource/noLogin/H5/planb/Forward.html?demandId="+demandId+'&userId='+userId
            },
            GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return decodeURI(r[2]);
                return null;
            },
            openGotop(id){
                this.isActive = true
                this.isCover = true
                this.getUserInfo(id)
            },
            closeGotop(){
                this.isActive = false
                this.isCover = false
            },
            CopyUrl(){
                let url = document.querySelector('#copyObj');
                url.select(); // 选择对象
                document.execCommand("Copy");
                Toast({
                    message: '复制成功',
                    position: 'bottom'
                });
            },
            onLoad(id) {
                var self = this
                self.$axios.post('ui_getDemandInfo.msp', {
                    demandId: id
                })
                .then(function (res) {
                    if(res.data.retcode==0){
                        // console.log(res)
                        console.log('当前创建者状态detailXList')
                        console.log(res)
                        self.desid = res.data.designId
                        // alert(self.desid)
                        self.detailXList = res.data.retdata;
                        console.log(self.detailXList)
                        // workDemand需求状态 state（0草稿，1设计中，2设计完成，3验收通过，4验收不通过
                        // 当前用户角色为设计师并且正在设计中
                        if(res.data.operatorFlag==0){
                            self.designerbtn = false // 设计师按钮组
                            self.createrbtn = false // 创建者按钮组
                        }
                        if(res.data.operatorFlag==1){
                            self.designerbtn = true // 设计师按钮组
                            self.createrbtn = false // 创建者按钮组
                            self.operatorType = false // 打开底部弹窗时确认是否使用分配需求
                        }
                        if(res.data.operatorFlag==2){ // 需求创建者，不能进行操作
                            self.designerbtn = false
                            self.createrbtn = true
                            self.operatorType = true // 打开底部弹窗时确认是否使用分配需求
                        }
                    }else{
                        // Toast({
                        //     message: res.data.retmsg,
                        //     position: 'bottom'
                        // });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getUserInfo(id){
                var self = this
                self.$axios.get('ui_getUserInfo.msp', {
                    userId:id
                })
                .then(function (res) {
                    console.log('个人接口数据')
                    console.log(res)
                    self.departMent = res.data.retdata.departName
                    self.departName = res.data.retdata.userName
                    self.departtelphone = res.data.retdata.mobile
                    self.departEmail =  res.data.retdata.email
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getRouterData() {
                // console.log('需求详情id')
                if(this.$route.query.demandId == '' || this.$route.query.demandId == undefined){
                    // console.log('需求id')
                    // console.log(this.designerId)
                    // this.onLoad(this.demandId)
                    // this.demandId
                    this.onLoad(this.demandId)
                }else{
                    // console.log('路由id')
                    // console.log(this.$route.query.demandId)
                    this.onLoad(this.$route.query.demandId)
                }
            },
        },
        destroyed(){
            
        }
    }
</script>

<style lang='less'>
.detailX{
    .f-fl{
        float: left;
    }
    .f-fr{
        float: right;
    }
    .btnBox{
        width: 100%;
        overflow: hidden;
        padding:0 30px 40px 30px;
        position: fixed;bottom:0;
        .btn-l{
            margin-right: 50px;
        }
        .btn{
            display: inline-block;
            width: 320px;
            height: 88px;
            float: left;
            border-radius: 10px;
        }
        .btnX{
            display: block;
            width: 6.7rem;
            height: 88px;
            margin: 0 auto;
        }
    }
    .img-box img{
        width: 100%;
        height: 100%;
        font-size: 0;
    }
    .coverBox{
        width:750px;
        height:100%;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        background:rgba(0,0,0,1);
        opacity:.5;
        display: none;
        transition: all  .2s  ease-in;
        -moz-transition: all  .2s  ease-in;
        -webkit-transition: all  .2s  ease-in;
    }
    .GotopBox{
        width: 100%;
        background-color: #fff;
        z-index: 2;
        position: fixed;bottom: -700px;
        transition: all  .3s  ease-in;
        -moz-transition: all  .3s  ease-in;
        -webkit-transition: all  .3s  ease-in;
        .contextList{
            margin: 44px 40px 102px 40px;
            position: relative;
            li{
                height: 90px;
                line-height: 90px;
                overflow: hidden;
                font-size: 32px;
                position: relative;
                color: #222;
                // border: 1px red solid;
                .icon{
                    width: 36px;
                    height: 36px;
                    margin: 26px auto;
                }
                .telBox{
                    width: 100px;
                    height: 90px;
                }
                .name{
                    width: 106px;
                }
                .tail{
                    padding-left: 85px;
                    input{
                        border: none;
                    }
                }
                &:before{
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 1px;
                    background-color: #999999;
                    transform: scaleY(0.3);
                    transform-origin: center top;
                    z-index: 2;
                }
            }
            &:before{
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 1px;
                background-color: #999999;
                transform: scaleY(0.3);
                transform-origin: center bottom;
                z-index: 2;
            }
        }
        .titleBox{
            width: 100%;
            height: 88px;
            overflow: hidden;
            background-color: #F5F5F5;
            li{
                width: calc(100%/3);
                height: 100%;
                line-height: 88px;
                float: left;
                font-size: 32px;
                text-align: center;
            }
            .cancle{
                color: #666;
            }
            .opration{
                color: #228FFF;
                overflow: hidden;
                .iconadd{
                    display: inline-block;
                    font-style: normal;
                    color: #228FFF;
                    font-size: 50px;
                    float: left;
                    padding-left: 15px;
                }
                .text{
                    width: 150px;
                   float: left; 
                   padding-left: 10px;
                }
            }
            
        }
    }
    .GotopBoxAnimate{
        position: fixed;bottom: 0px;
    }
    .coverBoxs{
        display: block;
    }
    .f-fl{
        float: left;
    }
    .f-fr{
        float: right;
    }
    .contentBox{
        width: 100%;
        li{
            padding: 13px 0;
            .title{
                font-size: 32px;
                color: #222;
                line-height: 35px;
                padding: 15px 0;
                .sart{
                    font-style: normal;
                    color: #FB4C52;
                }
            }
            .name{
                font-size: 26px;
                color: #228FFF;
                text-decoration: underline;
            }
            .text{
                font-size: 26px;
                color: #222;
            }
        }
    }
    
}

</style>
