//接口列表管理
angular.module('xiaomaiApp').factory('xiaomaimodelManage', function() {
  var urls = {
      //导航
      'navgatorlist': {
        url: '/wap/navigate/index',
        type: 'GET'
      },
      //根据定位获取定位学校结果
      'locate': {
        url: '/wap/college/locate',
        type: 'GET'
      },
      //获取所有的城市列表
      'citylist': {
        url: '/wap/geography/cities',
        type: 'GET'
      },
      //获取城市下所有的学校列表
      'collegelist': {
        url: '/wap/geography/colleges',
        type: 'GET'
      },
      //获取用户的学校信息
      'getSchool': {
        url: '/wap/college/detail',
        type: 'GET'
      },
      //保存学校信息
      'saveSchool': {
        url: '/wap/college/detail',
        type: 'POST'
      },
      //获取活动列表
      'activities': {
        url: '/wap/college/activities',
        type: 'GET'
      },
      //普通活动下的商品列表
      'activeGoods': {
        url: '/wap/activity/goods',
        type: 'GET'
      },
      //活动页面的Banner
      'activeBanner': {
        url: '/wap/activity/banners',
        type: 'GET'
      },
      //热门榜产品
      'categoryGoods': {
        url: '/wap/index/categoryGoods',
        type: 'GET'
      },
      //类目下的banner
      'categoryBanners': {
        type: 'GET',
        url: '/wap/category/banners'
      },
      //普通类目下产品
      'goods': {
        url: '/wap/category/goods',
        type: 'GET'
      },
      //产品详情
      'goodDetail': {
        url: '/wap/goods/detail',
        type: 'GET'
      },
      //删除购物车
      'removeCart': {
        url: '/wap/cart/remove',
        type: 'POST'
      },
      //新版本学校白名单
      'whitelist': {
        type: 'GET',
        url: '/wap/college/whitelist'
      },
      //添加到购物车
      'addCart': {
        url: '/wap/cart/add',
        type: 'POST'
      },
      //查询购物车
      'queryCart': {
        url: '/wap/cart/sync',
        type: 'GET'
      },
      //购物车详情
      'queryCartDetail': {
        url: '/wap/cart/get',
        type: 'GET'
      },
      //查看我的优惠劵
      'mycoupon': {
        url: '/couponwap/myCouponList',
        type: 'GET'
      },
      //获取微信配置
      "getWxConfig": {
        url: "/wap/getWxConfig",
        type: "GET"
      },
      //提交反馈
      "feedback": {
        url: "/wap/feedback/detail",
        type: "POST"
      },
      //日志统计
      "log": {
        // url: "/wap/log",
        url: "http://logger.imxiaomai.com/client/event",
        type: "GET"
      },
      //搜索结果页
      "searchresult": {
        url: "/wap/goods/search",
        type: "GET"
      },
      //搜索提示
      "searchsuggest": {
        url: "/wap/goods/suggest",
        type: "GET"
      },
      //发送验证码
      "sendCode": {
        url: "/wap/user/sendCode",
        type: "POST"
      },
      //用户绑定信息
      "bindUser": {
        url: "/wap/userBind/bind",
        type: "POST"
      },
      //验证用户登录状态
      "checkUser": {
        url: "/wap/userBind/check",
        type: "POST"
      },
      //获取用户收货地址列表
      "addrList": {
        url: "/wap/useraddr/query",
        type: "GET" //?
      },
      //删除某条用户收货地址信息
      "addrDel": {
        url: "/wap/useraddr/delete",
        type: "POST" //?
      },
      //查询某条用户收货地址信息
      "getAddr": {
        url: "/wap/useraddr/get",
        type: "GET"
      },
      //用户中心获取用户信息
      "usercenter": {
        url: "/wap/usercenter/index",
        type: "GET"
      },
      //更新某条用户收货地址信息
      "setAddr": {
        url: "/wap/useraddr/set",
        type: "POST"
      },
      //新增一套用户收货地址信息
      "addAddr": {
        url: "/wap/useraddr/add",
        type: "POST"
      },
      //微信预支付获取订单详情
      "queryOrder": {
        url: "/wap/order/query",
        type: "GET"
      },
      //淘精品
      // "taoBestGoods":{
      //   url:"/wap/category/goods",
      //   type:"GET"
      // },
      //淘精品导航
      "taoBestNavMenu":{
        url:"/wap/menu/navigationMenu",
        type:"GET"
      },
      //淘精品获取某个菜单下商品列表接口
      "taoBestGoods": {
        url: "/wap/menu/navigationMenu/goods",
        type: "GET"
      },
      //淘精品获取某个菜单下活动列表接口
      "taoBestActivity": {
        url: "/wap/menu/navigationMenu/activity",
        type: "GET"
      }

    },
    getModel = function() {
      var args = Array.prototype.slice.call(arguments, 0),
        name = args[0],
        type = args[1] || 'GET';

      if (urls.hasOwnProperty(name) && urls[name].type === type) {
        return urls[name]['url'];
      } else {
        return false;
      }
    }
  return getModel;
});


