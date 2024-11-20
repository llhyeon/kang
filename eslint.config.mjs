import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        gsap: true,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
];
