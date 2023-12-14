import { defineConfig } from 'unocss/vite';
import presetUno from 'unocss/preset-uno';
import presetIcons from 'unocss/preset-icons';

export default defineConfig({
  transformers: [],
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', '.git', '.husky', '.vscode', 'public', 'build', 'mock'],
    },
  },
  presets: [
    presetUno({ dark: 'class' }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-between': 'flex justify-between items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'fixed-lt': 'fixed left-0 top-0',
    'fixed-center': 'fixed-lt flex-center w-full h-full',
    'transition-base': 'transition-all duration-300 ease-in-out',
  },
  safelist: [...'prose prose-sm m-auto text-left'.split(' ')],
});
