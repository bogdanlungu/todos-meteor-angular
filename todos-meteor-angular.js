Tasks = new Mongo.Collection('tasks');

/*
if (Tasks.find().count() === 0) {
   Tasks.insert({
    title: 'Buy grocerries',
    text: 'From the marketplace',
    done: false
   });
   Tasks.insert({
     title: 'Fix the car',
     text: 'At the service',
     done: false
    });
   Tasks.insert({
     title: 'Learn JavaScript',
     text: 'From the books',
     done: false
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
          // alert("Removed!");
        }
      });
    }

    $scope.checkTask = function(task){
      var taskDetails = Tasks.findOne({_id: task});
      return taskDetails.done;
    }

    $scope.taskDone = function(task){
      var status = $scope.checkTask(task);
      if(typeof(status) === "boolean"){
         status = !status;
         Meteor.call('updateTask', task, status, function(error, result){
           if(error){
             alert('There is an error the task could not be updated');
           }
         });
      }else{
        alert("There is an error, the status is not boolean");
      }
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
  },

  updateTask: function(id, status){
    var tasksDetails = {
      done: status
    }
    Tasks.update({_id: id}, {$set: tasksDetails});
  }
});
