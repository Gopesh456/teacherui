import { API_BASE_URL } from "@/config/server.api.config";
import { APIService } from "./api.service";

export class SignUpService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async signUp(data: any) {
    return this.post("teacher/signup/", data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
  async qualification(data: any) {
    return this.post("teacher/qualifications/", data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
}
