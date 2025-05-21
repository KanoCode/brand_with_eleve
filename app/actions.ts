"use server";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export async function setUniqueSessionId() {
  let cookieStore = cookies();
  let sessionId: any = cookieStore.get("markethub_shop_session_id");

  if (!sessionId) {
    sessionId = uuidv4();

    cookieStore.set("markethub_shop_session_id", sessionId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });
  }
}



export async function addPartnerLink(body:{link:string}){
console.log("hey body", )
} 


