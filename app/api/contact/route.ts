import { NextResponse, NextRequest } from "next/server";

import { Resend } from "resend";

// const resend = new Resend("re_NrDvDdaA_KsJmpeCwYrrr9CrMVddnB7ym"); //dev mode

// const resend = new Resend("re_Ns1RZcJZ_5Q5ndNZeueGtyxS6oMRmnnry"); // prod mode

const resend = new Resend("re_brFDoGDc_8HxH9U6iQqwdvaSWPTeCaSKc");

function createEmailTemplate(
  str: string,
  name: string,
  phoneNumber: string,
  email: string,
  organization: string,
  jobTitle: string
) {
  return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order summary from Markethub website</title>
    </head>
    <body style="font-family: 'Poppins', Arial, sans-serif">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center" style="padding: 20px;">
                    <table class="content" width="600" border="0"  cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #cccccc;">
                        <!-- Header -->
                        <tr>
                            <td class="header" style="background-color: #345C72; padding: 40px; text-align: center; color: white; font-size: 24px;">
                            ITEMS ORDERED
                            </td>
                        </tr>
                       

                        <tr>
                        
                        </tr>
                    
                        <tr>
                            <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                            Hello, Admin! <br>
                          Please take note of the following items ordered from the markethub web platform
                            <br><br>

                             <span style="font-bold">   Name:    ${name}</span>
                        

            

                        <span style="font-bold">   Email:    ${email}</span>


                        <span style="font-bold">   Phone Number:    ${phoneNumber}</span>

                        <span style="font-bold">   Company:    ${organization}</span>

                        <span style="font-bold">   Job Title:    ${jobTitle}</span>
                            </td>
                        </tr>
    
                       
                     
                        <tr>
                        <td>
                        ${str}
                        
                        </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td class="footer" style="background-color: #333333; padding: 40px; text-align: center; color: white; font-size: 14px;">
                            Copyright &copy; 2024 | MarketHub
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;
}

function createCart(cartObj: any) {
  return `  <div style="display:flex; flex-direction:column; background-color:white;">
          <img
          style="height:7rem; width:7rem; border-width:1px; object-fit:cover; object-position:center"
            alt=""
            src="${cartObj.url}"
          />
          <div className="display:flex; width:100%;  flex-direction: column; padding-left: 1rem;
    padding-right: 1rem padding-top: 1rem;
    padding-bottom: 1rem">
            <span style="font-weight: 600;">${cartObj.name}</span>
            <span style=" float: right; text-gray-400">
              Qty: ${cartObj.quantity}
            </span>
            <span style=" float: right; text-gray-400">
              Size: ${cartObj.size}
            </span>

             <span style=" float: right; text-gray-400">
              Color: ${cartObj.colour}
            </span>
            <p style="font-size: 1.125rem;
            line-height: 1.75rem; font-bold"> K ${cartObj.price}</p>
          </div>
        </div>`;
}

export async function POST(req: NextRequest) {
  const {
    email,
    phoneNumber,
    firstName,
    lastName,
    organization,
    jobTitle,
    attachments,
    cart,
  } = await req.json();

  let message = `email: ${email} phone: ${phoneNumber}`;

  const cartString = cart.reduce((accumulator: any, currentValue: any) => {
    let str = createCart(currentValue);

    return accumulator + str;
  }, "");

  let userName = firstName + "  " + lastName;

  const emailTemplate = createEmailTemplate(
    cartString,
    phoneNumber,
    email,
    userName,
    organization,
    jobTitle
  );

  try {
    await resend.emails.send({
      from: "lio@brandwithmarkethub.com",
      to: ["sales.markethub.zm@gmail.com"],
      subject: `A new order from markethub.com, with the following details`,
      text: JSON.stringify(message),
      html: emailTemplate,
      attachments:
        attachments &&
        attachments.map((file: any) => ({
          filename: file.filename,
          content: file.content,
        })),
    });
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 500 });
  }
}
