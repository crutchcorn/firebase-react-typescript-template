module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"plugin:@typescript-eslint/recommended"
	],
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: "module", // Allows for the use of imports
		ecmaFeatures: {
			jsx: true // Allows for the parsing of JSX
		}
	},
	rules: {
		"jsx-a11y/no-redundant-roles": "off",
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/no-empty-function": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/no-non-null-assertion": 0,
		"no-throw-literal": 0
	}
};
