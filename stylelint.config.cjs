module.exports = {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["site/frontend/css/fontawesome.min.css"],
  rules: {
    "color-no-invalid-hex": true,
    "declaration-block-no-duplicate-properties": true,
  },
};
