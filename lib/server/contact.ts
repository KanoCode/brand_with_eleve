import { ContactDetails, ContactMarkethub } from "@/app/model";
import { apiClient } from "../axios";


export const contactUs = async (
  data: ContactMarkethub
): Promise<ContactMarkethub> =>
  apiClient.post("/api/contactUs/", data).then((res) => res.data);
