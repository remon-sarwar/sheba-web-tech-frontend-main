import CallerBase from './CallerBase';

class AuthService extends CallerBase {
  async login(credentials: Record<string, string | null>) {
    const res = await this.axios.post(
      `${this.baseURL}/api/Auth/login`,
      credentials
    );
    return res.data;
  }

  async register() {
    throw new Error('Method not implemented yet!');
  }

  async verifyOTP(paylod: Record<string, string | number>) {
    const res = await this.axios.post(
      `${this.baseURL}/api/Auth/verify-otp`,
      paylod
    );
    return res?.data;
  }
}

export default AuthService;
