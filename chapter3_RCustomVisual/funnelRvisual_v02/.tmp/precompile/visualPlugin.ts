module powerbi.visuals.plugins {
    export var funnelRvisualVer02 = {
        name: 'funnelRvisualVer02',
        displayName: 'funnelRvisualVer02',
        class: 'Visual',
        version: '1.0.2',
        apiVersion: '1.7.0',
        create: (options: extensibility.visual.VisualConstructorOptions) => new powerbi.extensibility.visual.funnelRvisualVer02.Visual(options),
        custom: true
    };
}
