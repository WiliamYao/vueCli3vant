<template>
    <div id="app">

            <keep-alive >
                <router-view v-if="isRouterAlive"></router-view>
            </keep-alive>

    </div>
</template>

<script>

    export default {
        name: 'App',
        provide(){
            return {
                reload:this.reload
            }
        },
        data(){
            return {
                transitionName:'',
                isRouterAlive:true
            }
        },


        methods:{
            reload(){
                this.isRouterAlive=false;
                this.$nextTick(function(){
                    this.isRouterAlive=true
                })
            },

        },

    }
</script>

<style>

    html {
        color: #333;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;

    }

    html * {
        outline: 0;
        -webkit-text-size-adjust: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-top: 0px;
    }

    html, body {
        font-family: 'Microsoft YaHei', Arial, "Helvetica Neue", Helvetica, sans-serif
    }

    body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td, hr, button, article, aside, details, figcaption, figure, footer, header, menu, nav, section {
        margin: 0;
        padding: 0
    }
    body {

        background-color: #f8f8f8;
        -webkit-font-smoothing: antialiased;
    }

    .img-box img{
        width: 100%;
        height: 100%;
        font-size: 0;
        display: block;
    }
    .f-fl{
        float: left!important;
    }
    .f-fr{
        float: right!important;
    }
</style>
