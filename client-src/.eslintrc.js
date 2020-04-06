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
    }
}
