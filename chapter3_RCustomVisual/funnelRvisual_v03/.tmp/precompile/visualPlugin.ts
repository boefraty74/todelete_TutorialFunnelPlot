module powerbi.visuals.plugins {
    export var funnelRvisualVer03 = {
        name: 'funnelRvisualVer03',
        displayName: 'funnelRvisualVer03',
        class: 'Visual',
        version: '1.0.3',
        apiVersion: '1.7.0',
        create: (options: extensibility.visual.VisualConstructorOptions) => new powerbi.extensibility.visual.funnelRvisualVer03.Visual(options),
        custom: true
    };
}
