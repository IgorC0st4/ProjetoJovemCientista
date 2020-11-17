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
exports.FasePage = void 0;
var parabens_modal_page_1 = require("./../parabens-modal/parabens-modal.page");
var resultado_1 = require("./../models/resultado");
var stopwatch_service_1 = require("./../services/stopwatch/stopwatch.service");
var resultado_modal_page_1 = require("./../resultado-modal/resultado-modal.page");
var core_1 = require("@angular/core");
var FasePage = /** @class */ (function () {
    function FasePage(alertController, modalController, timerService, stopwatchService, platform, audioService, route, navController, usuarioLocalService, nivelLocalService, resultadoLocalService) {
        this.alertController = alertController;
        this.modalController = modalController;
        this.timerService = timerService;
        this.stopwatchService = stopwatchService;
        this.platform = platform;
        this.audioService = audioService;
        this.route = route;
        this.navController = navController;
        this.usuarioLocalService = usuarioLocalService;
        this.nivelLocalService = nivelLocalService;
        this.resultadoLocalService = resultadoLocalService;
        this.classesCss = [
            'fundo-azul',
            'fundo-verde',
            'fundo-amarelo',
            'fundo-vermelho',
            'fundo-branco',
            'fundo-rosa',
            'fundo-marrom',
            'fundo-cinza',
            'fundo-laranja'
        ];
        this.contadorFase = 1;
        this.contadorErros = 0;
        this.desktop = false;
        this.fimDeJogo = false;
        this.imgs = [
            '../../assets/imgs/desenhos/Imagem 1.PNG',
            '../../assets/imgs/desenhos/Imagem 2.PNG',
            '../../assets/imgs/desenhos/Imagem 3.PNG',
            '../../assets/imgs/desenhos/Imagem 4.PNG',
            '../../assets/imgs/desenhos/Imagem 5.PNG',
            '../../assets/imgs/desenhos/Imagem 6.PNG',
            '../../assets/imgs/desenhos/Imagem 7.PNG'
        ];
        this.imagensEncontradas = 0;
        this.ios = false;
        this.imagensProcuradas = [];
        this.tabuleiro = [];
        this.tempos = [];
        this.testeFinalizadoAntes = false;
    }
    FasePage.prototype.ionViewWillLeave = function () {
        this.audioService.stop(this.contadorFase.toString());
        this.stopwatchService.reset();
    };
    FasePage.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            if (params && params.numero) {
                _this.contadorFase = params.numero;
                _this.inicializarJogo();
            }
        });
        this.ios = this.platform.is('ios');
        this.desktop = this.platform.is('desktop');
    };
    FasePage.prototype.inicializarJogo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.verificarSeJaFinalizouAntes();
                this.audioService.playMusic(this.contadorFase.toString());
                this.fimDeJogo = false;
                this.imagensEncontradas = 0;
                this.inicializarTabuleiro();
                this.inicializarImagensFase();
                //this.timerService = new TimerService();
                //this.timerService.initTimer();
                //this.timerService.startTimer();
                if (!this.stopwatchService.running) {
                    this.stopwatchService.start();
                }
                return [2 /*return*/];
            });
        });
    };
    FasePage.prototype.verificarSeJaFinalizouAntes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.resultadoLocalService.getSeJaFinalizouAntes().then(function (result) {
                    if (result) {
                        _this.testeFinalizadoAntes = result;
                    }
                    else {
                        _this.resultadoLocalService.setTesteFinalizado(true);
                    }
                })["catch"](function (error) {
                    console.error(error);
                });
                return [2 /*return*/];
            });
        });
    };
    FasePage.prototype.inicializarImagensFase = function () {
        this.imagensProcuradas = [];
        for (var i = 0; i < this.contadorFase; i++) {
            var linha = this.tabuleiro[this.gerarNumeroAleatorio(5)];
            var bloco = linha[this.gerarNumeroAleatorio(5)];
            if (!this.ehImagemProcurada(bloco)) {
                this.imagensProcuradas.push(bloco);
            }
            else {
                i--;
            }
        }
    };
    FasePage.prototype.inicializarTabuleiro = function () {
        // Limpa o array de dados
        this.tabuleiro = [];
        // Array com os dados de uma linha de blocos
        var dados_linha = [];
        for (var i = 0; i < 5; i++) {
            // Limpa o array de linhas
            dados_linha = [];
            for (var j = 0; j < 5; j++) {
                // Variável de cada bloco
                // Possui a imagem e a classe css
                var col = {
                    'classe': this.classesCss[this.gerarNumeroAleatorio(9)],
                    'img': this.imgs[this.gerarNumeroAleatorio(this.imgs.length)]
                };
                //Adiciona a coluna para a linha
                dados_linha.push(col);
            }
            // Adiciona a linha para o array de dados
            // da tabela
            this.tabuleiro.push(dados_linha);
        }
    };
    FasePage.prototype.ehImagemProcurada = function (img) {
        return this.imagensProcuradas.find(function (e) { return e.classe === img.classe && e.img === img.img; });
    };
    FasePage.prototype.gerarNumeroAleatorio = function (limite) {
        return Math.floor((Math.random() * limite));
    };
    FasePage.prototype.testarBlocoSelecionado = function (img) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                //this.audioService.playSound('click');
                if (this.ehImagemProcurada(img)) {
                    index = this.imagensProcuradas.findIndex(function (item) {
                        return (item.classe === img.classe && item.img === img.img);
                    });
                    this.imagensEncontradas++;
                    if (index > -1) {
                        this.imagensProcuradas.splice(index, 1);
                    }
                    if (this.imagensEncontradas == this.contadorFase && !this.fimDeJogo) {
                        this.apresentarResultado();
                    }
                    return [2 /*return*/];
                }
                else {
                    this.contadorErros++;
                }
                return [2 /*return*/];
            });
        });
    };
    FasePage.prototype.proximaFase = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Para o tempo transcorrido na fase
                //this.timerService.pauseTimer();
                //this.stopwatchService.stop();
                /*var tempoFase = {
                  'fase': this.contadorFase,
                  'tempo': this.stopwatchService.time
                }
                */
                //this.tempos.push(tempoFase);
                if (this.contadorFase == 7) {
                    this.apresentarResultado();
                }
                else {
                    this.stopwatchService.reset();
                    // Aumenta o número da fase
                    this.contadorFase++;
                    // Inicializa a nova fase
                    this.inicializarJogo();
                }
                return [2 /*return*/];
            });
        });
    };
    FasePage.prototype.apresentarResultado = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.fimDeJogo = true;
                        this.stopwatchService.stop();
                        resultado = new resultado_1.Resultado();
                        this.nivelLocalService.get(this.contadorFase).then(function (result) {
                            resultado.nivel = result;
                        })["catch"](function (error) {
                            console.error(error);
                        });
                        resultado.tempoFinal = this.stopwatchService.time;
                        resultado.erros = this.contadorErros;
                        return [4 /*yield*/, this.usuarioLocalService.get(this.usuarioLocalService.key).then(function (result) {
                                resultado.usuario = result;
                            })["catch"](function (error) {
                                console.error(error);
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.modalController.create({
                                component: resultado_modal_page_1.ResultadoModalPage,
                                componentProps: {
                                    'resultado': resultado
                                }
                            })];
                    case 2:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            if (_this.contadorFase == 7) {
                                _this.apresentarParabens();
                                _this.navController.back();
                            }
                            else {
                                if (data['data'].comando === 'voltar') {
                                    _this.navController.back();
                                }
                                else {
                                    _this.proximaFase();
                                }
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FasePage.prototype.gameOver = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.fimDeJogo = true;
                        this.timerService.pauseTimer();
                        return [4 /*yield*/, this.alertController.create({
                                header: 'FIM DE JOGO',
                                message: 'O seu tempo acabou',
                                buttons: [{
                                        text: 'Recomeçar',
                                        handler: function () {
                                            _this.reinicarJogo();
                                        }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FasePage.prototype.reinicarJogo = function () {
        this.contadorFase = 1;
        this.stopwatchService = new stopwatch_service_1.StopwatchService();
        this.tempos = [];
        this.inicializarJogo();
    };
    FasePage.prototype.apresentarParabens = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: parabens_modal_page_1.ParabensModalPage
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            _this.navController.back();
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FasePage = __decorate([
        core_1.Component({
            selector: 'app-fase',
            templateUrl: './fase.page.html',
            styleUrls: ['./fase.page.scss']
        })
    ], FasePage);
    return FasePage;
}());
exports.FasePage = FasePage;
