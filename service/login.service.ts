import { API_BASE_URL } from "@/config/server.api.config";
import { APIService } from "./api.service";

export class SignInService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async signIn(data: any) {
    return this.post("teacher/signin/", data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
}
