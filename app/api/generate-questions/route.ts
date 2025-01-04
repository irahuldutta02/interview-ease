import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Define the types for the request body
interface GenerateQuestionsRequest {
  name: string;
  email: string;
  numQuestions?: number;
  interviewLevel: string;
  selectedSkills: string[];
}

// Define the schema for the response from Gemini (structured response)
const schema = {
  description: "List of interview questions",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      id: {
        type: SchemaType.NUMBER,
        description:
          "The ID of the question should be a number incremental from 1",
        nullable: false,
      },
      question: {
        type: SchemaType.STRING,
        description: "The interview question",
        nullable: false,
      },
    },
    required: ["question", "id"],
  },
};

export async function POST(req: Request): Promise<Response> {
  try {
    const body: GenerateQuestionsRequest = await req.json();
    const {
      name,
      email,
      numQuestions = 5,
      interviewLevel,
      selectedSkills,
    } = body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    console.log("Inside the generate questions route");
    console.log({
      name,
      email,
      numQuestions,
      interviewLevel,
      selectedSkills,
    });

    // Create the dynamic prompt for Gemini
    const prompt = `
      Generate ${numQuestions} challenging interview questions for a(n) ${interviewLevel} level candidate.
      The candidate's skills include: ${selectedSkills.join(", ")}.
    `;
    console.log({ prompt });

    // Get the structured response from Gemini
    const result = await model.generateContent(prompt);

    const res = result?.response?.text();
    const jsonResp = {
      data: JSON.parse(res),
    };

    return new Response(JSON.stringify(jsonResp), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    const errorMessage = (error as Error).message;
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
