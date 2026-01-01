import CallerBase from './CallerBase';

class OrderService extends CallerBase {
  async whmCheck(payload: Record<string, string | number>) {
    const res = await this.axios.post(
      `${this.baseURL}/api/orders/whmcheck`,
      payload
    );

    return res.data;
  }

  async makeOrder(payload: Record<string, string | number>) {
    const res = await this.axios.post(
      `${this.baseURL}/api/orders/create`,
      payload
    );

    return res.data;
  }

  async successCallback(payload: Record<string, string | number>) {
    const res = await this.axios.post(
      `${this.baseURL}/api/orders/success`,
      payload
    );

    return res.data;
  }

  async getMyOrders() {
    const res = await this.axios.get(`${this.baseURL}/api/orders/my`);
    return res.data;
  }

  async changePassword(payload: Record<string, string | number>) {
    const res = await this.axios.post(
      `${this.baseURL}/api/orders/updatepassword`,
      payload
    );

    return res.data;
  }
}

export default OrderService;
