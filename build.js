const esbuild = require('esbuild');
const fs = require('fs');

esbuild.build({
    entryPoints: ['src/js/main.js'],
    bundle: true,
    minify: true,
    treeShaking: true,
    sourcemap: false,
    outfile: 'dist/bundle.js',
    format: 'iife',
    target: ['esnext'],
    legalComments: 'none',
    define: {
        'process.env.NODE_ENV': '"production"',
        'global': 'globalThis'
    },
    external: ['pixi.js'],
    globalName: 'PIXI',
    plugins: [],
    loader: {
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.jpeg': 'dataurl',
        '.gif': 'dataurl',
        '.glb': 'dataurl',
        '.gltf': 'dataurl',
        '.mp3': 'dataurl',
        '.json': 'json',
        '.atlas': 'text',
        '.glsl': 'text',
        '.frag': 'text',
        '.vert': 'text'
    },
    metafile: true, // bật phân tích
    logLevel: 'info'
}).then(result => {
    // Lưu metafile JSON
    fs.writeFileSync('meta.json', JSON.stringify(result.metafile, null, 2));
    // console.log('✅ Build thành công! Metafile lưu ở meta.json');

    // // In phân tích ra terminal
    // const text = esbuild.analyzeMetafileSync(result.metafile, { verbose: true });
    // console.log('\n📊 Phân tích dung lượng bundle:\n');
    // console.log(text);
    // console.log('\n👉 Bạn có thể mở https://esbuild.github.io/analyze/ và upload file meta.json để xem biểu đồ trực quan.');
}).catch(() => process.exit(1));
