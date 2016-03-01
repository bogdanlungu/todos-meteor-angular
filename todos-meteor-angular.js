Tasks = new Mongo.Collection('tasks');

/*
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
     title: 'Learn JavaScript',
     text: 'From the books'
   });
}
*/


if (Meteor.isClient) {
  angular.module('simple-todos',['angular-meteor']);
  angular.module('simple-todos').controller('TodosListCtrl', ['$scope',
    function ($scope) {
      $scope.helpers({
         tasks() {
            return Tasks.find({}, {sort: {createdAt: -1}});
         }
      });

      $scope.addTask = function (title, text) {
      if(!((typeof title === 'undefined') && (typeof text === 'undefined'))){
        if((title.length > 0) && (text.length > 3)){
          Tasks.insert({
           title: title,
           text: text
          });

          // reset the fields
          $scope.title = '';
          $scope.text = '';
        }else{
          alert("Please complete the fields");
        }
      }else{
        alert("Please complete the fields");
      }
    }

    $scope.removeTask = function(task){
      Meteor.call('removeTask', task, function(error, result){
        if(error){
          alert('There is an error the task was not removed');
        }else{
          alert("Removed!");
        }
        });
    }

    }]);

// Meteor.call('removeAllTasks');

}

Meteor.methods({
  removeAllTasks: function() {
    return Tasks.remove({});
  },

  removeTask: function(id){
    Tasks.remove({_id: id});
  }
});
