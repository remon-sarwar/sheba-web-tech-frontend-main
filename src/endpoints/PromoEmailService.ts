import CallerBase from './CallerBase';

class PromoEmailService extends CallerBase {
  constructor() {
    super(false);
  }

  async unsubscribe(email: string) {
    const url = `${this.baseURL}/api/promo-email/unsubscribe`;

    const res = await this.axios.post(url, { email });

    return res.data;
  }

  async sendEmail(to: string, subject: string, body: string) {
    const url = `${this.baseURL}/api/promo-email/send`;

    const res = await this.axios.post(url, {
      to,
      subject,
      body
    });

    return res.data;
  }

  async getUnsubbedList() {
    const url = `${this.baseURL}/api/promo-email/unsubscribe/list`;

    const res = await this.axios.get(url);

    return res.data;
  }

  async getSentEmails() {
    const url = `${this.baseURL}/api/promo-email/list`;

    const res = await this.axios.get(url);

    return res.data;
  }
}

export default PromoEmailService;
