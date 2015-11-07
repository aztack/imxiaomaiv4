/**
 **小麦商城前端代码重构
 **/

/**
 *定义前端路由
 **/
angular.module('xiaomaiApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$ocLazyLoadProvider',
  function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    /**
    *路径映射
    {
      root:'入口页面',//所有的购买功能都放到这个入口下边
      notfound:'404页面',
      locate:'定位入口'
    }
    **/
    $stateProvider
      .state('root', {
        url: '/',
        templateUrl: '../assets/views/root/root.html',
        resolve: {
          loadService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'service/notifyService.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/root/font.css',
                window.__SYS_CONF.resourceUrl +
                'service/commonService.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'service/ajaxService.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'service/cacheService.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'service/cartService.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'service/detailService.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'service/schoolService.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'service/wxService.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'service/cookieService.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'service/siblingnavService.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'service/logService.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/goodListItem/goodListItem.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/goodListItem/goodListItem.css?v=' + (+
                  new Date),
                window.__SYS_CONF.resourceUrl +
                'views/gooddetail/gooddetail.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/gooddetail/gooddetail.css?v=' + (+
                  new Date),
                window.__SYS_CONF.resourceUrl +
                'views/root/swiper.min.css?v=' + (+
                  new Date)

              ]
            })
          }],

          loadFilter: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'filters/price.js?v=' + (+new Date)
              ]
            })
          }],
          loadComponents: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'components/countdown/countdown.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'components/back/back.js?v=' + (+new Date)
              ]
            })
          }]
        }
      })
      .state('root.taoBest',{
        url:'taoBest',
        templateUrl:'../assets/views/taoBest/taoBest.html',
        resolve:{
          loadCtrl:['$ocLazyLoad',function($ocLazyLoad){
            return $ocLazyLoad.load({
              name:'xiaomaiApp',
              files:[
                window.__SYS_CONF.resourceUrl +
                'views/taoBest/taoBest.js?v='/* + (+new Date)*/,
                 window.__SYS_CONF.resourceUrl +
                'views/taoBest/taoBest.css?v='/* + (+new Date)*/,
                window.__SYS_CONF.resourceUrl +
                'views/nav/nav.css',
                window.__SYS_CONF.resourceUrl +
                'views/all/all.css'
              ]
            })
          }]
        }
      })
      .state('root.buy', {
        url: 'buy/',
        controller: 'buyCtrl',
        templateUrl: '../assets/views/buy/buy.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/buy/buy.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/buy/buy.css',
                window.__SYS_CONF.resourceUrl +
                'views/buy/detail.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/buy/shopcart.js?v=' + (+new Date)
              ]
            })
          }]
        }
      })
      .state('root.buy.nav', {
        url: 'nav/',
        templateUrl: '../assets/views/nav/nav.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/nav/nav.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/nav/nav.css'
              ]
            })
          }]
        }
      })
      //导航栏精彩活动 所有活动入口
      .state('root.buy.nav.all', {
        url: 'all/',
        templateUrl: '../assets/views/all/all.html',
        controller: 'nav.allCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/all/all.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/all/all.css'
              ]
            })
          }]
        }
      })
      // 推荐列表页
      .state('root.buy.nav.recommend', {
        url: 'recommend/',
        controller: 'nav.recommendCtrl',
        templateUrl: '../assets/views/recommend/recommend.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/recommend/recommend.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/recommend/recommend.css'
              ]
            })
          }]
        }
      })
      //普通活动 入口是导航页面 左侧有导航
      .state('root.buy.nav.active', {
        url: 'active/?collegeId&activityId',
        controller: 'nav.activeCtrl',
        templateUrl: '../assets/views/active/nav.active.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/active/active.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/active/active.css'
              ]
            })
          }]
        }
      })
      //普通活动 从首页进入一个新连接
      .state('root.buy.active', {
        url: 'active/?collegeId&activityId&refer',
        controller: 'buy.activeCtrl',
        templateUrl: '../assets/views/active/active.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/active/active.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/active/active.css'
              ]
            })
          }]
        }
      })
      //类目列表页
      .state('root.buy.nav.category', {
        url: 'category/?collegeId&categoryId',
        controller: 'nav.categoryCtrl',
        templateUrl: '../assets/views/category/category.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/category/category.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/category/category.css'
              ]
            })
          }]
        }
      })
      //分享的详情页
      .state('root.buy.sharedetail', {
        url: 'sharedetail/?goodId&sourceType&collegeId',
        controller: 'sharedetailCtrl',
        templateUrl: '../assets/views/sharedetail/sharedetail.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/sharedetail/sharedetail.js',
                window.__SYS_CONF.resourceUrl +
                'views/sharedetail/sharedetail.css'
              ]
            })
          }]
        }
      })
      //进行定位
      .state('root.locate', {
        url: 'locate/',
        controller: 'positionCtrl',
        templateUrl: '../assets/views/locate/locate.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/locate/locate.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/locate/locate.css'
              ]
            })
          }]
        }
      })
      //选择学校
      .state('root.colleges', {
        url: 'colleges/?cityid',
        controller: 'collegesCtrl',
        templateUrl: '../assets/views/colleges/colleges.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/colleges/colleges.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/colleges/colleges.css'

              ]
            })
          }]
        }
      })
      .state('root.buy.coupon', {
        url: 'coupon/',
        controller: 'buy.couponCtrl',
        templateUrl: '../assets/views/coupon/coupon.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/coupon/coupon.js?v=' + (+new Date)
              ]
            });
          }]
        }
      })
      .state('root.feedback', {
        url: 'feedback',
        controller: 'feedbackCtrl',
        templateUrl: '../assets/views/feedback/feedback.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/feedback/feedback.js?v=' + (+new Date),
                window.__SYS_CONF.resourceUrl +
                'views/feedback/feedback.css'

              ]
            });
          }]
        }
      })
      //搜索操作页面
      .state('root.search', {
        url: 'search/?key',
        controller: 'searchCtrl',
        templateUrl: '../assets/views/search/search.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/search/search.js',
                window.__SYS_CONF.resourceUrl +
                'views/search/search.css'
              ]
            })
          }]
        }
      })
      //搜索结果页面
      .state('root.buy.searchresult', {
        url: 'searchresult/?key&page',
        controller: 'searchresultCtrl',
        templateUrl: '../assets/views/search/searchresult.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl +
                'views/search/searchresult.js',
                window.__SYS_CONF.resourceUrl +
                'views/search/search.css'
              ]
            })
          }]
        }
      })
      //确认订单
      .state('root.confirmorder', {
        url: 'confirmorder/?r',
        templateUrl: '../assets/views/confirmorder/confirmorder.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'views/confirmorder/confirmorder.js',
                window.__SYS_CONF.resourceUrl + 'views/confirmorder/confirmorder.css'
              ]
            })
          }],
          loadService: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'service/orderService.js'
              ]
            })
          }]
        }
      })
      //跳转到微信预支付页面
      .state('root.wechartprepay', {
        url: 'wechartprepay/',
        controller: 'wechartprepayCtrl',
        templateUrl: '../assets/views/wechartprepay/wechartprepay.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'views/wechartprepay/wechartprepay.js',
                window.__SYS_CONF.resourceUrl + 'views/wechartprepay/wechartprepay.css'
              ]
            })
          }]
        }
      })
      //支付宝预支付页面
      .state('root.alipayprepay', {
        url: 'alipayprepay/',
        templateUrl: '../assets/views/alipayprepay/alipayprepay.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'views/alipayprepay/alipayprepay.js',
                window.__SYS_CONF.resourceUrl + 'views/alipayprepay/alipayprepay.css'
              ]
            })
          }]
        }
      })
      //支付成功页面
      .state('root.paySuccess', {
        url: 'paySuccess/',
        templateUrl: '../assets/views/paySuccess/paySuccess.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'views/paySuccess/paySuccess.js',
                window.__SYS_CONF.resourceUrl + 'views/paySuccess/paySuccess.css'
              ]
            })
          }]
        }
      })
      //支付失败页面
      .state('root.payFail', {
        url: 'payFail/',
        templateUrl: '../assets/views/payFail/payFail.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'views/payFail/payFail.js',
                window.__SYS_CONF.resourceUrl + 'views/payFail/payFail.css'
              ]
            })
          }]
        }
      })
      //用户信息绑定
      .state('root.binduser', {
        url: 'binduser?redirect',
        templateUrl: '../assets/views/binduser/binduser.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'views/binduser/binduser.js',
                window.__SYS_CONF.resourceUrl + 'views/binduser/binduser.css'
              ]
            })
          }]
        }
      })
      //订单地址管理列表
      .state('root.addr', {
        url: 'orderaddr/?userId',
        templateUrl: '../assets/views/addr/addr.html',
        controller: 'addrListCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'views/addr/addr.js',
                window.__SYS_CONF.resourceUrl + 'views/addr/addr.css'
              ]
            })
          }]
        }
      })
      //订单地址新增
      .state('root.addrAdd', {
        url: 'addrAdd/?userId&chosenCollege',
        templateUrl: '../assets/views/addr/add.html',
        controller: 'addrAddCtrl',

        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'views/addr/add.js',
                window.__SYS_CONF.resourceUrl + 'views/addr/addr.css'
              ]
            })
          }]
        }
      })
      //订单地址编辑
      .state('root.addrEdit', {
        url: 'addrEdit/?userId&userAddrId&chosenCollege',
        controller: 'addrEditCtrl',
        templateUrl: '../assets/views/addr/edit.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'views/addr/edit.js',
                window.__SYS_CONF.resourceUrl + 'views/addr/addr.css'
              ]
            })
          }]
        }
      })
      //订单地址学校信息选择
      .state('root.addrLocate', {
        url: 'addrLocate/?r&userId&userAddrId',
        controller: 'addrLocateCtrl',
        templateUrl: '../assets/views/addr/addrLocate.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'views/addr/addrLocate.js',
                window.__SYS_CONF.resourceUrl + 'views/addr/addr.css',
                window.__SYS_CONF.resourceUrl + 'views/locate/locate.css'
              ]
            })
          }]
        }
      })
      //订单地址学校信息选择
      .state('root.addrColleges', {
        url: 'addrColleges/?r&userId&userAddrId&cityId',
        controller: 'addrCollegesCtrl',
        templateUrl: '../assets/views/addr/addrColleges.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'views/addr/addrColleges.js',
                window.__SYS_CONF.resourceUrl + 'views/addr/addr.css',
                window.__SYS_CONF.resourceUrl + 'views/colleges/colleges.css'
              ]
            })
          }]
        }
      })
      //用户中心
      .state('root.user', {
        url: 'user/',
        controller: 'userCtrl',
        templateUrl: '../assets/views/user/user.html',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'xiaomaiApp',
              files: [
                window.__SYS_CONF.resourceUrl + 'views/user/user.js',
                window.__SYS_CONF.resourceUrl + 'views/user/user.css'
              ]
            })
          }]
        }
      })
      //订单地址编辑
      .state('root.notfound', {
        url: '404/',
        templateUrl: '../assets/views/notfound/notfound.html'
      });
  }
]);

angular.module('xiaomaiApp').run(['$state', '$rootScope', '$timeout', function(
  $state,
  $rootScope, $timeout) {
  var t = $timeout(function() {
    $state.go('root.buy.nav.all');
  }, 50);
  var startWatcher = $rootScope.$on('$stateChangeStart', function(e,
    toState,
    toParam) {
    $timeout.cancel(t);
    //销毁监听
    startWatcher();
  });
}]);

//禁止页面滑动
document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, false);
