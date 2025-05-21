"use client";
import useGetAllPartners from "@/app/service/useGetAllPartners";

import { db, storage } from "@/app/firebase/config";
import { getDownloadURL, ref, uploadString} from "firebase/storage";
import Image from "next/image";
import { useRef,useState } from "react";
import { toast } from "sonner";

import BrandsArray from "./components/brandsArray";
import {  doc, setDoc } from "@firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  const [pickedImage, setPickedImage] = useState<any>("");
  const [imageUrl, setImageUrl] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  const { refetch } = useGetAllPartners();
const {refresh} = useRouter()
  const pickerRef = useRef<any>(null);

  const selectImage = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent: any) => {
      setPickedImage(readerEvent.target.result);
    };
  };

  // const listRef = ref(storage, "images/");

  async function handleFirestoreLinkUpdate(
    partnerDownloadLink: string,
    filePath: string
  ) {
    const body = {
      link: partnerDownloadLink,
      filePath,
    };

    try {
      await setDoc(
        doc(db, "markethubPartners", body.filePath.split("/").join("-")),
        body
      );
      toast.success("You have successfully updated your list of partners");
      refresh();
    } catch (error) {
      console.log(error);
      toast.error("An error occurred check your console for details,");
    }
  }

  const uploadFileToFB = async () => {
    setLoading(true);
    let random = Date.now();
    const storageRef = ref(storage, `images/${random}-portfolio-item`);

    try {
      if (pickedImage) {
        await uploadString(storageRef, pickedImage, "data_url");
        const url = await getDownloadURL(storageRef);
        console.log("downloadable url >>>", url);
        setImageUrl(url);
        await handleFirestoreLinkUpdate(url, storageRef.fullPath);
      }
    } catch (error) {
      console.log("error >>>", error);
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen">
      <div
        onClick={() => pickerRef.current.click()}
        className="relative h-[16rem] w-[16rem] border cursor-pointer flex flex-col items-center justify-center overflow-hidden rounded-lg "
      >
        {pickedImage ? (
          <Image src={pickedImage} fill style={{ objectFit: "cover" }} alt="" />
        ) : (
          <p>Pick image</p>
        )}
      </div>

      <input
        ref={pickerRef}
        onChange={(e) => selectImage(e)}
        type="file"
        accept=".png, .jpg, .jpeg"
        hidden
      />

      <button
        disabled={loading}
        onClick={uploadFileToFB}
        type="button"
        className="py-4 px-6 rounded-md bg-sky-400 text-white my-[1rem]"
      >
        {loading ? "Loading..." : "Upload image"}
      </button>

      <div className="">
        <BrandsArray />
      </div>
    </main>
  );
}
