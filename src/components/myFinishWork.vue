<template>
    <div ref="home" class="waitWork" id="wait_id">
        
    </div>
</template>

<script type="es6">
import Vue from 'vue';
import { Lazyload,Search,DropdownMenu, DropdownItem, List,PullRefresh,Button } from "vant"

Vue.use(Lazyload)
Vue.use(Search)
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Button)

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
        mounted() {
            
            
        },
        methods: {
            
        },
        destroyed(){
            
        }
    }
</script>

<style lang='less'>
.waitWork{
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
}

</style>
