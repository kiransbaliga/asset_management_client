module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-debugger': 'error',
    'no-trailing-spaces': 'error',
    'no-multi-spaces': 'error',
    indent: 'off',
    'max-len': [
      'error',
      {
        code: 150,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    'arrow-parens': ['error', 'always'],
    'prefer-destructuring': 'off',
    'space-in-parens': ['error', 'never'],
    'keyword-spacing': 'error',
    'comma-dangle': ['error', 'never'],
    'implicit-arrow-linebreak': 'off',
    'lines-between-class-members': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 0
      }
    ],
    radix: 'off',
    'eol-last': ['error', 'always'],
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'no-useless-constructor': 'error',
    'arrow-spacing': 'error',
    'space-infix-ops': 'error',
    'object-curly-spacing': ['error', 'always'],
    semi: ['error', 'always'],
    'space-before-blocks': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return'
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*'
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      }
    ],
    curly: ['error', 'multi', 'consistent'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        vars: 'local'
      }
    ],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions']
      }
    ],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description'
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off'
  }
};
