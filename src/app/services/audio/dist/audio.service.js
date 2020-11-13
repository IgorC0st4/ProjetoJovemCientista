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
exports.AudioService = void 0;
var core_1 = require("@angular/core");
var AudioService = /** @class */ (function () {
    function AudioService(platform, nativeAudio) {
        this.platform = platform;
        this.nativeAudio = nativeAudio;
        this.sounds = [];
        this.audioPlayer = new Audio();
        this.forceWebAudio = true;
        this.musicasFases = [
            { 'fase': '1', 'musica': 'assets/audio/background/fases_iniciais/bensound-D.mp3' },
            { 'fase': '2', 'musica': 'assets/audio/background/fases_iniciais/bensound-F.mp3' },
            { 'fase': '3', 'musica': 'assets/audio/background/fases_iniciais/bensound-G.mp3' },
            { 'fase': '4', 'musica': 'assets/audio/background/fases_intermediarias/bensound-A.mp3' },
            { 'fase': '5', 'musica': 'assets/audio/background/fases_intermediarias/bensound-B.mp3' },
            { 'fase': '6', 'musica': 'assets/audio/background/fases_dificeis/bensound-E.mp3' },
            { 'fase': '7', 'musica': 'assets/audio/background/fases_dificeis/bensound-H.mp3' },
        ];
        this.click = {
            'nome': 'click',
            'audio': 'assets/audio/click.wav'
        };
    }
    AudioService.prototype.preload = function (key, asset) {
        if (this.platform.is('cordova') && !this.forceWebAudio) {
            this.nativeAudio.preloadSimple(key, asset).then(function () {
            })["catch"](function (error) {
                console.error(JSON.stringify(error));
            });
            this.sounds.push({
                key: key,
                asset: asset,
                isNative: true
            });
        }
        else {
            var audio = new Audio();
            audio.src = asset;
            this.sounds.push({
                key: key,
                asset: asset,
                isNative: false
            });
        }
    };
    AudioService.prototype.preloadSounds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.musicasFases.forEach(function (musica) {
                    _this.preload(musica.fase, musica.musica);
                });
                this.preload(this.click.nome, this.click.audio);
                return [2 /*return*/];
            });
        });
    };
    AudioService.prototype.playSound = function (key) {
        var soundToPlay = this.sounds.find(function (sound) {
            return sound.key === key;
        });
        if (soundToPlay.isNative) {
            this.nativeAudio.play(soundToPlay.asset).then(function (res) {
                console.log(res);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.audioPlayer.src = soundToPlay.asset;
            this.audioPlayer.play();
        }
    };
    AudioService.prototype.playMusic = function (key) {
        var soundToPlay = this.sounds.find(function (sound) {
            return sound.key === key;
        });
        if (soundToPlay.isNative) {
            this.nativeAudio.loop(soundToPlay.asset).then(function (res) {
                console.log(res);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.audioPlayer.src = soundToPlay.asset;
            this.audioPlayer.play();
        }
    };
    AudioService.prototype.stop = function (key) {
        var soundToStop = this.sounds.find(function (sound) {
            return sound.key === key;
        });
        if (soundToStop.isNative) {
            this.nativeAudio.stop(soundToStop.asset).then(function (res) {
                console.log(res);
            })["catch"](function (error) {
                console.log(error);
            });
        }
        else {
            this.audioPlayer.pause();
        }
    };
    AudioService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AudioService);
    return AudioService;
}());
exports.AudioService = AudioService;
