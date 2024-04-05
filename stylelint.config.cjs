/** @type {import('stylelint').Config} */
module.exports = {
    extends: 'stylelint-config-recommended-vue',
    rules: {
        'unit-allowed-list': ["em", "rem", "s"]
    },
    overrides: [
        {
            files: ['*.vue', '**/*.vue'],
            rules: {
                'unit-allowed-list': ['em', 'rem', 's']
            }
        }
    ]
}
