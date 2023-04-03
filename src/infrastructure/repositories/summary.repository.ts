import { singleton } from "tsyringe";
import { Configuration, OpenAIApi } from "openai";

@singleton()
export class SummaryRepository {
  async get(contentToSummarize: string) {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_SUMMARY_API,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-curie-001",
      prompt: `Please summarize the following content:\n\n${contentToSummarize}\n\nSummary:`,
      temperature: 0.7,
      max_tokens: 128,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response;
  }
}
