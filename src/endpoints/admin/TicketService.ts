import { ITicket } from '@/app/(admin)/components/types';
import CallerBase from '../CallerBase';

class TicketService extends CallerBase {
  async getAll() {
    const res = await this.axios.get(`${this.baseURL}/api/ticket/all`);
    return res?.data;
  }

  async create(ticket: Partial<ITicket>) {
    await this.axios.post(`${this.baseURL}/api/ticket`, ticket);
  }

  async update(id: string | number, ticket: Partial<ITicket>) {}

  async deleteOrRestore(id: string | number) {}
}

export default TicketService;
