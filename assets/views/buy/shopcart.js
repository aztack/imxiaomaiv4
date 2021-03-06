angular.module('xiaomaiApp').controller('buy.cartThumbCtrl', [
  '$state',
  '$scope',
  'xiaomaiService',
  'cartManager',
  '$timeout',
  'xiaomaiMessageNotify',
  'xiaomaiLog',
  'cookie_openid',
  function($state, $scope, xiaomaiService, cartManager, $timeout,
    xiaomaiMessageNotify, xiaomaiLog, cookie_openid) {
    cartManager.query(function(res) {
      $scope.totalCount = res.totalCount;
      $scope.totalPrice = res.totalPrice;

      //因为URL变化会触发query函数 所以要判断数量是否有真实变化
      var total = cartManager.readCartCache();
      $scope.hasChange = !total.totalCount || total.totalCount !=
        $scope.totalCount ? true :
        false;

      //200ms之后把hasChange重置成false hasChange可以一直变化 来表示动画效果
      $scope.hasChange && $timeout(function() {
        $scope.hasChange = false;
      }, 200);
    });

    //自己也监听购物车详情的变化
    xiaomaiMessageNotify.sub('cartGuiManager', function(status) {
      $scope.isShowCart = status == 'show';
    });

    xiaomaiMessageNotify.sub('detailGuiManager', function(status) {
      $scope.isShowDetail = status == 'show';
    });

    var getRefer = function() {
      var statename = $state.current.name;
      var namereg =
        /root\.buy(\.nav)?\.(\w+)/;
      var refer = "";
      switch (statename.match(namereg)[2]) {
        case 'all':
          refer = 'homepage';
          break;
        case 'category':
          refer = 'category+' + $state.params.categoryId;
          break;
        case 'active':
          refer = 'active+' + $state.params.activityId;
          break;
        default:
          refer = statename.match(namereg)[2];
          break;
      }
      return refer;
    };

    //跳转到结算界面
    $scope.goSettlement = function($event) {
      $event.stopPropagation();
      $event.preventDefault();

      //去结算按钮的点击统计
      xiaomaiLog('m_b_31shoppingsettle');

      //判断用户是否绑定
      var refer = getRefer();
      xiaomaiService.save('checkUser', {
        openid: cookie_openid
      }).then(function() {
        $state.go('root.confirmorder', {
          r: refer
        });

      }, function() {
        $state.go('root.binduser', {
          redirect: 'root.confirmorder'
        });
      });
    };

    //打开详情页面
    $scope.gotoDetail = function() {
      if (!$scope.totalCount || $scope.totalCount == 0) {
        return false;
      }
      xiaomaiMessageNotify.pub('detailGuiManager', 'hide');
      xiaomaiMessageNotify.pub('cartGuiManager', 'show');
    };

    //页面销毁之前销毁购物车信息
    //大开页面的时候 重新请求购物车信息
    $scope.$on('$destroy', function() {
      cartManager.store(false);
    });

  }
])

