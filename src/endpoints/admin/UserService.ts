import { IAppUser } from '@/app/(admin)/components/types';
import CallerBase from '../CallerBase';

class UserService extends CallerBase {
  async getAll() {
    const res = await this.axios.get(`${this.baseURL}/api/users`);
    return res?.data;
  }

  async create(product: Partial<IAppUser>) {}

  async update(id: string | number, product: Partial<IAppUser>) {}

  async deleteOrRestore(id: string | number) {}
}

export default UserService;
