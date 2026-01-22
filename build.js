#!/usr/bin/env node
const esbuild = require('esbuild')
const CopyPlugin = require('esbuild-plugin-copy')

async function build() {

    let isDev = false;
    if (process.argv.includes('-d')) {
        isDev = true;
    }

    const plugins = [
        CopyPlugin.copy({
            asserts: {
                from: ['./public/**/*'],
                to: ['./']
            }
        })

    ];

    const config = {
        entryPoints: [
            './src/popup.ts',
            './src/speed-read.ts',
        ],
        plugins: plugins,
        outdir: './dist',
        bundle: true,
        minify: true,
        format: 'esm',
        define: {
            'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`
        }
    }

    if (isDev) {
        config.minify = false;
    }

    await esbuild.build(config);
}

build().catch((err) => {
    console.log(err);
    process.exit(1);
});

