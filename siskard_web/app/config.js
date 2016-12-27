var baseUrl = 'http://localhost:9000/';
var loginUrl = 'http://localhost:9001/auth_web/';

var config = {
    baseUrl: baseUrl,
    loginUrl: loginUrl,
};

app.value('config', config);

app
    .config(function($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.interceptors.push('authInterceptorService');
    })

.run(function($rootScope, $state, $stateParams, $window, authService) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    /*******************************agregado**************************/
    //console.log("run");

    authService.fillAuthData();
    if (authService.authentication.isAuth === false) {
        //$window.location = loginUrl;
    }
    /******************************************************************/

})


.config(function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
})

.config(function($mdDateLocaleProvider, $provide) {

    $mdDateLocaleProvider.shortDays = [
        'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'
    ];
    
    // Can change week display to start on Domingo.
    $mdDateLocaleProvider.firstDayOfWeek = 0;

    // Example uses moment.js to parse and format dates.
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
    $mdDateLocaleProvider.formatDate = function(date) {
        if (angular.isDate(date)) {
            var m = moment(date);
            return m.isValid() ? m.format('DD/MM/YYYY') : '';
        }
        return '';
    };

})

.config(
    function($mdIconProvider, $$mdSvgRegistry) {
        // Add default icons from angular material para versiones no estables mayores a v1.0.9
        // la version v1.0.9 no necesita hacer esto
        $mdIconProvider
            .icon('md-close', $$mdSvgRegistry.mdClose)
            .icon('md-menu', $$mdSvgRegistry.mdMenu)
            .icon('md-toggle-arrow', $$mdSvgRegistry.mdToggleArrow);
    }
);



app.constant('ROUTERS_T', [{
    "estado.nombre.1": {
        "url": "/url",
        "data": {
            "section": "Menu name",
            "page": "Menu item name"
        },
        "templateUrl": "appname_web_apps/appname_web/views/model/index.html"
    }

}, {
    "estado.nombre.2": {
        "url": "/url2",
        "data": {
            "section": "Menu name2",
            "page": "Menu item name2"
        },
        "templateUrl": "appname_web_apps/appname_web/views/model2/index.html"
    }

}]);


