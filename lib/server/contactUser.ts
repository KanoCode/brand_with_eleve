import { ContactUser } from "@/app/model";
import { apiClient } from "../axios";


export const contactUser = async (
  data: ContactUser
): Promise<ContactUser> =>
  apiClient.post("/api/contactUser/", data).then((res) => res.data);
