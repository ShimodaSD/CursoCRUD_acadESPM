import { TestBed } from '@angular/core/testing';
import { CursoService } from './curso.service';
describe('CursoService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CursoService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=curso.service.spec.js.map