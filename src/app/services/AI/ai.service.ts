import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AIService {

  constructor(private http: HttpClient) {
  }

  chat(prompt: string) {
    console.log("getting response...")
  }
}
