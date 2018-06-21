"use strict";

(function() {

    var BookController =  function(bookService, $log) {

    	var vm = this;

        vm.isHidden = false;
        vm.addvalues = {'bookTitle': '' ,'genre' : '','yearPublished' : ''};

        vm.hideTable = function()
        {
        	vm.isHidden = !vm.isHidden
        };

        function init() {
        	bookService.getBooks().then(function (results) {
           	vm.books = results;
           	$log.log("In the book controller the value of the result promise is ");
        	$log.log(JSON.stringify(vm.books));
            }, function (error) {
                vm.error = true;
                vm.errorMessage = error;
            });
       }

         vm.delete = function(bookToDelete) {
           bookService.deleteBook(bookToDelete);
           bookService.getBooks().then(function (results) {
           vm.books = results;
         });
          }

          vm.save = function() {
            bookService.saveBook(vm.addvalues);
            bookService.getBooks().then(function (results) {
            vm.books = results;
            vm.addvalues = "";
            location.reload();

          });
           }







       init();

    };

    angular.module('bookApp').controller('bookController', ['bookService','$log', BookController]);
}());
