import { TestBed } from '@angular/core/testing';

import { UploadAdDetailService } from './upload-ad-detail.service';

describe('UploadAdDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadAdDetailService = TestBed.get(UploadAdDetailService);
    expect(service).toBeTruthy();
  });
});
