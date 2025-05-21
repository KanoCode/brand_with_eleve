import { NextResponse } from "next/server";

import { Resend } from "resend";

// const resend = new Resend("re_NrDvDdaA_KsJmpeCwYrrr9CrMVddnB7ym"); //dev mode

// const resend = new Resend("re_Ns1RZcJZ_5Q5ndNZeueGtyxS6oMRmnnry"); // prod mode
const resend = new Resend("re_brFDoGDc_8HxH9U6iQqwdvaSWPTeCaSKc");
function createEmailTemplate(
  phoneNumber: string,
  email: string,
  name: string,
  message: string
) {
  return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Attention Inquiry from brandwithmarkethub.com</title>
    </head>
    <body style="font-family: 'Poppins', Arial, sans-serif">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center" style="padding: 20px;">
                    <table class="content" width="600" border="0"  cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: 1px solid #cccccc;">
                        <tr>
                            <td class="body" style="padding: 40px; text-align: left; font-size: 16px; line-height: 1.6;">
                            Hello, Admin! <br>
                          Please take note of the message from the markethub web platform
                            <br><br>

                             <span style="font-bold">   Name:    ${name}</span>

                        <span style="font-bold">  Customer Email:    ${email}</span>


                        <span style="font-bold">  Customer  Phone Number:    ${phoneNumber}</span>


                        <span style="font-bold">   Message :    ${message}</span>
                            </td>
                        </tr>

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

export async function POST(req: Request) {
  const { email, phoneNumber, firstName, lastName, message } = await req.json();

  let userName = firstName + "  " + lastName;

  const emailTemplate = createEmailTemplate(
    phoneNumber,
    email,
    userName,
    message
  );

  console.log(email, phoneNumber, firstName, lastName, message);

  try {
    await resend.emails.send({
      from: "lio@brandwithmarkethub.com",
      to: ["sales.markethub.zm@gmail.com"],

      subject: `You have a message, with the following details`,
      text: JSON.stringify(message),
      html: emailTemplate,
    });
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 500 });
  }
}
