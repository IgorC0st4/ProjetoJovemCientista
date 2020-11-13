import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

interface Sound {
  key: string;
  asset: string;
  isNative: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private sounds: Sound[] = [];
  private audioPlayer: HTMLAudioElement = new Audio();
  private forceWebAudio: boolean = true;


  musicasFases: any[] = [
    { 'fase': '1', 'musica': 'assets/audio/background/fases_iniciais/bensound-D.mp3' },
    { 'fase': '2', 'musica': 'assets/audio/background/fases_iniciais/bensound-F.mp3' },
    { 'fase': '3', 'musica': 'assets/audio/background/fases_iniciais/bensound-G.mp3' },
    { 'fase': '4', 'musica': 'assets/audio/background/fases_intermediarias/bensound-A.mp3' },
    { 'fase': '5', 'musica': 'assets/audio/background/fases_intermediarias/bensound-B.mp3' },
    { 'fase': '6', 'musica': 'assets/audio/background/fases_dificeis/bensound-E.mp3' },
    { 'fase': '7', 'musica': 'assets/audio/background/fases_dificeis/bensound-H.mp3' },
  ];
  click = {
    'nome': 'click',
    'audio': 'assets/audio/click.wav'
  }

  constructor(
    private platform: Platform,
    private nativeAudio: NativeAudio) {
  }

  private preload(key: string, asset: string): void {

    if (this.platform.is('cordova') && !this.forceWebAudio) {

      this.nativeAudio.preloadSimple(key, asset).then(() => {
      }).catch((error) => {
        console.error(JSON.stringify(error))
      });

      this.sounds.push({
        key: key,
        asset: asset,
        isNative: true
      });

    } else {

      let audio = new Audio();
      audio.src = asset;

      this.sounds.push({
        key: key,
        asset: asset,
        isNative: false
      });

    }

  }

  async preloadSounds() {
    this.musicasFases.forEach((musica) => {
      this.preload(musica.fase, musica.musica);
    })
    this.preload(this.click.nome, this.click.audio);
  }

  playSound(key: string): void {

    let soundToPlay = this.sounds.find((sound) => {
      return sound.key === key;
    });

    if (soundToPlay.isNative) {

      this.nativeAudio.play(soundToPlay.asset).then((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });

    } else {

      this.audioPlayer.src = soundToPlay.asset;
      this.audioPlayer.play();

    }

  }

  playMusic(key: string): void {
    let soundToPlay = this.sounds.find((sound) => {
      return sound.key === key;
    });

    if (soundToPlay.isNative) {
      this.nativeAudio.loop(soundToPlay.asset).then((res)=>{
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    } else {

      this.audioPlayer.src = soundToPlay.asset;
      this.audioPlayer.play();
    }

  }

  stop(key: string): void {
    let soundToStop = this.sounds.find((sound) => {
      return sound.key === key;
    });

    if (soundToStop.isNative) {

      this.nativeAudio.stop(soundToStop.asset).then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error);
      });

    } else {
      this.audioPlayer.pause();
    }
  }
}
