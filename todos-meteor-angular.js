Tasks = new Mongo.Collection('tasks');

if (Tasks.find().count() === 0) {
   Tasks.insert({
    title: 'Buy grocerries',
    text: 'From the marketplace'
   });
   Tasks.insert({
     title: 'Fix the car',
     text: 'At the service'
    });
   Tasks.insert({
     title: 'Lear JavaScript',
     text: 'From the books'
   });
}

if (Meteor.isClient) {
  angular.module('simple-todos',['angular-meteor']);
  angular.module('simple-todos').controller('TodosListCtrl', ['$scope',
    function ($scope) {
      // $scope.tasks = $scope.$meteorCollection(Tasks); // deprecated
      $scope.helpers({
         tasks() {
         return Tasks.find({}, {sort: {createdAt: -1}});
         }
      });
    }]);
}
