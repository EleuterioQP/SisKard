
app
//------------------------------
// TODO: API menu
// por lo pronto colocar aqui el menu para su Modelo, vease test1
//------------------------------
    .factory("menuService", function(authService) {


    var sections = [
        /*
        {
          title: 'Getting Started',
          state: 'getting-started',
          url: '/getting-started',
          type: 'link'
        }
        */
    ];

    sections.push({
        title: 'Dashboard',
        state: 'app.dashboard',
        type: 'link'
    });


    sections.push({

            menu: [{
                title: 'Menu Principal',
                type: 'toggle',
                state: 'topico2.topico2',
                menu_items: [  {
                    title: 'nuevo',
                    state: 'topico2.topico2.historias',
                    type: 'link'
                },

                {
                    title: 'Modificar',
                    state: 'topico2.topico2.consultas',
                    type: 'link'
                },
              
                {
                    title: 'Consultas',
                    state: 'topico2.topico2.tratamientos',
                    type: 'link'
                },

                {
                    title: 'Actualizar',
                    state: 'topico2.topico2.especificacionrecetas',
                    type: 'link'
                },

                {
                    title: 'Backup',
                    state: 'topico2.topico2.especificacionrecetas',
                    type: 'link'
                },
                {                                    
                    title: 'Mantenimiento',
                    state: 'topico2.topico2.especificacionrecetas',
                    type: 'link'
                    
                    },
                 
                              

                {
                    title: 'Reportes',
                    state: 'topico2.topico2.especificacionrecetas',
                    type: 'link'
                },
                

                ]
            }]
        });


sections.push({

            menu: [{
                title: 'Menu',
                type: 'toggle',
                state: 'topico2.topico2',
                menu_items: [{
                    title: 'Departamento',
                    state: 'topico2.topico2.departamentos',
                    type: 'link'
                },
                
                {
                    title: 'Paciente',
                    state: 'topico2.topico2.pacientes',
                    type: 'link'
                },
                  
                  {
                    title: 'Funcionvital',
                    state: 'topico2.topico2.funcionvitals',
                    type: 'link'
                },

                {
                    title: 'Antecedentemedico',
                    state: 'topico2.topico2.antecedentemedicos',
                    type: 'link'
                },
                


                 ]
            }]

        });






        sections.push({

            menu: [{
                title: 'Otro',
                type: 'toggle',
                state: 'topico2.topico2',
                menu_items: [{
                    title: 'Medicamento',
                    state: 'topico2.topico2.medicamentos',
                    type: 'link'
                },
                {
                    title: 'Diagnostico',
                    state: 'topico2.topico2.diagnosticos',
                    type: 'link'
                },
                {
                    title: 'trabajador',
                    state: 'auths.system.permission',
                    type: 'link'
                },

                 ]
            }]

        });





    

    sections.push({

        menu: [{
            title: 'Otro 2',
            type: 'toggle',
            state: 'auths.system',
            menu_items: [{
                title: 'Trabajadores',
                state: 'auths.system.ct',
                type: 'link'
            }, {
                title: 'Medicamentos',
                state: 'auths.system.permission',
                type: 'link'
            }, {
                title: 'CIE 10',
                state: 'auths.system.menu',
                type: 'link'
            },  ]
        }]
    });

    authService.getMenu().then(function(r) {
        menu = r.data;
        console.log("menuService.authService.getMenu():" + JSON.stringify(menu));
        sections.push(

            menu
        );

    }, function(error) {
        console.log("error in menuService.authService.getMenu():" + JSON.stringify(error));
    });








    return {
        sections: sections,
    };
});





