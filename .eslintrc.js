module.exports = {
	root: true,
	env: {
		node: true,
		browser: true
	},
	'extends': [
		'plugin:vue/essential',
		'eslint:recommended'
	],
	rules: {
		'no-console': ['warn', { 'allow': ['info', 'warn', 'error', 'time', 'timeEnd'] }],
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-constant-condition': 'warn',
		'block-scoped-var': 'error',
		'curly': ['error', 'multi-line'],
		'no-empty': ['error', {
			'allowEmptyCatch': true
		}],
		'no-extra-bind': 'error',
		'no-extra-label': 'error',
		'no-extra-boolean-cast': 'off',
		'no-floating-decimal': 'error',
		'no-implied-eval': 'error',
		'no-iterator': 'error',
		'no-loop-func': 'error',
		'no-multi-spaces': 'error',
		'no-proto': 'error',
		'no-script-url': 'error',
		'no-throw-literal': 'error',
		'no-useless-call': 'error',
		'no-with': 'error',
		'prefer-promise-reject-errors': 'error',
		'wrap-iife': ['error', 'inside'],
		'no-use-before-define': 'error',
		'no-case-declarations': 'off',
		'array-bracket-spacing': ['error', 'never'],
		'block-spacing': 'error',
		'brace-style': ['error', '1tbs', {
			'allowSingleLine': true
		}],
		'camelcase': 'error',
		'comma-dangle': 'error',
		'comma-spacing': 'error',
		'comma-style': 'error',
		'computed-property-spacing': 'error',
		'eol-last': ['error', 'never'],
		'func-call-spacing': 'error',
		'func-name-matching': 'error',
		'indent': ['error', 'tab', {
			'SwitchCase': 1
		}],
		'key-spacing': 'error',
		'keyword-spacing': 'error',
		'linebreak-style': 'error',
		'new-cap': 'error',
		'no-trailing-spaces': 'error',
		'no-whitespace-before-property': 'error',
		'object-curly-spacing': ['error', 'always'],
		'object-property-newline': 'error',
		'operator-linebreak': ['error', 'after'],
		'quotes': ['error', 'single'],
		'semi': 'error',
		'semi-spacing': 'error',
		'space-before-blocks': 'error',
		'space-before-function-paren': ['error', 'never'],
		'space-in-parens': 'error',
		'space-infix-ops': 'error',
		'space-unary-ops': 'error',
		'spaced-comment': ['error', 'always', {
			'block': {
				'markers': ['!'],
				'balanced': true
			}
		}],
		'arrow-spacing': 'error',
		'generator-star-spacing': ['error', {
			'before': false,
			'after': true
		}],
		'no-duplicate-imports': 'error',
		'yield-star-spacing': ['error', {
			'before': false,
			'after': true
		}],
		'no-var': 'error',

		'vue/html-indent': ['error', 'tab'],
		'vue/html-self-closing': 0,
		'vue/max-attributes-per-line': 0
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
};