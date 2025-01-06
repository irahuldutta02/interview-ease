import { SendReportEmailTemplate } from "@/components/email/send-report-email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, evaluatedAnswers } = body;

    const getDataTimeFormatted = () => {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedDate = `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
      return formattedDate;
    };

    const { data, error } = await resend.emails.send({
      from: "InterviewEase <onboarding@resend.dev>",
      to: [email],
      subject: `InterviewEase Evaluation Report Report on ${getDataTimeFormatted()}`,
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
