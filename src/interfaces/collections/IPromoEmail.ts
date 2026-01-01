import { IBaseEntity } from '../Common';

interface PromoEmail extends IBaseEntity {
  to: string;
  subject: string;
  body: string;
}

export default PromoEmail;
