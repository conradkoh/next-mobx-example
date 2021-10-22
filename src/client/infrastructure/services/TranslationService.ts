import { action, makeAutoObservable } from 'mobx';

export class TranslationService {
  isReady = false;
  translationData: Record<string, string> = {};
  constructor() {
    makeAutoObservable(this, {
      setReady: action,
    });
  }
  setReady() {
    this.isReady = true;
  }
  async load() {
    const data = await fetch(
      'https://run.mocky.io/v3/a3d01a62-4da5-4872-9052-81defec59c73'
    ).then((s) => s.json());
    this.translationData = data;
    this.setReady();
  }
  translate(key: string, params?: Record<string, string | number>): string {
    let translated = this.translationData[key] || '';
    if (translated && params) {
      for (const key in params) {
        translated = translated.replaceAll(`{${key}}`, `${params[key]}`);
      }
    }
    return translated;
  }
}
