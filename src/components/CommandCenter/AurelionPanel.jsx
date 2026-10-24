import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Square, 
  Send, 
  Bot, 
  Radio,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Headphones
} from 'lucide-react';
import { useAurelionVoice } from '../../hooks/useAurelionVoice';
import { soundManager } from '../../utils/soundManager';
import { parseCommand } from '../../utils/commandRouter';
import { AURELION_DIALOGUE } from '../../services/AurelionDialogue';

export default function AurelionPanel({ 
  onExecuteAction, 
  soundEnabled,
  activeSection = 'command-center' 
}) {
  const {
    isSpeaking,
    isListening,
    selectedVoice,
    enabled: voiceEnabled,
    voiceQualityReport,
    speak,
    stop,
    startListening,
    stopListening
  } = useAurelionVoice();

  const [messages, setMessages] = useState([
    {
      sender: 'aurelion',
      text: "Good day, sir. AURELION is online, and your engineering workspace is ready. Shall we review your latest projects, examine a circuit, or proceed directly to the laboratory?",
      timestamp: 'INIT'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [micError, setMicError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef(null);
  const chatScrollRef = useRef(null);

  // Audio Waveform Visualization - strictly active only while speaking or listening
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let phase = 0;

    const renderWaveform = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      const numBars = 36;
      const barWidth = width / numBars - 2;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 3;

        if (isSpeaking) {
          // Dynamic harmonic waveform when speaking
          const freq = (i / numBars) * Math.PI * 4;
          const amplitude = 22 * (Math.sin(phase + freq) * 0.5 + 0.5);
          barHeight = Math.max(4, amplitude);
        } else if (isListening) {
          // Listening acoustic pulse
          const freq = (i / numBars) * Math.PI * 2;
          const amplitude = 14 * (Math.cos(phase + freq) * 0.5 + 0.5);
          barHeight = Math.max(3, amplitude);
        } else {
          // Static minimal baseline when idle
          barHeight = 2.5;
        }

        const x = i * (barWidth + 2);
        const y = centerY - barHeight / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (isSpeaking) {
          grad.addColorStop(0, '#56E7FF');
          grad.addColorStop(1, '#4C8DFF');
        } else if (isListening) {
          grad.addColorStop(0, '#63F2B2');
          grad.addColorStop(1, '#56E7FF');
        } else {
          grad.addColorStop(0, 'rgba(86, 231, 255, 0.2)');
          grad.addColorStop(1, 'rgba(76, 141, 255, 0.1)');
        }

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      if (isSpeaking || isListening) {
        phase += 0.08;
      }
      animationFrameId = requestAnimationFrame(renderWaveform);
    };

    renderWaveform();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isSpeaking, isListening]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, liveTranscript]);

  const handleDispatch = (rawInput) => {
    if (!rawInput.trim()) return;
    soundManager.playClick();
    setMicError(null);
    setIsProcessing(true);

    const userMsg = {
      sender: 'user',
      text: rawInput,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    const cmdResult = parseCommand(rawInput);
    const butlerMsg = {
      sender: 'aurelion',
      text: cmdResult.response,
      action: cmdResult.action,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    setTimeout(() => {
      setIsProcessing(false);
      setMessages((prev) => [...prev, userMsg, butlerMsg]);
      setInputText('');
      setLiveTranscript('');

      if (soundEnabled) {
        soundManager.playAcknowledge();
      }

      // Unified male butler voice vocalization
      speak(cmdResult.response);

      // Trigger action
      if (onExecuteAction && cmdResult.action) {
        onExecuteAction(cmdResult.action, cmdResult.target);
      }
    }, 150);
  };

  const handleMicToggle = () => {
    soundManager.playClick();
    setMicError(null);

    if (isListening) {
      stopListening();
    } else {
      startListening(
        (finalTranscript) => {
          setLiveTranscript(finalTranscript);
          handleDispatch(finalTranscript);
        },
        (error) => {
          setMicError(`Mic Error: ${error}`);
        }
      );
    }
  };

  const handleSpeakSectionBriefing = () => {
    soundManager.playPowerPulse();
    const briefing = AURELION_DIALOGUE.detailedIntroductions[activeSection] || AURELION_DIALOGUE.arrivals[activeSection];
    if (briefing) {
      speak(briefing);
      setMessages(prev => [
        ...prev,
        {
          sender: 'aurelion',
          text: briefing,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
        }
      ]);
    }
  };

  const handleStopSpeaking = () => {
    soundManager.playClick();
    stop();
  };

  const samplePrompts = [
    "Introduce Thirumal",
    "Open MEDINV",
    "Open KINEX",
    "Tell me about my metro project",
    "Open the PCB laboratory",
    "Show my experience",
    "Show my skills",
    "Help"
  ];

  const currentStatusLabel = isSpeaking 
    ? 'VOCALIZING' 
    : isListening 
      ? 'LISTENING' 
      : isProcessing 
        ? 'PROCESSING' 
        : 'STANDBY';

  return (
    <div className="aurelion-panel tactical-panel tactical-panel-corner">
      {/* Panel Header */}
      <div className="aurelion-header">
        <div className="aurelion-id">
          <div className="aurelion-avatar">
            <Bot size={20} className="text-cyan" />
            <span className={`status-dot ${isSpeaking ? 'warning pulse-icon' : isListening ? 'online pulse-icon' : 'online'}`} />
          </div>
          <div>
            <div className="aurelion-name-row">
              <span className="aurelion-title">AURELION</span>
              <span className="telemetry-tag">AI BUTLER // v2.4</span>
            </div>
            <div className="aurelion-voice-info mono text-dim">
              <Headphones size={11} className="text-cyan" />
              <span>{selectedVoice ? selectedVoice.name : 'System Voice'}</span>
            </div>
          </div>
        </div>

        {/* Voice control buttons */}
        <div className="aurelion-header-actions">
          {/* Spoken Introduction Button */}
          <button
            type="button"
            className="btn-tactical btn-compact btn-tactical-gold mono"
            onClick={handleSpeakSectionBriefing}
            title="AURELION Detailed Spoken Section Briefing"
            aria-label="Speak section briefing"
          >
            <Volume2 size={13} />
            <span>BRIEFING</span>
          </button>

          {isSpeaking && (
            <button
              type="button"
              className="btn-tactical btn-compact btn-tactical-outline mono"
              onClick={handleStopSpeaking}
              title="Stop vocalization"
              aria-label="Stop vocalization"
            >
              <Square size={11} />
              <span>SILENCE</span>
            </button>
          )}

          <button
            type="button"
            className={`btn-tactical btn-compact ${isListening ? 'btn-tactical-gold pulse-btn' : 'btn-tactical-outline'} mono`}
            onClick={handleMicToggle}
            title="Toggle microphone for voice directive"
            aria-label="Toggle voice input"
          >
            {isListening ? <MicOff size={13} /> : <Mic size={13} />}
            <span>{isListening ? 'LISTENING' : 'VOICE IN'}</span>
          </button>
        </div>
      </div>

      {/* Waveform Telemetry Display */}
      <div className="aurelion-waveform-box">
        <div className="waveform-info mono">
          <span className="text-cyan">STATE: {currentStatusLabel}</span>
          <span className="telemetry-tag">{voiceQualityReport}</span>
        </div>
        <canvas ref={canvasRef} width={380} height={36} className="waveform-canvas" />
      </div>

      {micError && (
        <div className="mic-notice error mono">
          <AlertCircle size={13} />
          <span>{micError}</span>
        </div>
      )}

      {/* Chat Transcript Stream */}
      <div className="aurelion-chat-stream" ref={chatScrollRef}>
        {messages.map((m, idx) => (
          <div key={idx} className={`chat-bubble-wrap ${m.sender}`}>
            <div className="chat-bubble">
              <div className="bubble-meta mono">
                <span className="bubble-sender">{m.sender === 'aurelion' ? 'AURELION BUTLER' : 'OPERATOR'}</span>
                <span className="bubble-time">{m.timestamp}</span>
              </div>
              <p className="bubble-text">{m.text}</p>
            </div>
          </div>
        ))}

        {liveTranscript && (
          <div className="chat-bubble-wrap user interim">
            <div className="chat-bubble">
              <div className="bubble-meta mono">
                <span>RECOGNIZING VOICE DIRECTIVE...</span>
              </div>
              <p className="bubble-text">{liveTranscript}...</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Directives Chips */}
      <div className="quick-directives-wrap">
        <span className="quick-label mono">FAST DIRECTIVES:</span>
        <div className="directives-chips-row">
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              className="btn-directive-chip mono"
              onClick={() => handleDispatch(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Text Command Input Bar */}
      <form 
        className="aurelion-input-bar" 
        onSubmit={(e) => {
          e.preventDefault();
          handleDispatch(inputText);
        }}
      >
        <input
          type="text"
          className="tactical-input mono"
          placeholder="Issue directive to Aurelion (e.g. 'open medinv', 'projects')..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          aria-label="Direct message to Aurelion"
        />
        <button
          type="submit"
          className="btn-tactical btn-tactical-gold btn-send-icon"
          disabled={!inputText.trim()}
          title="Send command"
          aria-label="Send command"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
