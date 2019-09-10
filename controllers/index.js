var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
}

var fn_signin = async (ctx, next) => {
    var name = ctx.request.body.name || '';
    var password = ctx.request.body.password || '';
    console.log(`signin with name:${name}, password:${password}`);

    if (name === 'kari' && password === '1234') {
        ctx.render('signin-ok.html', {
            title: 'Sign In OK',
            name: 'Mr Node'
        });
    } else {
        ctx.render('signin-failed.html', {
            title: 'Sign In Failed'
        });
    }
}

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
};