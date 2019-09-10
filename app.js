'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');
const nunjucks = require('nunjucks');
const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

app.use(templating('views', {
	noCache: !isProduction,
	watch: !isProduction
}));

app.use(async (ctx, next) => {
	console.log(`${ctx.request.method} ${ctx.request.url}`);
	await next();
});

app.use(bodyParser());
app.use(controller());

app.listen(3000);
console.log('app started at port 3000 ...');