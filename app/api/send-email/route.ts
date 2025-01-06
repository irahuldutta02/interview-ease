import { SendReportEmailTemplate } from "@/components/email/send-report-email-template";
import { Resend } from "resend";
import moment from "moment-timezone";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, evaluatedAnswers } = body;

    const getDataTimeFormatted = () => {
      return moment().tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm A");
    };

    const { data, error } = await resend.emails.send({
      from: "InterviewEase <onboarding@resend.dev>",
      to: [email],
      subject: `InterviewEase Evaluation Report for Interview Given on ${getDataTimeFormatted()}`,
      react: await SendReportEmailTemplate({
        name,
        evaluatedAnswers,
      }),
    });

    if (error) {
      return new Response(JSON.stringify(error), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
