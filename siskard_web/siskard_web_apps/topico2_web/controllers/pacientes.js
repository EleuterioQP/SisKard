app
// =========================================================================
// Show View and Delete paciente 
// =========================================================================
    .controller("PacienteCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'codigo,national_id_doc';
    var params = {};
    $scope.lista = [];
    $scope.paciente = {};

    
    //$window.location = "#" + $location.path();

    $scope.list = function(params) {
        $scope.isLoading = true;
        topico2Service.Paciente.query(params, function(r) {
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
            topico2Service.Paciente.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó la paciente:" + JSON.stringify(d));
                toastr.success('Se eliminó la paciente ' + d.enfermedadactual, 'paciente');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update paciente
// =========================================================================
.controller("PacienteSaveCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.paciente = {};

    $scope.sel = function() {
        topico2Service.Paciente.get({ id: $stateParams.id }, function(r) {
            $scope.paciente = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.paciente.id) {
            topico2Service.Paciente.update({ id: $scope.paciente.id }, $scope.paciente, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó la paciente ' + r.enfermedadactual, 'paciente');
                $state.go('topico2.topico2.pacientes');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            topico2Service.Paciente.save($scope.paciente, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó la paciente ' + r.enfermedadactual, 'paciente');
                $state.go('topico2.topico2.pacientes');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('topico2.topico2.pacientes');
    };
});
