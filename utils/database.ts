
import mongoose from 'mongoose';
import { Logger } from './logger';

export class Database {
    private MONGODB_URL: string = process.env.MONGODB_URL + "";
    private logger: Logger;

    constructor(logger: Logger) {
        mongoose.set('useCreateIndex', true);
        this.logger = logger;
    }

    public async Connect(): Promise<boolean> {
        return mongoose.connect(this.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            this.logger.Info('Successfully connected to the mongodb server');
            return Promise.resolve(true);
        })
            .catch((reason: any) => {
                this.logger.Error('Mongodb server couldn\'t start: ' + reason);
                return Promise.resolve(false);
            });
    }

}