import { IWhyChooseUs } from '@/app/(admin)/components/types';
import CallerBase from '../CallerBase';

class WhyChooseUsService extends CallerBase {
  async getAll() {
    const res = await this.axios.get(`${this.baseURL}/api/whychooseus`);
    return res?.data;
  }

  async create(whyChooseUs: Partial<IWhyChooseUs>) {
    const payload = new FormData();

    payload.append('title', String(whyChooseUs?.title));
    payload.append('description', String(whyChooseUs?.description));
    payload.append('image', whyChooseUs?.imageURL || '');

    await this.axios.post(`${this.baseURL}/api/whychooseus`, payload);
  }

  async update(id: string | number, whyChooseUs: Partial<IWhyChooseUs>) {
    const payload = new FormData();

    payload.append('title', String(whyChooseUs?.title));
    payload.append('description', String(whyChooseUs?.description));
    payload.append('image', whyChooseUs?.imageURL || '');

    await this.axios.put(`${this.baseURL}/api/whychooseus/${id}`, payload);
  }

  async deleteOrRestore(id: string | number) {
    const res = await this.axios.delete(
      `${this.baseURL}/api/whychooseus/${id}`
    );
  }
}

export default WhyChooseUsService;