/**

 *url拦截器
 *如果是当前环境是线下环境 拦截URL转成对应的JS文件
 **/
angular.module('xiaomaiApp').factory('urlInterceptor', ['env', function(env) {
  var interceptor = function(url) {
    if (env !== 'develop') {
      return url;
    }
    return '/api' + url + '.json';

  };
  return interceptor;
}]);

/**
 *提供ajax服务
 **/
angular.module('xiaomaiApp').factory('xiaomaiService', [
  'env',
  '$q',
  'urlInterceptor',
  'xiaomaimodelManage',
  '$http',
  'xiaomaiCacheManager',
  'getDataType',
  'httpRequstParam',
  '$timeout',
  function(
    env,
    $q,
    urlInterceptor,
    xiaomaimodelManage,
    $http,
    xiaomaiCacheManager,
    getDataType,
    httpRequstParam,
    $timeout
  ) {

    //验证接口是否存在
    var getUrl = function(name, type) {
        var url = xiaomaimodelManage(name, type);
        return url;
      },
      //处理返回结果
      handlerResult = function(res) {
        //如果返回码错误 或者返回data不存在
        if (res.code != 0 || !res.data) {
          return false;
        }
        if (getDataType(res.data) == 'number' && !res.data.length) {
          return false;
        }
        if (getDataType(res.data) == 'object' && !Object.keys(res.data).length) {
          return false;
        }
        return res.data;
      },
      //生成Promise实例
      createPromise = function() {
        return $q.defer();
      },
      /**
       *@请求后台数据
       *@params {String} name 接口名，对应的接口地址在modelManager中定义
       *@params {Object} [params] 请求参数
       *@params {Boolean} isCached 是否读取缓存
       **/
      fetchOne = function(name) {
        var deferred = createPromise();

        var args = Array.prototype.slice.call(arguments, 0),
          name = args[0],
          params = {},
          url;

        if (getDataType(args[1]) == 'object') {
          params = args[1];
        }

        //判断接口是否已经在modelManager中定义
        url = getUrl(name, 'GET');
        //如果当前开发环境是线下环境 将接口转成本地文件地址
        url = urlInterceptor(url);
        if (!url) {
          deferred.reject('接口错误或接口请求方式错误');
          return deferred.promise;
        }

        //从页面缓存中查找
        var cacheResult = xiaomaiCacheManager.readCache(name, params);
        if (cacheResult) {
          deferred.resolve(cacheResult);
          return deferred.promise;
        }

        //向后台发送请求
        $http({
          url: url,
          method: 'GET',
          params: angular.extend({
            // v: Math.random().toString().replace(/\./, '')
          }, params)
        }).success(function(res) {

          if (name == "addrDel") {
            debugger;
          }
          //如果返回结果有异常 reject
          if (handlerResult(res) === false) {
            deferred.reject(res.msg);
          } else {
            //写入缓存
            deferred.resolve(res.hasOwnProperty('data') ? res.data :
              res);
          }
        }).error(function(res) {
          deferred.reject('接口请求错误');
        });

        return deferred.promise;
      },
      //无顺序全部获取
      fetchAll = function() {

      },
      //按需全部获取
      fetchOrder = function() {

      },
      /**
       *@向后台提交操作
       *@param {String} name 接口名称 在modelManager中定义
       *@param {Object} name 响应操作
       **/
      save = function(name, params) {
        var deferred = createPromise();

        //判断接口是否已经在modelManager中定义
        url = getUrl(name, 'POST');
        //如果当前开发环境是线下环境 将接口转成本地文件地址
        url = urlInterceptor(url);
        if (!url) {
          deferred.reject('接口错误或接口请求方式错误');
          return deferred.promise;
        }


        var defaulOptions = env == 'develop' ? {
          method: 'GET',
          params: params
        } : {
          method: 'POST',
          data: httpRequstParam(params)
        };


        $http(angular.extend(defaulOptions, {
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        })).success(function(res) {


          if (res.code == 0) {
            deferred.resolve(res.data);
          } else {
            deferred.reject(res.msg);
          }
        }).error(function() {

          deferred.reject('接口异常');
        });
        return deferred.promise;
      };

    return {
      fetchOne: fetchOne,
      fetchAll: fetchAll,
      fetchOrder: fetchOrder,
      save: save
    };
  }
]);

//JSON转换成KV字符串
angular.module('xiaomaiApp').factory('httpRequstParam', [function() {

  var param = function(obj) {
    var query = '';
    var name, value, fullSubName, subName, subValue, innerObj, i;


    for (name in obj) {
      value = obj[name];


      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {


          subValue = value[subName];
          if (subValue != null) {
            // fullSubName = name + '[' + subName + ']';
            //user.userName = hmm & user.userPassword = 111
            fullSubName = name + '.' + subName;
            // fullSubName =  subName;
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
      } else if (value !== undefined) //&& value !== null
      {
        query += encodeURIComponent(name) + '=' +
          encodeURIComponent(value) + '&';
      }
    }


    return query.length ? query.substr(0, query.length - 1) :
      query;
  };

  return param;


}])
