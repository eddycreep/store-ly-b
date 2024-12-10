window.onload = function() {
    //<editor-fold desc="Changeable Configuration Block">
  
    // the following lines will be replaced by docker/configurator, when it runs in a docker-container
    window.onload = function() {
        const ui = SwaggerUIBundle({
            url: '/docs.json', // Change this if necessary
            dom_id: '#swagger-ui',
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
            ],
            layout: "BaseLayout",
            deepLinking: true,
            showExtensions: true,
            showCommonExtensions: true,
        });
        window.ui = ui;
    };
    //</editor-fold>
  };