import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import ollama from "ollama";

@Injectable({
  providedIn: 'root'
})
export class AIService {

  answer = '';

  constructor(private http: HttpClient) {
  }

  async chat(prompt: string) {
    const instructions = 'A client has requested a project. Please break down the project into a list of tasks. For each task, provide the task\'s description, estimated duration in floating-point hours (e.g., 0.3 for 20 minutes), a rate (a floating-point value in two decimal places representing euros per hour for that task), and tags that categorize the task. The rate should be based on the regional standard in Slovakia (typically between 10 to 20 euros per hour). Return the data strictly as a JSON array of objects with the following format:\n' +
      '[\n' +
      '  {"text": "<task description>", "duration": <floating-point duration>, "tags": ["<string>", "<string>", ...], "rate": <floating-point rate>},\n' +
      '  {"text": "<another task>", "duration": <floating-point duration>, "rate": <floating-point rate>, "tags": ["<string>", "<string>", ...]}\n' +
      ']\n' +
      'Nothing else should be included in the response—just the raw JSON array. No explanations, no additional comments, only the JSON data. Example Output:\n' +
      '[\n' +
      '  {"text": "Design the website layout", "duration": 5.0, "rate": 15.00, "tags": ["Design"]},\n' +
      '  {"text": "Develop user authentication system", "duration": 8.5, "rate": 18.00, "tags": ["Development"]}\n' +
      ']\n' +
      'Project: ' + prompt;


    return ollama.chat({
      model: 'llama3.2',
      messages: [{role: 'user', content: instructions}],
      stream: true
    });

  }


}
