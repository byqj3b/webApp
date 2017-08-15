;(function (angular) {

    var app = angular.module("app", []);
    app.controller("appController", ["$scope", function ($scope) {
        $scope.title = "每日一刻";
        //父级接收广播
        $scope.titleArr = ['首页', '作者', '栏目', '我'];
        $scope.title='首页';
        $scope.$on('tab_notifice', function (e, regs) {
            var index = regs.id;
            //父级发送广播给儿子
            $scope.$broadcast('app_notifice',{title:$scope.titleArr[index]})
        });
    }]);
    //顶部导航
    app.directive('header', function () {
        return {
            restrict: 'EA',
            templateUrl: '../views/header_tpl.html',
            controller: ['$scope', function ($scope) {
                //接收父级广播
                $scope.$on('app_notifice',function (e, regs) {
                    $scope.title=regs.title;
                })

            }]
        }
    });
//    底部tab导航
    app.directive('tabfoot', function () {
        return {
            restrict: 'EA',
            templateUrl: '../views/tabfoot_tpl.html',
            controller: ['$scope', function ($scope) {
                $scope.tabChange = function (index) {
                    //发送数据广播给父级
                    $scope.$emit('tab_notifice', {id: index});
                }
            }]
        }
    })
})(angular);
