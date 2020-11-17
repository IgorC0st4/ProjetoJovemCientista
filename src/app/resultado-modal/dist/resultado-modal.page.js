"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ResultadoModalPage = void 0;
var core_1 = require("@angular/core");
var ResultadoModalPage = /** @class */ (function () {
    function ResultadoModalPage(platform, modalController, resultadoHttpService, resultadoLocalService) {
        this.platform = platform;
        this.modalController = modalController;
        this.resultadoHttpService = resultadoHttpService;
        this.resultadoLocalService = resultadoLocalService;
        this.resultadoMaisRapido = "";
        this.mobile = false;
        this.mobile = platform.is('mobile');
    }
    ResultadoModalPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.resultadoLocalService.get(this.resultado.nivel.numero).then(function (result) {
            if (result != '-1') {
                if (_this.compararSeEhMenor(_this.resultado.tempoFinal, result)) {
                    _this.resultadoMaisRapido = _this.resultado.tempoFinal;
                    _this.resultadoLocalService.inserir(_this.resultado.nivel.numero, _this.resultado.tempoFinal, _this.resultado.erros);
                }
                else {
                    _this.resultadoMaisRapido = result;
                }
            }
            else {
                _this.resultadoMaisRapido = _this.resultado.tempoFinal;
                _this.resultadoLocalService.inserir(_this.resultado.nivel.numero, _this.resultado.tempoFinal, _this.resultado.erros);
            }
        })["catch"](function (error) {
            console.error(error);
        });
        this.resultadoHttpService.enviarResultado(this.resultado).subscribe(function (response) {
        }, function (error) {
            console.error(error);
        });
    };
    ResultadoModalPage.prototype.compararSeEhMenor = function (tempoFinal, tempoMaisRapido) {
        var tempoFinalSplit = tempoFinal.split(':');
        var tempoMaisRapidoSplit = tempoMaisRapido.split(':');
        if (parseInt(tempoFinalSplit[0]) <= parseInt(tempoMaisRapidoSplit[0])) {
            return (parseInt(tempoFinalSplit[1]) < parseInt(tempoMaisRapidoSplit[1]));
        }
        else {
            return false;
        }
    };
    /*
    *
      ngOnInit(): void {
        var segundos: number = 0;
        var minutos: number = 0;
        for (var i = 0; i < this.tempos.length; i++) {
          let tempo = this.tempos[i].tempo.split(':');
          if (parseInt(tempo[0]) > 0) {
            minutos += parseInt(tempo[0]);
          }
          segundos += parseInt(tempo[1]);
        }
        if (segundos > 59) {
          minutos += (segundos - (segundos % 60)) / 60;
          segundos = segundos % 60;
        }
        if (minutos < 10) {
          this.tempo_total += '0';
        }
        this.tempo_total += minutos + ':';
        if (segundos < 10) {
          this.tempo_total += '0';
        }
        this.tempo_total += segundos;
      }
      */
    ResultadoModalPage.prototype.voltar = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.modalController.dismiss({
                    'comando': 'voltar'
                });
                return [2 /*return*/];
            });
        });
    };
    ResultadoModalPage.prototype.chamarProximaFase = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.modalController.dismiss({
                    'comando': 'continuar'
                });
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        core_1.Input()
    ], ResultadoModalPage.prototype, "resultado");
    ResultadoModalPage = __decorate([
        core_1.Component({
            selector: 'app-resultado-modal',
            templateUrl: './resultado-modal.page.html',
            styleUrls: ['./resultado-modal.page.scss']
        })
    ], ResultadoModalPage);
    return ResultadoModalPage;
}());
exports.ResultadoModalPage = ResultadoModalPage;
