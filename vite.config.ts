import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default () => {
  return defineConfig({
    build: {
      outDir: './build'
    },
    plugins: [
      react({
        exclude: /\.stories\.(t|j)sx?$/,
        include: '**/*.tsx',
      }),
      tsconfigPaths(),
      svgrPlugin({
        svgrOptions: {
          icon: false,
        },
      }),
    ],
    server: {
      host: 'localhost',
      port: 3000,
      /*
      proxy: {
          '/api': {
              changeOrigin: true,
              target: 'https://your.host/',
              secure: false,
          },
      },
      cors: false,*/
    },
    esbuild: {
      define: {
        this: 'window'
      },
      jsxFactory: `jsx`,
    },
  })
}
