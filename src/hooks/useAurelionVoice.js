import { useState, useEffect, useCallback } from 'react';
import { aurelionVoiceService } from '../services/AurelionVoiceService';

/**
 * React hook to interface with the centralized AurelionVoiceService
 */
export function useAurelionVoice() {
  const [voiceState, setVoiceState] = useState(() => aurelionVoiceService.getState());

  useEffect(() => {
    const unsubscribe = aurelionVoiceService.subscribe((updatedState) => {
      setVoiceState(updatedState);
    });
    return unsubscribe;
  }, []);

  const speak = useCallback((text, onEnd) => {
    aurelionVoiceService.speak(text, onEnd);
  }, []);

  const stop = useCallback(() => {
    aurelionVoiceService.stop();
  }, []);

  const previewVoice = useCallback(() => {
    aurelionVoiceService.previewVoice();
  }, []);

  const selectVoice = useCallback((uri) => {
    aurelionVoiceService.selectVoice(uri);
  }, []);

  const setRate = useCallback((rate) => {
    aurelionVoiceService.setRate(rate);
  }, []);

  const setPitch = useCallback((pitch) => {
    aurelionVoiceService.setPitch(pitch);
  }, []);

  const setVolume = useCallback((volume) => {
    aurelionVoiceService.setVolume(volume);
  }, []);

  const setEnabled = useCallback((enabled) => {
    aurelionVoiceService.setEnabled(enabled);
  }, []);

  const startListening = useCallback((onResult, onError) => {
    aurelionVoiceService.startListening(onResult, onError);
  }, []);

  const stopListening = useCallback(() => {
    aurelionVoiceService.stopListening();
  }, []);

  return {
    ...voiceState,
    speak,
    stop,
    previewVoice,
    selectVoice,
    setRate,
    setPitch,
    setVolume,
    setEnabled,
    startListening,
    stopListening
  };
}

export default useAurelionVoice;
