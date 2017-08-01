/**
* myFlight Module
*
* Description
*/
angular.module('myFlight', ['ngRoute'])
.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/flightManage", {
        templateUrl: 'flightManage.html'
    }).when("/ticketManage", {
        templateUrl: "ticketManage.html"
    }).when("/ticketReserve", {
        templateUrl: "ticketReserve.html"
    }).when("/myOrder", {
        templateUrl: "myOrder.html"
    }).when("/myInfo", {
        templateUrl: "myInfo.html"
    }).otherwise({
        // templateUrl: "index.html"
    });
}])
.controller('FlightController', ['$scope', '$http', '$httpParamSerializer', function($scope, $http, $hps) {
    var currId="";
    //调用的方法
    $scope.allFlights = function(page) {

        $http.post("http://192.168.1.8:8080/ticketSystem/flight/getFlightsByFuzzy", $hps($scope.searchFlights) + "&pageNo=" + page, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(resp) {

            //数据绑定到view 层展示
            $scope.params = resp.data.results;

            var totalPages = resp.data.pageCount;
            var currentPage = resp.data.currentPage;

            //Bootstrap 分页 
            var options = {
                bootstrapMajorVersion: 3,
                currentPage: currentPage,
                totalPages: totalPages,
                size: "normal",
                alignment: "center",
                onPageClicked: function(e, originalEvent, type, page) {
                    $scope.allFlights(page);
                }
            }
            $('#paginator').bootstrapPaginator(options);
        });
    }

    $scope.allFlights(1);

    //修改航班
    $scope.doModify=function(no){
        $http.post("http://192.168.1.8:8080/ticketSystem/flight/getFlightDetail","no="+no , {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(resp) {
            $scope.modData=resp.data.data;
            $("#m1").modal("show");
        });
    }
    $scope.modifyFlight=function(){
        $http.post("http://192.168.1.8:8080/ticketSystem/flight/modify",$hps($scope.modData),{
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(resp) {
            $scope.allFlights(1);
            $("#m1").modal("hide");
        });
    }

    //添加航班

    $scope.addFlight=function(){
        $http.post("http://192.168.1.8:8080/ticketSystem/flight/add",$hps($scope.addData),{
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(resp){
            $scope.allFlights(1);
            $("#m3").modal("hide");
        })
    }

    //删除航班
    
    $scope.doDelete=function(id){
        currId=id;
        $('#m2').modal("show");
    }
    $scope.deleteFlight=function(){
        console.log(id);
        $http.post("http://192.168.1.8:8080/ticketSystem/flight/delete","id="+currId,{
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(resp){
            console.log(resp.data);
            alert(resp.data.msg);
            $scope.allFlights(1);
            $("#m2").modal("hide");
        })
    }

    //票务查询

    
}])