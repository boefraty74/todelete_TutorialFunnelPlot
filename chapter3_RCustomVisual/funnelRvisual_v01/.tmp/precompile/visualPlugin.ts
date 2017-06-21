module powerbi.visuals.plugins {
    export var funnelRvisualVer01 = {
        name: 'funnelRvisualVer01',
        displayName: 'funnelRvisualVer01',
        class: 'Visual',
        version: '1.0.1',
        apiVersion: '1.7.0',
        create: (options: extensibility.visual.VisualConstructorOptions) => new powerbi.extensibility.visual.funnelRvisualVer01.Visual(options),
        custom: true
    };
}
