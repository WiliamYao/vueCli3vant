<template>
<div class="loading"  v-if="show">
<img class="loading_img" src="../assets/img/dafengche.png" />
  </div>
  </template>
<script type="es6">


  export default {
    name: 'loading',
    data () {
      return {
        show:this.isshow
      }
    },
    props:{
      isshow:{
        type: Boolean,
        default: false,
        required: true,
      }

    },
    methods:{
      close(){
   this.show=false;
        this.$emit('back', this.show);
      }


    },
    watch: {
      isshow() {

        this.show = this.isshow;
      }
    }

    }
</script>

<style scoped>
.loading{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: block;
  position: fixed;
  text-align: center;
  top: 0px;
  left: 0px;
  z-index: 200;
}
  .loading_img{
    width: 0.7rem;
    height: 0.7rem;
    display: block;
    position: relative;
    margin: 0 auto;
    top: 40%;
    animation:changDeg 0.9s linear 0.1s infinite;
  }
@keyframes changDeg{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}

  </style>
