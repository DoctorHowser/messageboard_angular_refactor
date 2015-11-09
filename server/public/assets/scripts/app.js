/**
 * Created by danesmith on 11/6/15.
 */
var myApp = angular.module('myApp', []);

myApp.controller("MessageController", ['$scope', '$http', function($scope, $http){
    $scope.post = {};
    $scope.postArray = [];

    $scope.clickSubmit = function(data){

        $http.post('/submit', data).then(function(response){
           $scope.getPosts();
        });
    };

    $scope.getPosts = function(){
        $http.get('/submit').then(function(response){
           $scope.postArray = response.data;
        });
    };



$scope.getPosts();


}]);

//$(document).ready(function(){
//
//   $('#postMaker').submit(clickSubmit);
//    refreshPage();
//});
//
//function refreshPage(){
//    console.log('refresh page fired');
//    $.ajax({
//        type: 'GET',
//        url: '/submit',
//        success: function(data){
//            writeDom(data);
//        }
//    })
//}
//function writeDom(data){
//    console.log('write dom fired');
//    $('#messageBoard').empty();
//    for(var i = 0; i < data.length; i++){
//        var postInfo = "<div class='well' data-id='" + data[i].id +"'>" +
//                            "<div>" + data[i].name + "</div>" +
//                            "<div>" + data[i].post + "</div>" +
//                        "</div>";
//        $('#messageBoard').append(postInfo);
//    }
//}
//
//
////function makePost(postObject){
////    console.log(postObject);
////    $.ajax({
////
////        type: 'POST',
////        url: '/submit',
////        data: postObject,
////        success: function(data){
////            refreshPage();
////        }
////    });
////}
//
//function clickSubmit(event){
//    console.log('click submit fired');
//    event.preventDefault();
//    var values = {};
//
//    $.each($(this).serializeArray(), function(i, field){
//        values[field.name] = field.value;
//    });
//
//
//    //console.log(values);
//    $.ajax({
//        type: 'POST',
//        url: '/submit',
//        data: values,
//        success: function(data){
//            //reset form
//            $('#postMaker').trigger("reset");
//            //start repopulate
//            refreshPage();
//        }
//    });
//}
