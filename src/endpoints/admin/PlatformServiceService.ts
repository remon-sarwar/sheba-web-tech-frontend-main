import { IPlatformService } from '@/app/(admin)/components/types';
import CallerBase from '../CallerBase';

class PlatformServiceService extends CallerBase {
  async getAll() {
    const res = await this.axios.get(`${this.baseURL}/api/services`);
    return res?.data;
  }

  async create(service: Partial<IPlatformService>) {
    const payload = new FormData();

    payload.append('name', String(service?.name));
    payload.append('description', String(service?.description));
    payload.append('image', service?.imageURL || '');

    const res = await this.axios.post(`${this.baseURL}/api/services`, payload);
  }

  async update(id: string | number, service: Partial<IPlatformService>) {
    const payload = new FormData();

    payload.append('name', String(service?.name));
    payload.append('description', String(service?.description));
    payload.append('image', service?.imageURL || '');

    const res = await this.axios.put(
      `${this.baseURL}/api/services/${id}`,
      payload
    );
  }

  async deleteOrRestore(id: string | number) {
    const res = await this.axios.delete(`${this.baseURL}/api/services/${id}`);
  }
}

export default PlatformServiceService;
