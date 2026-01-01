import CallerBase from './CallerBase';

class PublicCalls extends CallerBase {
  async getAll() {
    throw new Error('Method not implemented yet!');
  }

  async get(id: string | number) {
    throw new Error('Method not implemented yet!');
  }

  async create(payload: Partial<{}>) {
    throw new Error('Method not implemented yet!');
  }

  async update(id: string | number, payload: Partial<{}>) {
    throw new Error('Method not implemented yet!');
  }

  async deleteOrRestore(id: string | number, isActive: boolean = true) {
    throw new Error('Method not implemented yet!');
  }
}

export default PublicCalls;
