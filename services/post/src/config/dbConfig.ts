import { createConnection, Connection } from 'typeorm';
import ormconfig from '../ormconfig';


export const dbConnection = async() => {
      const connection: Connection = await createConnection(ormconfig);
       return connection;
}