import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(carService) {
        this.carService = carService;
        this.curso = {};
    }
    ngOnInit() {
        this.getCars();
    }
    // Chama o serviço para obtém todos os carros
    getCars() {
        this.carService.getCars().subscribe((cursos) => {
            this.cursos = cursos;
        });
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map