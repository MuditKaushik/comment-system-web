import * as bodyParser from 'body-parser';
import express from 'express';
import proxy from 'http-proxy-middleware';
import * as path from 'path';
import { apiProxy, env, port } from './server.config.json';

export type EnvType = 'DEV' | 'PROD';
export class AppServer {
    private readonly app: express.Application;
    private readonly env: EnvType = <EnvType>env;
    private readonly host: string = (this.env === 'DEV') ? 'localhost' : '0.0.0.0';
    private readonly apiPath: string = (this.env === 'DEV') ? apiProxy.dev : apiProxy.prod;
    constructor() {
        this.app = express();
        this.init_middlewares();
        this.init_route();
        this.init_server();
    }
    private init_middlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/', express.static(path.join(process.cwd(), 'build/')));
        this.app.use(proxy('/api', {
            target: this.apiPath,
            secure: false,
            changeOrigin: true,
            logLevel: 'info',
            pathRewrite: { '^/api/': this.apiPath },
        }));
    }
    private init_route(): void {
        this.app.get('/*', (req: express.Request, res: express.Response) => {
            console.debug('requested path', req.originalUrl);
            res.status(200).sendFile('index.html', { root: path.join(process.cwd(), 'build') }, (err) => {
                if (err) {
                    res.redirect('/');
                }
            });
            return;
        });
    }
    private init_server(): void {
        this.app.listen(port, this.host, () => {
            console.debug(`Application hosted at ${this.host}:${port}`);
        });
    }
}
new AppServer();