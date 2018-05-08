module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest/globals": true,
    },
    plugins: [
        "jest",
    ],
    "extends": [
        "eslint:recommended",
        "plugin:import/errors"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    "rules": {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/valid-expect": "error",
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": ["warn", { "allow": ["warn", "error", "info"]}],
    }
};