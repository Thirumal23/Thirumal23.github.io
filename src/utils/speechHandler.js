/**
 * AURELION Speech Handler Facade
 * Delegates directly to the centralized AurelionVoiceService
 * Ensures 100% architectural consistency across legacy and modern components.
 */

import { aurelionVoiceService } from '../services/AurelionVoiceService';

class SpeechHandlerAdapter {
  get synth() {
    return aurelionVoiceService.synth;
  }

  get enabled() {
    return aurelionVoiceService.enabled;
  }

  set enabled(val) {
    aurelionVoiceService.setEnabled(val);
  }

  get rate() {
    return aurelionVoiceService.rate;
  }

  set rate(val) {
    aurelionVoiceService.setRate(val);
  }

  get pitch() {
    return aurelionVoiceService.pitch;
  }

  set pitch(val) {
    aurelionVoiceService.setPitch(val);
  }

  get volume() {
    return aurelionVoiceService.volume;
  }

  set volume(val) {
    aurelionVoiceService.setVolume(val);
  }

  get isSpeaking() {
    return aurelionVoiceService.isSpeaking;
  }

  get isListening() {
    return aurelionVoiceService.isListening;
  }

  get selectedVoice() {
    return aurelionVoiceService.selectedVoice;
  }

  set selectedVoice(v) {
    if (v && v.voiceURI) {
      aurelionVoiceService.selectVoice(v.voiceURI);
    }
  }

  get voices() {
    return aurelionVoiceService.voices;
  }

  getVoices() {
    return aurelionVoiceService.voices;
  }

  setVoice(voiceUri) {
    aurelionVoiceService.selectVoice(voiceUri);
  }

  setRate(r) {
    aurelionVoiceService.setRate(r);
  }

  setPitch(p) {
    aurelionVoiceService.setPitch(p);
  }

  setVolume(v) {
    aurelionVoiceService.setVolume(v);
  }

  setEnabled(en) {
    aurelionVoiceService.setEnabled(en);
  }

  speak(text, onEnd) {
    aurelionVoiceService.speak(text, onEnd);
  }

  stopSpeaking() {
    aurelionVoiceService.stop();
  }

  isSpeechRecognitionSupported() {
    return aurelionVoiceService.isSpeechRecognitionSupported();
  }

  startListening(onResult, onError) {
    aurelionVoiceService.startListening(onResult, onError);
  }

  stopListening() {
    aurelionVoiceService.stopListening();
  }
}

export const speechHandler = new SpeechHandlerAdapter();
export default speechHandler;
