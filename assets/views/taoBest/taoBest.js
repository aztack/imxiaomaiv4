angular.module('xiaomaiApp').controller('taoBestNavCtrl', ['$scope', '$http', 'xiaomaiService', 'xiaomaiMessageNotify','env',
    function($scope, $http, xiaomaiService, xiaomaiMessageNotify, env) {
        window.scope = $scope;

        // if (env == 'develop') {
        //     xiaomaiService = $http;
        //     $http.fetchOne = function(name, params){
        //         var url = {
        //             'taoBestNavMenu': 'http://localhost:81/wap/menu/navigationMenu',
        //             'taoBestGoods':'http://localhost:81/wap/menu/navigationMenu/goods',
        //             'taoBestActivity':'http://localhost:81/wap/menu/navigationMenu/activity'
        //         }[name];

        //         return $http.get(url,{
        //             params: params || {}
        //         });
        //     }
        // }
        
        /**
         * private methods
         */
        //获取商品或活动列表
        function getGoodsOrActivityList() {
            var ajaxIdentifier = 'taoBest' + {
                '1': 'Activity',
                '2': 'Goods'
            }[$scope.currentSubMenuType];

            $scope.isloading = true;
            $scope.hasError = false;

            xiaomaiService.fetchOne(ajaxIdentifier, {
                navigationMenuId: $scope.currentSubMenuId,
                currentPage: $scope.currentPage++,
                recordPerPage: 10
            }).then(function(e) {
                if (!e.goods && !e.activity) e = e.data.data;
                $scope.list.push.apply($scope.list, (e.goods || e.activity));
                var pi = $scope.paginationInfo = e.paginationInfo,
                    loadNextPage = ''
                if (pi.currentPage < pi.totalPage) {
                    loadNextPage = '请求下一页数据';
                }
                xiaomaiMessageNotify.pub('taoBest:heightUpdate', 'up', 'ready', '', loadNextPage);
            }, function(errorMsg) {
                $scope.errorMsg = errorMsg;
                $scope.hasError = true;
            }).finally(function() {
                $scope.isloading = false;
            });
        }

        /**
         * public methods
         */
        //顶级菜单是否选中
        $scope.isTopMenuSelected = function(nav) {
            return $scope.currentTopMenuId == nav.navMenuId;
        };

        //顶级菜单点击事件
        $scope.onTopMenuClicked = function(e, nav) {
            $scope.currentTopMenuId = nav.navMenuId;
            nav.isShowSub = !nav.isShowSub;
            e.stopPropagation();
        };

        //子菜单是否选中
        $scope.isSubMenuSelected = function(subnav) {
            return $scope.currentSubMenuId == subnav.navMenuId;
        };

        //子菜单选中事件
        $scope.onSubMenuClicked = function(e, subnav) {
            $scope.currentPage = 0;
            $scope.currentSubMenuId = subnav.navMenuId;
            $scope.currentSubMenuType = subnav.menuType;
            $scope.list = [];
            getGoodsOrActivityList();
            e.stopPropagation();
        };

        (function main() {
            $scope.currentPage = 0;
            $scope.currentTopMenuId = null;
            $scope.currentSubMenuId = null;
            $scope.menus = null;

            $scope.isloading = true;

            var match = location.hash.match(/navigationId=(\d+)/),
                navigationId = -1;
            if (match && match.length == 2) {
                navigationId = match[1];
            }
            xiaomaiService.fetchOne('taoBestNavMenu', {
                navigationId: navigationId
            }).then(function(res) {
                var menus = $scope.menus = res.navigationMenus || res.data.data.navigationMenus,
                    firstTopMenu = menus[0];
                
                //初始化时显示第一个菜单项下的物品
                $scope.currentTopMenuId = firstTopMenu.navMenuId;
                firstTopMenu.isShowSub = true;
                var subnav = firstTopMenu.childrenMenuList[0];
                $scope.currentSubMenuId = subnav.navMenuId;
                $scope.currentSubMenuType = subnav.menuType;
                $scope.list = [];
                getGoodsOrActivityList();
            });

            xiaomaiMessageNotify.sub('taoBest:loadNextPage', getGoodsOrActivityList);
        })();
    }
]);