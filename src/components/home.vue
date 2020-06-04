<template>
    <div ref="home" class="home" id="home_id">
        <van-button type="default">默认按钮</van-button>
        <div class="topBox">

        </div>
    </div>
</template>

<script type="es6">
import Vue from 'vue';
//import { Tab, Tabs, Calendar, ,  } from 'vant';
import { Lazyload,Search,DropdownMenu, DropdownItem, List,PullRefresh,Button,Toast,Picker   } from "vant"

Vue.use(Lazyload)
Vue.use(Search)
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Button)
Vue.use(Toast);
Vue.use(Picker);

    export default {
        name: 'home',
        props: {},
        data () {
            return {
               

            }
        },
        components: {
        },
        created(){
            
        },
        activated(){
           
            
        },
        mounted() {
            
        
        },
        methods: {
           
        },
        onLoad() {
            
        },
    }
</script>

<style lang='less'>
.home{
    .img-box image{
        width: 100%;
        height: 100%;
        font-size: 0;
    }
    .f-fl{
        float: left;
    }
    .f-fr{
        float: right;
    }
    .topBox{
        width: 100%;
        height: 100px;
        border: 1px red solid;
    }
}

</style>
