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
        description:
          "The interview question each question should be unique each time",
        nullable: false,
      },
    },
    required: ["question", "id"],
  },
};

export async function POST(req: Request): Promise<Response> {
  try {
    const body: GenerateQuestionsRequest = await req.json();
    const { numQuestions = 5, interviewLevel, selectedSkills } = body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    // Create the dynamic prompt for Gemini
    const prompt = `
      Generate ${numQuestions} unique and challenging interview questions for a ${interviewLevel} level candidate.
      The candidate's skills include: ${selectedSkills.join(", ")}.
      The questions should be:
      - Tailored to the candidate's skills and experience.
      - Relevant for an oral interview (i.e., questions that assess knowledge and problem-solving in spoken form).
      - Unique and not repetitive across requests.
      - Designed to assess both technical and problem-solving abilities in the selected skills.
      - Engaging, thought-provoking, and appropriate for the experience level specified.
      - Avoid theoretical or overly broad questions; focus on practical, real-world applications where possible.
    `;

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
