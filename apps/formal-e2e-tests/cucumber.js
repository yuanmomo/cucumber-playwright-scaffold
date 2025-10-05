module.exports = {
    default: {
      require: [
        'src/steps/**/*.ts',
        'src/hooks/**/*.ts'
      ],
      requireModule: ['ts-node/register'],
      format: [
        'progress',
        'html:reports/cucumber-report.html',
        'json:reports/cucumber-report.json'
      ],
      formatOptions: { snippetInterface: 'async-await' },
      parallel: 4,
      worldParameters: {
        baseUrl: process.env.BASE_URL || 'https://example.com'
      }
    }
  };
  