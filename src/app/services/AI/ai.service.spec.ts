import {TestBed} from '@angular/core/testing';

import {AIService} from './ai.service';

describe('AiService', () => {
  let service: AIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
