import { promises as fs } from "fs";

import { storage } from "@/app/firebase/config";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFile = async (file: any) => {
  let folder = "markethub-products/";
  try {
    const filename = "products.json";
    const storageRef = ref(storage, `${folder}${filename}`);
    const res = await uploadBytes(storageRef, file);

    const fileRef = ref(storage, res.metadata.fullPath);
    const downloadUrl = await getDownloadURL(fileRef);
    return downloadUrl.toString();
  } catch (error) {
    console.log(error);
  }
};

export async function getLocalProductsJsonFile() {
  const jsonFile = await fs.readFile(process.cwd() + "/products1.json", "utf8");
  return jsonFile;
}
