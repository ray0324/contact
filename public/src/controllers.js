angular.module('ContactsApp')
    .controller('ListController', ['$scope','$location','Contact',function($scope,$location,Contact){
        $scope.contacts=Contact.query();
        $scope.fields = ['firstName','lastName'];
        $scope.sort = function(field){
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        };
        $scope.sort.field = 'firstName';
        $scope.sort.order = false;

        $scope.show =function(id){
            $location.url('/contact/'+id);
        }        
    }])

    .controller('NewController',['$scope','$location','Contact',function($scope,$location,Contact){
        $scope.contact = new Contact({
            firstName:['','text'],
            lastName: ['','text'],
            email:    ['','email'],
            homePhone:['','tel'],
            cellPhone:['','tel'],
            birthday: ['','date'],
            website:  ['','url'],
            address:  ['','text']
        });
        console.log($scope.contact);
        $scope.save=  function(){
            if($scope.newContact.$invalid){
                $scope.$broadcast('record:invalid');
            }else{
                $scope.contact.$save();
                $location.url('/contact');
            }
        }

    }]);