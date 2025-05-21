import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import {
  getDownloadURL,
  ref,
  deleteObject,
  uploadString,
  listAll,
} from "firebase/storage";
import { toast } from "sonner";
import { db, storage } from "@/app/firebase/config";
// import { createPartnerLink } from "@/lib/server/admin";

// import Autoplay from "embla-carousel-autoplay";
// import Image from "next/image";

import { FaTrashCan } from "react-icons/fa6";
import Loader from "@/components/ui/loader";
import Loading from "@/app/(shop)/loading";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  writeBatch,
} from "@firebase/firestore";

const getAllPartners = async () => {
  const partnerLinksRef = collection(db, "markethubPartners");

  const querySnapshot = await getDocs(partnerLinksRef);
  let allFirebaseMarketHubPartners: any[] = [];
  querySnapshot.forEach((doc) => {
    allFirebaseMarketHubPartners.push({ ...doc.data() });
  });

  return allFirebaseMarketHubPartners;
};

export default function CarouselSpacing() {
  const [url, setUrl] = useState([] as string[]);
  const [paths, setObjecPaths] = useState([] as any[]);

  useEffect(() => {
    const collectionRef = collection(db, "markethubPartners");

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const partnersArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setObjecPaths(partnersArray);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  async function handleDeleteThumbnail(
    partnerDownloadLink: string,
    filePath: string
  ) {
    const body = {
      link: partnerDownloadLink,
      filePath,
    };

    //delete in prisma first

    const partnerLinksRef = collection(db, "markethubPartners");

    const docRef = doc(
      db,
      "markethubPartners",
      body.filePath.split("/").join("-")
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(
        doc(db, "markethubPartners", body.filePath.split("/").join("-"))
      );
    } else {
      // docSnap.data() will be undefined in this case
      toast.error("No such document!");
    }

    const desertRef = ref(storage, filePath);

    // // Delete in firebase storage
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log("File deleted successfully");
        toast.success("File Deleted Succesfully");
        // refetch();
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }

  const brands: string[] = [];
  // const plugin = React.useRef(
  //   Autoplay({ delay: 2000, stopOnInteraction: true })
  // );
  return (
    <Carousel
      // plugins={[plugin.current]}
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
      className="w-full max-w-lg"
    >
      <CarouselContent className="-ml-1">
        {paths.length
          ? paths.map((item: any, idx: number) => (
              <CarouselItem
                key={idx}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-4">
                      <div>
                        <div className="image" key={idx}>
                          <img
                            src={item.link}
                            className="max-w-full w-auto rounded-lg"
                            alt="Picture of the author"
                          />

                          <button
                            onClick={async () => {
                              await handleDeleteThumbnail(
                                item.link,
                                item.filePath
                              );
                            }}
                            className="delete"
                          >
                            <FaTrashCan />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))
          : []}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
