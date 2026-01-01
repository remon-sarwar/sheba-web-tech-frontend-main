import { ITestimonial } from '@/app/(admin)/components/types';
import CallerBase from '../CallerBase';

class TestimonialService extends CallerBase {
  async getAll() {
    const res = await this.axios.get(`${this.baseURL}/api/testimonials`);
    return res?.data;
  }

  async create(testimonial: Partial<ITestimonial>) {
    const payload = new FormData();

    payload.append('name', String(testimonial?.name));
    payload.append('designation', String(testimonial?.designation));
    payload.append('quote', String(testimonial?.quote));
    payload.append('image', testimonial?.imageURL || '');

    await this.axios.post(`${this.baseURL}/api/testimonials`, payload);
  }

  async update(id: string | number, testimonial: Partial<ITestimonial>) {
    const payload = new FormData();

    payload.append('name', String(testimonial?.name));
    payload.append('designation', String(testimonial?.designation));
    payload.append('quote', String(testimonial?.quote));
    payload.append('image', testimonial?.imageURL || '');

    await this.axios.post(`${this.baseURL}/api/testimonials/${id}`, payload);
  }

  async deleteOrRestore(id: string | number) {
    const res = await this.axios.delete(
      `${this.baseURL}/api/whychooseus/${id}`
    );
  }
}

export default TestimonialService;
