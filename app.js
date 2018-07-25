var contactApp = angular.module("contactApp", ['ngRoute','ngMaterial']); 

contactApp.controller("mainController",function($scope,$mdDialog){
    document.getElementById('myModal').style.display = "none";
    $scope.phoneNumPat = /^\+?\d{10}$/;
    if(!localStorage.hasOwnProperty('contactList')){
        $scope.contactList=[];
    }else{
        $scope.contactList=JSON.parse(localStorage.contactList);
    }

$scope.goToPerson = function(person) {
    $scope.personDet = person;
    document.getElementById('showContactModal').style.display = "block";
};
$scope.addContactDialog = function() {
    $scope.createContact=false;
    $scope.contactInfo = {};
    document.getElementById('myModal').style.display = "block";
};
$scope.editContactDialog = function(phoneNum) {
    $scope.createContact=true;
    for(var i=0;i<$scope.contactList.length;i++)
    {
        if(phoneNum==$scope.contactList[i].phone){
            $scope.contactInfo=$scope.contactList[i];
        }
    }
    document.getElementById('myModal').style.display = "block";
};
$scope.saveContact = function(contactInfo,isUpdate) {
    document.getElementById("contactForm").submit();
    if(isUpdate==true)
    {
        for(var i=0;i<$scope.contactList.length;i++)
        {
            if(contactInfo.phone==$scope.contactList[i].phone){
                $scope.contactList.splice(i, 1);
                $scope.addNewContact(contactInfo);
            }
        }
    }
    else
    {
        $scope.counter=0;
        for(var i=0;i<$scope.contactList.length;i++)
        {
            if(contactInfo.phone==$scope.contactList[i].phone){
                $scope.counter=1;
               alert("Contact number already exists by name "+$scope.contactList[i].firstName+" "+$scope.contactList[i].lastName);
                break;
            }
        }
        if($scope.counter==0){
            $scope.addNewContact(contactInfo);
        }
    }
}     
$scope.addNewContact = function(contactInfo){
    var person = {
        "firstName" : contactInfo.firstName,
        "lastName" : contactInfo.lastName,
        "phone" : contactInfo.phone,
        "email" : contactInfo.email,
        "company" : contactInfo.company,
        "active" : contactInfo.active
    };
    $scope.contactList.push(person);
    localStorage.setItem("contactList",JSON.stringify($scope.contactList));
    $scope.contactInfo = {};
    document.getElementById("contactForm").reset();
    document.getElementById('myModal').style.display = "none";
    
}
$scope.deleteContactDialog = function(phoneNum,ev) {
    var confirm = $mdDialog.confirm()
        .title('Delete Contact')
        .textContent('Would you like to delete contact?')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
        $scope.deleteContact(phoneNum);
    }, function() {
      
    });
};
$scope.deleteContact =function(phoneNum){
    for(var i=0;i<$scope.contactList.length;i++)
    {
        if(phoneNum==$scope.contactList[i].phone){
            $scope.contactList.splice(i, 1);
            localStorage.setItem("contactList",JSON.stringify($scope.contactList));
        }
    }
}
$scope.cancelContact = function(){
    if(!localStorage.hasOwnProperty('contactList')){
        $scope.contactList=[];
    }else{
        $scope.contactList=JSON.parse(localStorage.contactList);
    }
    $scope.contactInfo = {};
    document.getElementById("contactForm").reset();
    document.getElementById('myModal').style.display = "none";
}
$scope.cancelContactView = function(){
    document.getElementById('showContactModal').style.display = "none";
}
});
