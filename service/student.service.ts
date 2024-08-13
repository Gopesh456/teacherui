import { API_BASE_URL } from "@/config/server.api.config";
import { APIService } from "./api.service";

export class StudentService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async addStudent(data: any) {
    return this.post("teacher/student/add/", data)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  }
}
