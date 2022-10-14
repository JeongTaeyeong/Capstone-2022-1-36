import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Jazzicon from 'vue-jazzicon'
import VueRouter from 'vue-router'
import axios from 'axios'

// import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'mdb-vue-ui-kit/css/mdb.min.css'

// 라우터 별 vue 파일 import
import Main from './main/main.vue'
import LoginPage from './log_in/LoginPage.vue'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// router 기능 확장 선언
Vue.use(VueRouter);
// Jazzicon 컴포넌트 등록
Vue.component('jazzicon', Jazzicon);

// 이벤트 버스 선언
Vue.prototype.$EventBus = new Vue();
// axios 전역 선언
Vue.prototype.$axios = axios;

// URL
var BACKURL = process.env.VUE_APP_API_URL


// 라우터 등록
var routes = [

    // 메인 페이지
    { 
      path: '/', 
      component: Main,
      // meta: { authorization: ["all"] },
    },
    // 로그인 페이지
    { 
      path: '/login', 
      component: LoginPage,
      // meta: { authorization: ["client"] },
    },
    // 에러 출력 페이지
    { 
      path: '/not-found', 
      component: () => import(/* webpackChunkName: "auth" */ './NotFound.vue'),
      // meta: { authorization: ["all"] },
    },
    // 로그인 -> 회원가입 페이지
    { 
      path: '/auth_account', 
      component: () => import(/* webpackChunkName: "auth" */ './auth_account/AuthAccount.vue'),
      // meta: { authorization: ["client"] },
    },  
    // 회원가입 -> 발급 계정 폼 입력 페이지 
    { 
      path: '/auth_account/director_account', 
      component: () => import(/* webpackChunkName: "auth" */ './auth_account/director_account/DirectorAccountPage.vue'),
      // meta: { authorization: ["client"] },
    }, 
    // 회원가입 -> 사용자 계정 폼 입력 페이지
    { 
      path: '/auth_account/user_account', 
      component: () => import(/* webpackChunkName: "auth" */ './auth_account/user_account/UserAccountPage.vue'),
      // meta: { authorization: ["client"] },
    },
    // 랭킹 페이지
    { 
      path: '/ranking', 
      component: () => import(/* webpackChunkName: "ranking" */ './ranking/Ranking.vue'),
      // meta: { authorization: ["all"] },
    }, 
    // 마이 페이지
    { 
      path: '/mypage', 
      component: () => import(/* webpackChunkName: "mypage" */ './mypage/MyPage.vue'),
      // meta: { authorization: ["user"] },
    }, 
    // 마이 페이지 -> 권한 신청 페이지
    { 
      path: '/auth_apply', 
      component: () => import(/* webpackChunkName: "mypage" */ './auth_apply/AuthApply.vue'),
      // meta: { authorization: ["user"] },
    }, 
    // 마이 페이지 -> 봉사시간 인증 페이지
    { 
      path: '/vms_ins', 
      component: () => import(/* webpackChunkName: "mypage" */ './vms_ins/VmsIns.vue'),
      // meta: { authorization: ["user"] },
    }, 
    // 발급할 NFT 선택 페이지 (권한 보유자)
    { 
      path: '/nft_choice', 
      component: () => import(/* webpackChunkName: "nftchoice" */ './nft_choice/NFTChoice.vue'),
      // meta: { authorization: ["issuer"] }, 
    }, 
    // * -> 발급할 사용자 선택 페이지
    { 
      path: '/user_search', 
      component: () => import(/* webpackChunkName: "nftchoice" */ './user_search/UserSearch.vue'),
      // meta: { authorization: ["issuer"] },
    }, 
    // * -> 발급 신청 페이지
    { 
      path: '/nft_issue', 
      component: () => import(/* webpackChunkName: "nftchoice" */ './nft_issue/NFTIssue.vue'),
      // meta: { authorization: ["issuer"] },
    }, 
    // 관리자 페이지 -> NFT 발급 승인 페이지, 봉사시간 승인 페이지, 발급권한 부여 페이지 (탭)
    { 
      path: '/manage_page', 
      component: () => import(/* webpackChunkName: "manage" */ './manage_page/ManagePage.vue'),
      // meta: { authorization: ["admin"] },
    }, 
    // 진행 정보 페이지
    { 
      path: '/progress', 
      component: () => import(/* webpackChunkName: "progress" */ './progress/Progress.vue'),
      // meta: { authorization: ["user"] },
    }, 
    // 진행 정보 페이지 -> 달성 업적 페이지
    { 
      path: '/progress/achieved', 
      component: () => import(/* webpackChunkName: "progress" */ './progress/achieved/achieved.vue'),
      // meta: { authorization: ["user"] },
    }, 
    // 진행 정보 페이지 -> 보유 NFT 페이지
    { 
      path: '/progress/my_own_NFT', 
      component: () => import(/* webpackChunkName: "progress" */ './progress/my_own_NFT/MyOwnNFT.vue'),
      // meta: { authorization: ["user"] },
    }, 
    // 진행 정보 페이지 -> 미달성 업적 페이지
    { 
      path: '/progress/not_achieved', 
      component: () => import(/* webpackChunkName: "progress" */ './progress/not_achieved/NotAchieved.vue'),
      // meta: { authorization: ["user"] }, 
    }, 
    // 진행 정보 페이지 -> 진행도 페이지
    { 
      path: '/progress/progress_all', 
      component: () => import(/* webpackChunkName: "progress" */ './progress/progress_all/ProgressAll.vue'),
      // meta: { authorization: ["user"] }, 
    },
    // 공지사항 페이지
    { 
      path: '/notice', 
      component: () => import(/* webpackChunkName: "notice" */ './notice/NoticePage.vue'),
      children: [
        {
          path: '',
          component: () => import(/* webpackChunkName: "notice" */ './notice/components/NoticeBoard.vue'),
          // meta: { authorization: ["all"] },
        },
        { 
          path: 'write', 
          component: () => import(/* webpackChunkName: "notice" */ './notice/components/CreatePost.vue'),
          // meta: { authorization: ["admin"] },
        },
        { 
          path: ':id', 
          component: () => import(/* webpackChunkName: "notice" */ './notice/components/EachPost.vue'),
          // meta: { authorization: ["all"] },
        },
      ],
      // meta: { authorization: ["all"] },
    },
    
    // // 커뮤니티 페이지
    // {},
    
    // // 커뮤니티 -> 작성 페이지
    // {},
    
    // // 커뮤니티 -> 게시물 페이지
    // {},

    // 임시
    // {
    //   path: '/temp',
    //   component: () => import(/* webpackChunkName: "temp" */ './assets/temp.vue'),
    // }

];

// 뷰 라우터 인스턴스 생성
var router = new VueRouter({
    routes,
    mode: "history",
});

// router.beforeEach((to, from, next) => {
//   // authenticationState는 유저가 로그인이 되어있는지 아닌지 값을 가져와 판별해준다.
//   const authenticationState = store.state.token // false: not login, true: login
//   const authenticationAccess = store.state.access // 0: user/client, 1:issuer, 2:admin
//   // authorization에서는 라우터에서 메타 속성을 정의해준 값이 담겨진다.
//   // ["all"], ["client"], ["issuer"], ["user"], ["admin"]
//   const { authorization } = to.meta
//   // console.log('authenticationState='+ authenticationState +', authorization=' + authorization
//   // + ', authorizationAccess=' + authenticationAccess)

//   if (authorization != "all") {
//     if (authorization == "admin" && authenticationAccess >= 2) next()
//     else if (authorization == "issuer" && authenticationAccess >= 1) next()
//     else if (authorization == "user" && authenticationAccess >= 0 && authenticationState) next()
//     else if (authorization == "client" && !authenticationState) next()
//     else { next('/not-found'); return; }
//   }
//   else next()
// });

// 뷰 인스턴스 생성
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
}).$mount('#app')