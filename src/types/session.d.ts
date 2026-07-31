import { SafeAdm } from './adm';
import { Session } from 'express-session';

declare module 'express-serve-static-core' {
  interface Request {
    session: Session & {
      user?: SafeAdm;
      csrfToken?: string;
    };
  }
}
