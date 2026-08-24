export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [0],
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'refactor',
        'perf',
        'test',
        'docs',
        'style',
        'ci',
        'build',
        'ui',
        'add',
      ],
    ],
  },
};
