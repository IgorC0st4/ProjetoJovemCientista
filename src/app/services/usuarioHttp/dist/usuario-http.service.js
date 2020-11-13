"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsuarioHttpService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var UsuarioHttpService = /** @class */ (function () {
    function UsuarioHttpService(http) {
        this.http = http;
        //basePath = 'http://186.219.4.245:8080/usuario'
        this.basePath = 'http://localhost:8080/usuario';
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    UsuarioHttpService.prototype.efetuarCadastro = function (postData) {
        return this.http.
            post(this.basePath + '/cadastro', postData, this.httpOptions)
            .pipe();
    };
    UsuarioHttpService.prototype.efetuarLogin = function (postData) {
        return this.http.post(this.basePath + '/login', postData, this.httpOptions)
            .pipe();
    };
    UsuarioHttpService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsuarioHttpService);
    return UsuarioHttpService;
}());
exports.UsuarioHttpService = UsuarioHttpService;
