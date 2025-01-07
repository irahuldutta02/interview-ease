import nodemailer from "nodemailer";
import moment from "moment-timezone";
import { Questions } from "@/types";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, evaluatedAnswers } = body;

    const getDataTimeFormatted = () => {
      return moment().tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm A");
    };

    const generateHTML = (name: string, evaluatedAnswers: Questions[]) => {
      return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>InterviewEase Report</title>
      </head>
      <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #ffffff;">
          <!-- Header Section -->
          <div style="text-align: center; margin-bottom: 40px;">
            <img src="https://img.icons8.com/fluency/48/artificial-intelligence--v1.png" alt="InterviewEase Logo" style="width: 48px; height: 48px; margin-bottom: 10px;" />
            <h1 style="font-size: 24px; font-weight: bold; margin: 0;">InterviewEase</h1>
            <p style="font-size: 14px; color: #555;">AI-Powered Interview Evaluation</p>
          </div>
    
          <!-- Email Body -->
          <div style="margin-bottom: 20px;">
            <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">Hi ${name},</h1>
            <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Here is the evaluation report of your interview practice.</p>
          </div>
    
          <!-- Questions Section -->
          ${evaluatedAnswers
            .map(
              (question, index) => `
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #fff; margin-bottom: 20px;">
              <div style="margin-bottom: 20px;">
                <h2 style="font-size: 16px; font-weight: 600; color: #555; margin-bottom: 10px;">
                  Question ${index + 1} of ${evaluatedAnswers.length}
                  <span style="margin-left: 8px; padding: 2px 4px; border-radius: 4px; background-color: ${
                    question.score! < 7 ? "#F87171" : "#34D399"
                  }; color: #000; font-size: 12px;">
                  Overall Score: ${question.score}/10
                  </span>
                </h2>
                <h1 style="font-size: 18px; font-weight: bold; color: #333;">${
                  question.question
                }</h1>
              </div>
    
              <div style="margin-bottom: 16px;">
                <p>
                  <span style="font-weight: bold; color: #F59E0B;">Your Answer:</span> ${
                    question.answer
                  }
                </p>
              </div>
    
              <div style="margin-bottom: 16px;">
                <p>
                  <span style="font-weight: bold; color: #10B981;">Ideal Answer:</span> ${
                    question.idealAnswer
                  }
                </p>
              </div>
    
              <div>
                <p>
                  <span style="font-weight: bold; color: #3B82F6;">Feedback:</span> ${
                    question.feedback
                  }
                </p>
              </div>
            </div>
          `
            )
            .join("")}
    
          <!-- Footer Section -->
          <div style="text-align: center; margin-top: 40px; color: #777;">
            <p style="font-size: 14px;">Thank you for using InterviewEase. We’re here to help you improve!</p>
            <p style="font-size: 12px; margin-top: 10px;">&copy; ${new Date().getFullYear()} InterviewEase. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>`;
    };

    const data = await transporter.sendMail({
      from: "InterviewEase <dev.rahul.dutta.02@gmail.com>",
      to: email,
      subject: `InterviewEase Evaluation Report for Interview Given on ${getDataTimeFormatted()}`,
      text: `InterviewEase Evaluation Report for Interview Given on ${getDataTimeFormatted()}`,
      html: generateHTML(name, evaluatedAnswers),
    });

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
