import { API_BASE_URL } from "@/config/server.api.config";
import { APIService } from "./api.service";

export class ForgetPasswdService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async resetEmail(data: any) {
    return this.post("teacher/reset/email/", data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
  async resetOtp(data: any) {
    return this.post("teacher/reset/otp/", data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
  async resetPassword(data: any) {
    return this.post("teacher/reset/password/", data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
}
