app
// =========================================================================
// Show View and Delete antecedentemedico 
// =========================================================================
    .controller("AntecedentemedicoCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'name,codename';
    var params = {};
    $scope.lista = [];
    $scope.antecedentemedico = {};

    
    //$window.location = "#" + $location.path();

    $scope.list = function(params) {
        $scope.isLoading = true;
        topico2Service.Antecedentemedico.query(params, function(r) {
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
            topico2Service.Antecedentemedico.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó la antecedentemedico:" + JSON.stringify(d));
                toastr.success('Se eliminó la antecedentemedico ' + d.enfermedadactual, 'antecedentemedico');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update antecedentemedico
// =========================================================================
.controller("AntecedentemedicoSaveCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.antecedentemedico = {};

    $scope.sel = function() {
        topico2Service.Antecedentemedico.get({ id: $stateParams.id }, function(r) {
            $scope.antecedentemedico = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.antecedentemedico.id) {
            topico2Service.Antecedentemedico.update({ id: $scope.antecedentemedico.id }, $scope.antecedentemedico, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó la antecedentemedico ' + r.enfermedadactual, 'antecedentemedico');
                $state.go('topico2.topico2.antecedentemedicos');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            topico2Service.Antecedentemedico.save($scope.antecedentemedico, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó la antecedentemedico ' + r.enfermedadactual, 'antecedentemedico');
                $state.go('topico2.topico2.antecedentemedicos');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('topico2.topico2.antecedentemedicos');
    };
});
