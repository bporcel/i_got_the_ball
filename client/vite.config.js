export default {
    root: './src',
    envDir: '../',
    build: {
        outDir: '../dist'
    },
    server: {
        port: 3000,
        proxy: {
            '/api': 'http://localhost:8888/.netlify/functions/api'
        }
    }
}
