const CracoAlias = require('craco-alias');

module.exports = {
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				baseUrl: './src',
				tsConfigPath: './tsconfig.json',
			},
		},
	],
  devServer: {
    proxy: {
			'/api': {
				target: 'https://jlvadtrbkq.us16.qoddiapp.com',
				changeOrigin: true,
        pathRewrite: { '^/api': '' },
			},
		},
  },
};
