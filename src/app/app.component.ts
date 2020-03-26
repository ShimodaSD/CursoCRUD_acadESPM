import { Component, OnInit } from '@angular/core';
import { CursoService } from './services/curso.service';
import { Curso } from './models/curso';
import { AulaService } from './services/aula.service';
import { Aula } from './models/aula';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  curso = {} as Curso;
  cursos: Curso[];
  aula = {} as Aula;
  aulas: Aula[];

  constructor(private cursoService: CursoService, private aulaService: AulaService) {}
  ngOnInit() {
    this.getCurso();
    this.getAula();
  }

  // defini se um curso será criado ou atualizado
  saveCurso(form: NgForm) {
    if (this.curso.idCurso !== undefined) {
      this.cursoService.updateCurso(this.curso).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.cursoService.saveCurso(this.curso).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os cursos
  getCurso() {
    this.cursoService.getCurso().subscribe((cursos: Curso[]) => {
      this.cursos = cursos;
    });
  }

  getAula() {
    this.aulaService.getAula().subscribe((aulas: Aula[]) => {
      this.aulas = aulas;
    });
  }

  // deleta um curso
  deleteCurso(curso: Curso) {
    this.cursoService.deleteCurso(curso).subscribe(() => {
      this.getCurso();
    });
  }

  // copia o curso para ser editado.
  editCurso(curso: Curso) {
    this.curso = { ...curso };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getCurso();
    form.resetForm();
    this.curso = {} as Curso;
  }

}
