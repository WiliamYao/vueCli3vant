<template>
  <div ref="toast" class="loading" v-if="show" @click="close">
<span class="msg">
  {{msg}}
</span>

  </div>

</template>
<script type="es6">

  export default {
    name: 'toast',
    props: {
      isshow: {
        type: Boolean,
        default: false,
        required: true,
      },
      time: {
        type: Number,
        default: 3000,
        required: true,

      },
      msg: {
        type: String,
        default: false,
        required: true,
      }

    },
    data () {
      return {
        show: this.isshow,
        intel: {},
      }
    },
    mounted (){


    },
    updated(){

      if (this.show) {
        clearTimeout(this.intel); //关闭
        this.intel = null;

      }
      this.inteval();


    },
    beforeDestroy(){


      clearTimeout(this.intel); //关闭
      this.intel = null;


    },
    methods: {
      close(){


        clearTimeout(this.intel); //关闭
        this.intel = null;


        this.show = false;
        this.$emit('back', this.show);
      },
      inteval(){
        let self = this;
        this.intel = setTimeout(function () {
          self.$emit('back', false);

            clearTimeout(self.intel); //关闭
            self.intel = null;


        }, this.time);
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
  .loading {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0rem;

    text-align: center;
    z-index: 500;
  }

  .msg {
    color: #fff;
    border: none;
    font-size: 0.35rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0.1rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    padding-left: 0.5rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-right: 0.5rem;
    display: inline-block;
    position: relative;
    top: 4.5rem;
    margin: 1rem;
  }
</style>
