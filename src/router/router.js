import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/home.vue'

Vue.use(Router);

 const routes= [
    {
        path: '/', 
        name: 'home',
        meta:{index:1,
            title:"需求列表",
            keepAlive: true},
        component: Home
    }
    // {
    //     path: '/detailsX',
    //     name: 'detailsX',
    //     meta:{index:1,
    //         title:"需求详情",
    //         keepAlive: true},
    //     component: resolve =>require(['@/components/detailsX.vue'],resolve)
    // },
    // {
    //     path: '/',
    //     name: 'myDraft',
    //     meta:{index:1,
    //         title:"我的草稿",
    //         keepAlive: true},
    //     component: resolve =>require(['@/components/myDraft.vue'],resolve)
        
    // },
    // {
    //     path: '/',
    //     name: 'myWaitWork',
    //     meta:{index:1,
    //         title:"我的待办",
    //         keepAlive: true},
    //     component: resolve =>require(['@/components/myWaitWork.vue'],resolve)
    // },
    // {
    //     path: '/',
    //     name: 'myFinishWork',
    //     meta:{index:1,
    //         title:"我的已办",
    //         keepAlive: true},
    //     component: resolve =>require(['@/components/myFinishWork.vue'],resolve)
        
    // }
  ]

    // add route path
    routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export {
    router
};

