app
// =========================================================================
// Show View and Delete funcionvital 
// =========================================================================
    .controller("FuncionvitalCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'name,codename';
    var params = {};
    $scope.lista = [];
    $scope.funcionvital = {};

    
    //$window.location = "#" + $location.path();

    $scope.list = function(params) {
        $scope.isLoading = true;
        topico2Service.Funcionvital.query(params, function(r) {
            $scope.lista = r;
            //$scope.options = r.options;
            $scope.isLoading = false;
        }, function(err) {
            $log.log("Error in list:" + JSON.stringify(err));
            toastr.error(err.data.results.detail, err.status + ' ' + err.statusText);
        });
    };
    $scope.list(params);

    $scope.buscar = function() {
        params.page = 1;
        params.fields = $scope.fields;
        params.query = $scope.query;
        $scope.list(params);
    };

    $scope.onReorder = function(order) { //TODO
        $log.log('Order: ' + order);
    };

    $scope.delete = function(d) {
        if ($window.confirm("Seguro?")) {
            topico2Service.Funcionvital.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó la funcionvital:" + JSON.stringify(d));
                toastr.success('Se eliminó la funcionvital ' + d.enfermedadactual, 'funcionvital');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update funcionvital
// =========================================================================
.controller("FuncionvitalSaveCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.funcionvital = {};

    $scope.sel = function() {
        topico2Service.Funcionvital.get({ id: $stateParams.id }, function(r) {
            $scope.funcionvital = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.funcionvital.id) {
            topico2Service.Funcionvital.update({ id: $scope.funcionvital.id }, $scope.funcionvital, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó la funcionvital ' + r.enfermedadactual, 'funcionvital');
                $state.go('topico2.topico2.funcionvitals');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            topico2Service.Funcionvital.save($scope.funcionvital, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó la funcionvital ' + r.enfermedadactual, 'funcionvital');
                $state.go('topico2.topico2.funcionvitals');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('topico2.topico2.funcionvitals');
    };
});
