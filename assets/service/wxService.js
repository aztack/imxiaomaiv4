/**
 *所有关于微信的服务都放到这个里面
 **/

//注入微信配置
angular.module('xiaomaiApp').factory('registerWx', [
  '$q',
  'xiaomaiService',
  'env',
  function($q, xiaomaiService, env) {
    var deferred = $q.defer();
    var jsApiList = [
      'onMenuShareTimeline', //朋友圈分享
      'onMenuShareAppMessage', //分享到朋友
      'getNetworkType', //获取用户当前网络环境
      'getLocation', //获取用户定位
      'openLocation' //开始定位
    ];
    //注入微信配置
    //在非线上环境调用debug
    var register = function(config) {

      wx.config({
        debug: false,
        appId: config.appId,
        timestamp: config.timestamp,
        nonceStr: config.nonceStr,
        signature: config.signature,
        jsApiList: jsApiList
      });

      wx.ready(function() {

        deferred.resolve();
      });

      wx.error(function(res) {
        deferred.reject(JSON.stringify(res));
      });
    };

    xiaomaiService.fetchOne('getWxConfig', {
      url: encodeURIComponent([
        location.protocol,
        '//',
        location.host,
        location.pathname,
        location.search
      ].join(''))
    }).then(function(config) {
      register(config)
    });
    return deferred.promise;
  }
]);


//定位服务管理
//调用微信服务
angular.module('xiaomaiApp').factory('locationManager', [
  '$q',
  '$timeout',
  'env',
  'registerWx',
  function($q, $timeout, env, registerWx) {
    var getLocation = function() {
      var deferred = $q.defer();

      //默认3S后自动失败
      var $t = $timeout(function() {
        deferred.reject('网络超时')
      }, 3000);


      //调用微信定位服务
      registerWx.then(function() {

        wx.getLocation({
          type: 'wgs84',
          success: function(res) {



            var lat = res.latitude,
              lng = res.longitude;

            //取消默认失败
            $timeout.cancel($t);
            deferred.resolve({
              lat: lat,
              lng: lng
            });
          }
        })
      }, function(msg) {

        deferred.reject(msg);
      });

      return deferred.promise;

    }

    return getLocation;
  }
]);

//获取当前用户网络环境
angular.module('xiaomaiApp').factory('networkType', [
  '$q',
  'registerWx',
  function($q, registerWx) {
    var getNetworkType = function() {
      var deferred = $q.defer();
      registerWx.then(function() {

        wx.getNetworkType(function(res) {
          deferred.resolve(res);
        }, function(msg) {
          alert(msg);
        });
      })

      return deferred.promise;
    };
    return xiaomaiApp;
  }
]);

//微信分享入口
angular.module('xiaomaiApp').factory('wxshare', ['$q', 'registerWx', function(
  $q, registerWx) {
  return function(config) {
    registerWx.then(function() {
      wx.onMenuShareTimeline(config);
      wx.onMenuShareAppMessage(config);
    });
  }
}])
