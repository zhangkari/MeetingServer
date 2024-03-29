const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

// url: '/static/'
// dir: __dirname + '/static'
function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.require.path;
        if (rpath.startsWith(url)) {
            let fp = path.join(dir, rpath.substring(url.length));
            if (await fs.exists(fp)) {
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(fp);
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    };
}

module.exports = staticFiles;