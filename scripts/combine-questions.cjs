#!/usr/bin/env node

process.stdout.write(
	JSON.stringify(
		{
			principles: require('../static/questions/principles.json'),
			development: require('../static/questions/development.json'),
			testing: require('../static/questions/testing.json'),
			cicd: require('../static/questions/cicd.json'),
			uiux: require('../static/questions/uiux.json'),
			infrastructure: require('../static/questions/infrastructure.json'),
			security: require('../static/questions/security.json'),
			leadership: require('../static/questions/leadership.json'),
			consulting: require('../static/questions/consulting.json')
		},
		null,
		'\t'
	)
);
