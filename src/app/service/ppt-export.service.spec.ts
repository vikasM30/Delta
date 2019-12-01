import { TestBed } from '@angular/core/testing';

import { PptExportService } from './ppt-export.service';

describe('PptExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PptExportService = TestBed.get(PptExportService);
    expect(service).toBeTruthy();
  });
});
