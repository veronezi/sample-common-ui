let defaultPresets;

if (process.env.BABEL_ENV === 'es') {
    defaultPresets = [];
} else {
    defaultPresets = [
        [
            '@babel/preset-env',
            {
                modules: ['esm', 'production-umd'].includes(process.env.BABEL_ENV) ? false : 'commonjs',
            },
        ],
    ];
}

const defaultAlias = {
    'sample-common-ui': './src',
};

const productionPlugins = [
    'babel-plugin-transform-react-constant-elements',
    'babel-plugin-transform-dev-warning',
    ['babel-plugin-react-remove-properties', {properties: ['data-mui-test']}],
    [
        'babel-plugin-transform-react-remove-prop-types',
        {
            mode: 'unsafe-wrap',
        },
    ],
];

module.exports = {
    presets: defaultPresets.concat(['@babel/preset-react']),
    plugins: [
        'babel-plugin-optimize-clsx',
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        ['@babel/plugin-proposal-object-rest-spread', {loose: true}],
        '@babel/plugin-transform-runtime',
    ],
    ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
    env: {
        cjs: {
            plugins: productionPlugins,
        },
        coverage: {
            plugins: [
                'babel-plugin-istanbul',
                [
                    'babel-plugin-module-resolver',
                    {
                        root: ['./'],
                        alias: defaultAlias,
                    },
                ],
            ],
        },
        development: {
            plugins: [
                [
                    'babel-plugin-module-resolver',
                    {
                        alias: {
                            modules: './modules',
                        },
                    },
                ],
            ],
        },
        esm: {
            plugins: productionPlugins,
        },
        es: {
            plugins: productionPlugins,
        },
        production: {
            plugins: productionPlugins,
        },
        'production-umd': {
            plugins: productionPlugins,
        },
        test: {
            sourceMaps: 'both',
            plugins: [
                [
                    'babel-plugin-module-resolver',
                    {
                        root: ['./'],
                        alias: defaultAlias,
                    },
                ],
            ],
        },
    },
};
