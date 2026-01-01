import { IProduct } from '@/app/(admin)/components/types';
import CallerBase from '../CallerBase';

class ProductService extends CallerBase {
  async getAll() {
    const res = await this.axios.get(`${this.baseURL}/api/products`);
    return res?.data;
  }

  async create(product: Partial<IProduct>) {}

  async update(id: string | number, product: Partial<IProduct>) {
    await this.axios.post(`${this.baseURL}/api/products/update`, product);
  }

  async deleteOrRestore(id: string | number) {}
}

export default ProductService;
