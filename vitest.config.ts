import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['./tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      thresholds: {
        100: true
      },
      watermarks: {
        statements: [80, 100],
        functions: [80, 100],
        branches: [80, 100],
        lines: [80, 100]
      }
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
