import { API_BASE_URL } from "@/config/server.api.config";
import { APIService } from "./api.service";
export class UserService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }
  async getUser() {
    return this.get("/posts/")
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
  async createUser(data: any) {
    return this.post("/posts/", data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
}
export const userService = new UserService();
