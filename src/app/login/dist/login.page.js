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
exports.LoginPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var idade_1 = require("../validators/idade");
var LoginPage = /** @class */ (function () {
    function LoginPage(formBuilder, platform, usuarioHttpService, usuarioLocalService, navCtrl, resultadoLocalService) {
        this.formBuilder = formBuilder;
        this.platform = platform;
        this.usuarioHttpService = usuarioHttpService;
        this.usuarioLocalService = usuarioLocalService;
        this.navCtrl = navCtrl;
        this.resultadoLocalService = resultadoLocalService;
        this.tentativaDeCadastro = false;
        this.tentativaDeLogin = false;
        this.submissaoComSucesso = false;
        this.ehMobile = false;
        this.aceitouTermos = false;
        this.ehMobile = this.platform.is("mobile");
        this.singupForm = formBuilder.group({
            nick: ['', [forms_1.Validators.required, forms_1.Validators.pattern("^[a-zA-Z0-9_-]{5,10}$")]],
            idade: ['', idade_1.IdadeValidator.ehValido],
            escolaridade: ['', forms_1.Validators.required],
            tipoEscola: ['', forms_1.Validators.required],
            genero: ['', forms_1.Validators.required],
            senha: ['', [forms_1.Validators.required, forms_1.Validators.pattern("^(?=.*?[a-z])(?=.*?[0-9]).{5,}$")]]
        });
        this.loginForm = formBuilder.group({
            nick: ['', [forms_1.Validators.required, forms_1.Validators.pattern("^[a-zA-Z0-9_-]{5,10}$")]],
            senha: ['', [forms_1.Validators.required, forms_1.Validators.pattern("^(?=.*?[a-z])(?=.*?[0-9]).{5,}$")]]
        });
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        this.usuarioLocalService.get(this.usuarioLocalService.key).then(function (result) {
            if (result) {
                _this.navCtrl.navigateRoot('/home');
            }
        })["catch"](function (error) {
            console.log(error);
        });
    };
    LoginPage.prototype.efetuarCadastro = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.tentativaDeCadastro = true;
                if (!this.singupForm.valid) {
                    return [2 /*return*/];
                }
                this.usuarioHttpService.efetuarCadastro(JSON.stringify(this.singupForm.value)).subscribe(function (response) {
                    _this.usuarioLocalService.inserir(response).then(function () {
                        _this.submissaoComSucesso = true;
                        _this.resultadoLocalService.setTesteFinalizado(false);
                        _this.navCtrl.navigateRoot('/home');
                    })["catch"](function (error) {
                        alert(error);
                    });
                }, function (error) {
                    console.error(error);
                });
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.efetuarLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.tentativaDeLogin = true;
                if (!this.loginForm.valid) {
                    return [2 /*return*/];
                }
                this.usuarioHttpService.efetuarLogin(JSON.stringify(this.loginForm.value)).subscribe(function (response) {
                    _this.usuarioLocalService.inserir(response).then(function () {
                        _this.submissaoComSucesso = true;
                        _this.resultadoLocalService.setTesteFinalizado(false);
                        _this.navCtrl.navigateRoot('/home');
                    })["catch"](function (error) {
                        alert(error);
                    });
                }, function (error) {
                    if (typeof error.error == typeof "") {
                        alert(error.error);
                    }
                    else {
                        alert(error.error.message);
                    }
                    console.error(error);
                });
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.habilitarTransicao = function () {
        this.slides.lockSwipeToNext(true);
    };
    LoginPage.prototype.ionSlideTransitionEnd = function () {
        if (!this.aceitouTermos) {
            this.slides.lockSwipeToNext(false);
            this.slides.slidePrev();
        }
    };
    __decorate([
        core_1.ViewChild('mySlider')
    ], LoginPage.prototype, "slides");
    LoginPage = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss']
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
