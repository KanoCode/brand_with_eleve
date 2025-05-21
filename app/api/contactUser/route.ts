import { NextResponse, NextRequest } from "next/server";

import { Resend } from "resend";

// const resend = new Resend("re_NrDvDdaA_KsJmpeCwYrrr9CrMVddnB7ym"); //dev mode

// const resend = new Resend("re_Ns1RZcJZ_5Q5ndNZeueGtyxS6oMRmnnry"); // prod mode

const resend = new Resend("re_brFDoGDc_8HxH9U6iQqwdvaSWPTeCaSKc");

function createEmailTemplate() {
  return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Greetings!!!</title>
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
                            Hello, ! <br>
                          Please find attached our branding template
                            <br><br>

              
                   
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



export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const emailTemplate = createEmailTemplate();
  let message = "Hello, ";
  try {
    await resend.emails.send({
      from: "lio@brandwithmarkethub.com",
      to: [email],
      subject: `A new order from markethub.com, with the following details`,
      text: JSON.stringify(message),
      html: emailTemplate,
      attachments: [
        {
          path: "https://firebasestorage.googleapis.com/v0/b/markethub-cce4f.appspot.com/o/marketing_template%2FHow_to_Create_Indoor_Navigation_Maps___Experiences-2.pdf?alt=media&token=dceb7f87-d172-4b02-9379-e4e9e6468736",
          filename: "invoice.pdf",
        },
      ],
    });
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 500 });
  }
}