//购物车详情页面
angular.module('xiaomaiApp').controller('buy.cartDetailCtrl', [
  '$state',
  '$scope',
  'xiaomaiService',
  'cookie_openid',
  'buyProcessManager',
  'xiaomaiMessageNotify',
  'cartManager',
  'env',
  'xiaomaiCacheManager',
  'xiaomaiLog',
  function($state, $scope, xiaomaiService, cookie_openid, buyProcessManager,
    xiaomaiMessageNotify, cartManager, env, xiaomaiCacheManager, xiaomaiLog
  ) {
    //显示或者隐藏购物车
    var cartDetailSubId = xiaomaiMessageNotify.sub('cartGuiManager',
      function(status) {
        if (status == 'show') {
          //购物车PV统计
          xiaomaiLog('m_p_31shoppingcart');

          //获取购物车详情
          $scope.isloading = true;
          loadDetail().then(function(res) {
            $scope.goods = res['goods'];
            $scope.ldcFreight = res['ldcFreight'];
            $scope.haserror = false;
            return loadCouponCount();
          }, function() {
            $scope.haserror = true;
          }).then(function(coupons) {
            //获取优惠劵
            xiaomaiCacheManager.writeCache('mycoupon', coupons);
            var availableCoupons = [];
            angular.forEach(coupons.couponInfo, function(item) {
              item.status === 0 && (availableCoupons.push(
                availableCoupons));
            });
            $scope.coupons = availableCoupons;
          }).finally(function() {
            $scope.isloading = false;
            setTimeout(function() {
              //因为 购物车弹起有延时效果（0.5S） 所以通知必须在购物车动画播放结束以后再放
              xiaomaiMessageNotify.pub(
                'shopcartdetailheightupdate',
                'up', 'ready', '', '');
            }, 600);

          });
        };

        $scope.showcart = status == 'show' ? true : false;
        //通知遮罩层做掉对应的
        xiaomaiMessageNotify.pub('maskManager', status);
      });

    $scope.$on('destory', function() {
      xiaomaiMessageNotify.removeOne('cartGuiManager', cartDetailSubId);
    });


    //跳转到优惠劵
    $scope.gotoCoupon = function() {
      //优惠劵点击次数统计
      xiaomaiLog('m_b_31shoppingcartcoupons');
      var host = env == 'online' ? 'http://h5.imxiaomai.com' :
        'http://wap.tmall.imxiaomai.com';
      window.location.href = host + '/couponwap/myCouponList/webwiew';
      return false;
    };

    //继续购物
    $scope.continueShop = function($event) {
      xiaomaiMessageNotify.pub('cartGuiManager', 'hide');
      $event.preventDefault();
      //继续购物点击次数统计
      xiaomaiLog('m_b_31shoppingcartclose');
    };

    $scope.goHomepage = function() {
      $state.go('root.buy.nav.all', {
        showCart: false
      });
    };

    //返回购物车详情
    var loadDetail = function() {
      return cartManager.queryCartDetail();
    };

    //获取用户优惠劵数量
    var loadCouponCount = function() {
      return xiaomaiService.fetchOne('mycoupon', {
        openId: cookie_openid,
        type: 1
      });
    };

    //执行购买操作
    $scope.buyHandler = function($event, type, $index) {
      //点击+/-日志统计次数
      xiaomaiLog(type == 'plus' ? 'm_b_31shoppingcartadd' :
        'm_b_31shoppingcartless');

      var good = $scope.goods[$index],
        sourceType = good.sourceType,
        skuInfo = good.skuList[0],
        options = sourceType == 2 ? {
          goodsId: good.activityGoodsId,
          sourceType: 2,
          skuId: skuInfo.activitySkuId,
          distributeType: skuInfo.distributeType,
          price: skuInfo.activityPrice,
          propertyIds: skuInfo.skuPropertyValueIdList || '',
        } : {
          goodsId: good.goodsId,
          sourceType: good.sourceType,
          distributeType: skuInfo.distributeType,
          skuId: skuInfo.skuId,
          price: skuInfo.wapPrice,
          propertyIds: skuInfo.skuPropertyValueIdList || '',
        };

      var good = $scope.goods[$index];

      $scope.goods[$index].isPaying = true;
      buyProcessManager(options, type, Math.min(good.maxNum, good.skuList[
          0].stock), good.skuList[0].numInCart)
        .then(function(
          numInCart) {

          //购物车来源统计
          type == 'plus' && xiaomaiLog('m_r_31cartfromcart');

          good.skuList[0]['numInCart'] = numInCart;
          //如果这个数据的numInCart==0 删除这条数据
          if (good.skuList[0]['numInCart'] == 0) {
            $scope.goods.splice($index, 1);
            xiaomaiMessageNotify.pub('shopcartdetailheightupdate',
              'up', 'ready', '', '');
          }

        }, function(msg) {
          alert(msg);
        }).finally(function() {
          $scope.goods[$index] && ($scope.goods[$index].isPaying =
            false);
        });
      $event.stopPropagation();
      $event.preventDefault();
    };
  }
]);
