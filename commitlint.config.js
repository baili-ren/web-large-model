
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'doc', 'release', 'test', 'chore', 'style', 'build', 'ci', 'perf', 'revert']],
        'type-case': [2, 'always', 'lower-case'],
        'subject-case': [0, 'never'],
        'subject-empty': [2, 'never'],
        'type-empty': [2, 'never']
    }
};