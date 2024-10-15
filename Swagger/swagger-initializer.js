window.onload = function() {
    window.ui = SwaggerUIBundle({
        configUrl: "/swagger-config.json",  // Замените URL на ваш конфигурационный файл
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        queryConfigEnabled: false,
    });
}