app.constant('ROUTERS', [{
    "estado.nombre": {
        "url": "/url",
        "data": {
            "section": "Menu name",
            "page": "Menu item name"
        },
        "templateUrl": "appname_web_apps/appname_web/views/model/index.html"
    },

}, {
    "topico2": {
        "url": "/topico2",
        "views": {
            "": {
                "templateUrl": "app/views/layout.html"
            },
            "aside": {
                "templateUrl": "app/views/aside.html"
            },
            "content": {
                "templateUrl": "app/views/content.html"
            }
        }
    },


   
    "topico2.topico2": {
        "url": "/topico2",
        "template": "<div ui-view ></div>"
    }
}, {
    "topico2.topico2.historias": {
        "url": "/historias",
        "data": {
            "section": "Historia",
            "page": "Historias"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/historias/index.html"
    },
    "topico2.topico2.historiasNew": {
        "url": "/historias/new",
        "data": {
            "section": "Historia",
            "page": "Historias"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/historias/form.html"
    },
    "topico2.topico2.historiasEdit": {
        "url": "/historias/:id/edit",
        "data": {
            "section": "Historia",
            "page": "Historias"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/historias/form.html"
    }
}, { 
    "topico2.topico2.medicamentos": {
        "url": "/medicamentos",
        "data": {
            "section": "Medicamento",
            "page": "Medicamentos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/medicamentos/index.html"
    },
    "topico2.topico2.medicamentosNew": {
        "url": "/medicamentos/new",
        "data": {
            "section": "Medicamento",
            "page": "Medicamentos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/medicamentos/form.html"
    },
    "topico2.topico2.medicamentosEdit": {
        "url": "/medicamentos/:id/edit",
        "data": {
            "section": "Medicamento",
            "page": "Medicamentos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/medicamentos/form.html"
    }
},

{
    "topico2.topico2.tratamientos": {
        "url": "/tratamientos",
        "data": {
            "section": "Tratamiento",
            "page": "Tratamientos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/tratamientos/index.html"
    },
    "topico2.topico2.tratamientosNew": {
        "url": "/tratamientos/new",
        "data": {
            "section": "Tratamiento",
            "page": "Tratamientos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/tratamientos/form.html"
    },
    "topico2.topico2.tratamientosEdit": {
        "url": "/tratamientos/:id/edit",
        "data": {
            "section": "Tratamiento",
            "page": "Tratamientos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/tratamientos/form.html"
    }
},


{ 
    "topico2.topico2.consultas": {
        "url": "/consultas",
        "data": {
            "section": "Consulta",
            "page": "Consultas"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/consultas/index.html"
    },
    "topico2.topico2.consultasNew": {
        "url": "/consultas/new",
        "data": {
            "section": "Consulta",
            "page": "Consultas"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/consultas/form.html"
    },
    "topico2.topico2.consultasEdit": {
        "url": "/consultas/:id/edit",
        "data": {
            "section": "Consulta",
            "page": "Consultas"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/consultas/form.html"
    }
},

{ 
    "topico2.topico2.diagnosticos": {
        "url": "/diagnosticos",
        "data": {
            "section": "Diagnostico",
            "page": "Diagnosticos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/diagnosticos/index.html"
    },
    "topico2.topico2.diagnosticosNew": {
        "url": "/diagnosticos/new",
        "data": {
            "section": "Diagnostico",
            "page": "Diagnosticos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/diagnosticos/form.html"
    },
    "topico2.topico2.diagnosticosEdit": {
        "url": "/diagnosticos/:id/edit",
        "data": {
            "section": "Diagnostico",
            "page": "Diagnosticos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/diagnosticos/form.html"
    }
},
{ 
    "topico2.topico2.especificacionrecetas": {
        "url": "/especificacionrecetas",
        "data": {
            "section": "EspecificacionReceta",
            "page": "EspecificacionRecetas"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/especificacionrecetas/index.html"
    },
    "topico2.topico2.especificacionrecetasNew": {
        "url": "/especificacionrecetas/new",
        "data": {
            "section": "EspecificacionReceta",
            "page": "EspecificacionRecetas"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/especificacionrecetas/form.html"
    },
    "topico2.topico2.especificacionrecetasEdit": {
        "url": "/especificacionrecetas/:id/edit",
        "data": {
            "section": "EspecificacionReceta",
            "page": "EspecificacionRecetas"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/especificacionrecetas/form.html"
    }
},
{ 
    "topico2.topico2.departamentos": {
        "url": "/departamentos",
        "data": {
            "section": "Departamento",
            "page": "Departamentos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/departamentos/index.html"
    },
    "topico2.topico2.departamentosNew": {
        "url": "/departamentos/new",
        "data": {
            "section": "Departamento",
            "page": "Departamentos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/departamentos/form.html"
    },
    "topico2.topico2.departamentosEdit": {
        "url": "/departamentos/:id/edit",
        "data": {
            "section": "Departamento",
            "page": "Departamentos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/departamentos/form.html"
    }
},
{ 
    "topico2.topico2.pacientes": {
        "url": "/pacientes",
        "data": {
            "section": "Paciente",
            "page": "Pacientes"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/pacientes/index.html"
    },
    "topico2.topico2.pacientesNew": {
        "url": "/pacientes/new",
        "data": {
            "section": "Paciente",
            "page": "Pacientes"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/pacientes/form.html"
    },
    "topico2.topico2.pacientesEdit": {
        "url": "/pacientes/:id/edit",
        "data": {
            "section": "Paciente",
            "page": "Pacientes"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/pacientes/form.html"
    }
},{ 
    "topico2.topico2.antecedentemedicos": {
        "url": "/antecedentemedicos",
        "data": {
            "section": "Antecedentemedico",
            "page": "Antecedentemedicos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/antecedentemedicos/index.html"
    },
    "topico2.topico2.antecedentemedicosNew": {
        "url": "/antecedentemedicos/new",
        "data": {
            "section": "Antecedentemedico",
            "page": "Antecedentemedicos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/antecedentemedicos/form.html"
    },
    "topico2.topico2.antecedentemedicosEdit": {
        "url": "/antecedentemedicos/:id/edit",
        "data": {
            "section": "Antecedentemedico",
            "page": "Antecedentemedicos"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/antecedentemedicos/form.html"
    }
},{
    "topico2.topico2.funcionvitals": {
        "url": "/funcionvitals",
        "data": {
            "section": "Funcionvital",
            "page": "Funcionvitals"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/funcionvitals/index.html"
    },
    "topico2.topico2.funcionvitalsNew": {
        "url": "/funcionvitals/new",
        "data": {
            "section": "Funcionvital",
            "page": "Funcionvitals"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/funcionvitals/form.html"
    },
    "topico2.topico2.funcionvitalsEdit": {
        "url": "/funcionvitals/:id/edit",
        "data": {
            "section": "Funcionvital",
            "page": "Funcionvitals"
        },
        "templateUrl": "siskard_web_apps/topico2_web/views/funcionvitals/form.html"
    }
},
]);
