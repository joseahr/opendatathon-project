import { TestBed, inject } from '@angular/core/testing';
import { ValenbisiService } from './valenbisi.service';

describe('ValenbisiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValenbisiService]
    });
  });

  it('should ...', inject([ValenbisiService], (service: ValenbisiService) => {
    expect(service).toBeTruthy();
  }));
});
