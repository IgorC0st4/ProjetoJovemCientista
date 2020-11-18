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
exports.HomePage = void 0;
var creditos_modal_page_1 = require("./../creditos-modal/creditos-modal.page");
var sobre_modal_page_1 = require("./../sobre-modal/sobre-modal.page");
var instrucoes_modal_page_1 = require("./../instrucoes-modal/instrucoes-modal.page");
var core_1 = require("@angular/core");
var HomePage = /** @class */ (function () {
    function HomePage(modalController, audioService, usuarioLocalService, navController, nivelHttpService, nivelLocalService, resultadoLocalService) {
        this.modalController = modalController;
        this.audioService = audioService;
        this.usuarioLocalService = usuarioLocalService;
        this.navController = navController;
        this.nivelHttpService = nivelHttpService;
        this.nivelLocalService = nivelLocalService;
        this.resultadoLocalService = resultadoLocalService;
        this.desempenho = [];
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.usuarioLocalService.get(this.usuarioLocalService.key).then(function (result) {
            if (!result) {
                _this.sair();
            }
        })["catch"](function (error) {
            console.error(error);
        });
        this.carregarNiveis();
        this.carregarSons();
        this.inicializarResultados();
        this.generateDesempenho();
    };
    HomePage.prototype.doRefresh = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.generateDesempenho().then(function () {
                    event.target.complete();
                })["catch"](function (error) {
                    console.error(error);
                });
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.carregarSons = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.audioService.preloadSounds().then(function () {
                    console.log('Audio loaded');
                })["catch"](function (error) {
                    console.error(error);
                });
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.carregarNiveis = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.nivelHttpService.listarNiveis().subscribe(function (response) {
                    _this.salvarNiveis(response['_embedded']['nivelList']);
                }, function (error) {
                    console.error(error);
                });
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.inicializarResultados = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.resultadoLocalService.get(1).then(function (result) {
                    if (!result) {
                        _this.resultadoLocalService.inicializarResultados();
                    }
                })["catch"](function (error) {
                    console.error(error);
                });
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.salvarNiveis = function (niveis) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                niveis.forEach(function (nivel) {
                    _this.nivelLocalService.inserir(nivel).then(function (result) {
                    })["catch"](function (error) {
                        console.error(error);
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.generateDesempenho = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.desempenho = [];
                this.resultadoLocalService.getAll().then(function (result) {
                    console.log(result);
                    if (result.length > 0) {
                        result.forEach(function (item) {
                            if (item.key.includes(_this.resultadoLocalService.key) && item.resultado.tempo !== "-1") {
                                _this.desempenho.push(item);
                            }
                        });
                    }
                })["catch"](function (error) {
                    console.error(error);
                });
                console.log(this.desempenho);
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.instrucoes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: instrucoes_modal_page_1.InstrucoesModalPage
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.sobre = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: sobre_modal_page_1.SobreModalPage
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.creditos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: creditos_modal_page_1.CreditosModalPage
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.iniciarFase = function () {
        this.navController.navigateForward('/fase');
    };
    HomePage.prototype.sair = function () {
        var _this = this;
        this.usuarioLocalService.remover(this.usuarioLocalService.key).then(function (result) {
            _this.navController.navigateRoot('/login');
        })["catch"](function (error) {
            console.error(error);
        });
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss']
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
