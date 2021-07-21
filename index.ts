import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Logger } from './utils/logger';
import { Database } from './utils/database';

import { PublicApi } from './api/public/index';
import { PrivateApi } from './api/private/index';

import { authenticateToken } from './middlewares/jwt.middleware';

(async () => {
    dotenv.config();

    const PORT = process.env.PORT || 3000;
    const app: Express = express();
    const logger = new Logger();

    const database = new Database(logger);
    await database.Connect();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const publicApi = new PublicApi(logger);
    await publicApi.LoadRoutes()

    const privateApi = new PrivateApi(logger);
    await privateApi.LoadRoutes()
    
    app.use('/api', authenticateToken);

    app.use('/api', privateApi.router);
    app.use('/*', publicApi.router);
    
    app.listen(PORT, () => logger.Info("Server started on http://localhost:" + PORT));
})();
