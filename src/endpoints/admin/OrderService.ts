import { IOrder } from '@/app/(admin)/components/types';
import CallerBase from '../CallerBase';

class OrderService extends CallerBase {
  async getAll() {
    const res = await this.axios.get(`${this.baseURL}/api/orders/all`);
    return res?.data;
  }

  async create(order: Partial<IOrder>) {}

  async update(id: string | number, order: Partial<IOrder>) {}

  async deleteOrRestore(id: string | number) {}
}

export default OrderService;
