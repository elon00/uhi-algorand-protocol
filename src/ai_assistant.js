/**
 * Multimodal AI Voice & Chat Assistant for Algorand UHI Protocol
 */

class AlgorandUhiAiAssistant {
  constructor(chatBodyId, inputId, micBtnId, sendBtnId) {
    this.chatBody = document.getElementById(chatBodyId);
    this.input = document.getElementById(inputId);
    this.micBtn = document.getElementById(micBtnId);
    this.sendBtn = document.getElementById(sendBtnId);
    this.isRecording = false;

    this.initSpeech();
    this.bindEvents();
  }

  initSpeech() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isRecording = true;
        this.micBtn.classList.add('recording');
      };

      this.recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        this.input.value = transcript;
        this.handleSend();
      };

      this.recognition.onerror = (e) => {
        console.warn("Speech recognition error:", e);
        this.stopRecording();
      };

      this.recognition.onend = () => {
        this.stopRecording();
      };
    } else {
      if (this.micBtn) {
        this.micBtn.style.opacity = '0.5';
        this.micBtn.title = 'Voice recognition not supported in this browser';
      }
    }
  }

  stopRecording() {
    this.isRecording = false;
    if (this.micBtn) this.micBtn.classList.remove('recording');
  }

  speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  bindEvents() {
    if (this.sendBtn) this.sendBtn.addEventListener('click', () => this.handleSend());
    if (this.input) {
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSend();
      });
    }

    if (this.micBtn) {
      this.micBtn.addEventListener('click', () => {
        if (!this.recognition) {
          alert("Voice recognition is not supported in this browser.");
          return;
        }
        if (this.isRecording) {
          this.recognition.stop();
        } else {
          try {
            this.recognition.start();
          } catch (err) {
            console.warn("Speech error:", err);
          }
        }
      });
    }
  }

  appendMessage(text, isAi = false) {
    if (!this.chatBody) return;
    const msg = document.createElement('div');
    msg.className = `chat-msg ${isAi ? 'ai-msg' : 'user-msg'}`;
    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerText = text;
    msg.appendChild(bubble);
    this.chatBody.appendChild(msg);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  handleSend() {
    const text = this.input.value.trim();
    if (!text) return;

    this.appendMessage(text, false);
    this.input.value = '';

    setTimeout(() => {
      const resp = this.computeResponse(text);
      this.appendMessage(resp, true);
      this.speak(resp);
    }, 350);
  }

  computeResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('algorand') || q.includes('algo') || q.includes('ppos')) {
      return "Algorand is built on Pure Proof of Stake (PPoS) with 2.8-second instant block finality and ~0.001 ALGO micro-fees. This high throughput and zero-forking architecture make it ideal for high-frequency AI microtaxes and Universal High Income payouts.";
    }

    if (q.includes('falcon') || q.includes('quantum') || q.includes('pqc') || q.includes('state proof')) {
      return "Algorand natively deploys post-quantum Falcon-512 signatures in State Proofs. In the UHI protocol, we bind Falcon keys and NIST FIPS 204 ML-DSA to ensure all treasury holdings and human dividend claims are completely immune to quantum computers.";
    }

    if (q.includes('atomic') || q.includes('x402') || q.includes('tax')) {
      return "In the x402 Bazaar on Algorand, payments utilize Atomic Transaction Groups. When an autonomous AI or Tesla Optimus robot executes a paid task, 90% is settled to the provider while 10% is atomically and simultaneously bonded to the UHI Treasury in the same transaction block.";
    }

    if (q.includes('conway') || q.includes('entropy') || q.includes('multiplier')) {
      return "The Conway 16x16 Autonomic Grid simulates living decentralized compute nodes. The living cell density generates algorithmic entropy that scales the Algorand UHI distribution multiplier between 1.0x and 1.5x!";
    }

    if (q.includes('elon') || q.includes('uhi') || q.includes('vision') || q.includes('income')) {
      return "Elon Musk envisions Universal High Income as the economic foundation of post-scarcity: as autonomous robotics and AI eliminate physical labor costs, the resulting surplus is distributed as a generous human dividend with deflationary abundance.";
    }

    return "The UHI Algorand Protocol is operational. Powered by Algorand Atomic Transfers, native Falcon State Proofs, and the Web 4.0 Conway Autonomic Grid, we deliver gas-efficient Universal High Income directly to verified citizens.";
  }
}

window.AlgorandUhiAiAssistant = AlgorandUhiAiAssistant;
