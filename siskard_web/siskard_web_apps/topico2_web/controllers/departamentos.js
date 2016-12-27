app
// =========================================================================
// Show View and Delete departamento 
// =========================================================================
    .controller("DepartamentoCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'name,codename';
    var params = {};
    $scope.lista = [];
    $scope.departamento = {};

    
    //$window.location = "#" + $location.path();

    $scope.list = function(params) {
        $scope.isLoading = true;
        topico2Service.Departamento.query(params, function(r) {
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
            topico2Service.Departamento.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó la departamento:" + JSON.stringify(d));
                toastr.success('Se eliminó la departamento ' + d.enfermedadactual, 'departamento');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update departamento
// =========================================================================
.controller("DepartamentoSaveCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.departamento = {};

    $scope.sel = function() {
        topico2Service.Departamento.get({ id: $stateParams.id }, function(r) {
            $scope.departamento = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.departamento.id) {
            topico2Service.Departamento.update({ id: $scope.departamento.id }, $scope.departamento, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó la departamento ' + r.enfermedadactual, 'departamento');
                $state.go('topico2.topico2.departamentos');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            topico2Service.Departamento.save($scope.departamento, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó la departamento ' + r.enfermedadactual, 'departamento');
                $state.go('topico2.topico2.departamentos');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('topico2.topico2.departamentos');
    };
});
