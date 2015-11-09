/**
 * Created by danesmith on 11/6/15.
 */
var myApp = angular.module('myApp', []);



myApp.controller("MessageController", ['$scope', '$http', function($scope, $http){
    $scope.post = {};
    $scope.postArray = [];

    //myApp.config.$http.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
    myApp.config(function($httpProvider) {
        //$http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w'
        $httpProvider.defaults.headers.delete = { 'Content-Type' : 'application/json' };
    });

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

    $scope.deletePost = function(deleteId){
    console.log(deleteId);
        $http.post('/admin', deleteId).then(function(response){
          $scope.getPosts();
        });
    };

    $scope.getPosts();


}]);

//$(document).ready(function(){
//    console.log('reaching admin script');
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
//        var postInfo = "<div class='well post' data-id='" + data[i].id +"'>" +
//                            "<div>" + data[i].name + "</div>" +
//                            "<div>" + data[i].post + "</div>" +
//                            "<button type='button' class='btn btn-danger delete'>Delete</button>" +
//
//                        "</div>";
//        $('#messageBoard').append(postInfo);
//
//    }
//    $('.post').on('click', '.delete', deletePost)
//}
//
//function deletePost(){
//    var deleteID = {
//        id : $(this).closest('.post').data('id')
//    };
//    $.ajax({
//        type: 'DELETE',
//        url: '/admin',
//        data: deleteID,
//        success: function(data){
//            refreshPage();
//        }
//    });
//}
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
