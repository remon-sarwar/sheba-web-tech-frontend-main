import { IFormSubmission } from '@/app/(admin)/components/types';
import CallerBase from '../CallerBase';

class FormSubmissionService extends CallerBase {
  async getAll() {
    const res = await this.axios.get(`${this.baseURL}/api/form`);
    return res?.data;
  }

  async create(submission: Partial<IFormSubmission>) {
    await this.axios.post(`${this.baseURL}/api/form`, submission);
  }

  async update(id: string | number, submission: Partial<IFormSubmission>) {}

  async deleteOrRestore(id: string | number) {}
}

export default FormSubmissionService;
