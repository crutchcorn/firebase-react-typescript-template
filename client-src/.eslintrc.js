// eslint-disable-next-line @typescript-eslint/no-var-requires
const parentConfig = require('../.eslintrc');

module.exports = {
    ...parentConfig,
    extends: [
        "react-app",
        ...parentConfig.extends
    ],
    settings: {
        react: {
            version: "detect"
        }
    },
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off"
    }
}
