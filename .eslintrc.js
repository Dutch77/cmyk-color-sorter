module.exports = {
    'parser': 'vue-eslint-parser',
    'parserOptions': {
        'parser': '@typescript-eslint/parser',
    },
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'plugin:vue/vue3-recommended',
        // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
        '@vue/typescript',
    ],
    rules: {
        'max-len': ['error', 120, 2],
        'comma-dangle': ['error', 'always-multiline'],
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        '@typescript-eslint/quotes': ['error', 'single'],
        'vue/attribute-hyphenation': ['error', 'never'],
    },
};
