"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NivelHttpService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var NivelHttpService = /** @class */ (function () {
    function NivelHttpService(http) {
        this.http = http;
        //base_path = 'http://186.219.4.245:8080/nivel'
        this.basePath = 'http://localhost:8080/nivel';
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    NivelHttpService.prototype.listarNiveis = function () {
        return this.http.get(this.basePath, this.httpOptions).pipe();
    };
    NivelHttpService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], NivelHttpService);
    return NivelHttpService;
}());
exports.NivelHttpService = NivelHttpService;
