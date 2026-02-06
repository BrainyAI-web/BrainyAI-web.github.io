const brain = {
  waitingForSummary: false,
  lastIntent: null,

  async reply(input) {
    const cleaned = input.toLowerCase().trim();
    if (this.waitingForSummary) {
      this.waitingForSummary = false;
      return `📝 Riassunto di "${cleaned}" pronto! (Simulato)`;
    }

    const intent = this.detectIntent(cleaned);
    this.lastIntent = { intent };
    const topic = this.extractTopic(cleaned);

    switch (intent) {
      case "greeting": return this.greet();
      case "summary":
        this.waitingForSummary = true;
        return "Sì! Mandami il testo o l’argomento 📄";
      case "exercise": return this.handleExercise(topic);
      case "translate": return this.handleTranslate(cleaned);
      case "define": return this.handleDefine(topic);
      case "trivia": return this.handleTrivia();
      case "recommend": return this.handleRecommend(topic);
      default: return this.chatFreeStyle(cleaned);
    }
  },

  detectIntent(text) {
    const intents = {
      greeting: ["ciao","hey","ehi"],
      summary: ["riassunto","sintesi","riassumere"],
      exercise: ["esercizi","quiz","test"],
      translate: ["traduci","translate"],
      define: ["definizione","cos'è","definisci"],
      trivia: ["curiosità","fatto","fatti"],
      recommend: ["consigliami","libri","lista"]
    };
    for (const i in intents) if (intents[i].some(w => text.includes(w))) return i;
    return "search";
  },

  extractTopic(text){
    return text.split(" ").slice(1).join(" ");
  },

  greet(){ return "Ciao! 👋 Dimmi cosa vuoi fare oggi (riassunti, esercizi, curiosità…)"; },
  handleExercise(topic){ return `✏️ Esercizi su ${topic || "argomento"}: 1) Spiega 2) Esempi 3) Punti chiave`; },
  handleTranslate(text){ return `Traduzione simulata di "${text}"`; },
  handleDefine(topic){ return `📖 Definizione simulata di "${topic}"`; },
  handleTrivia(){ const f = ["Lo sapevi che le api comunicano con la danza?","I polpi hanno tre cuori","La Luna si allontana 3,8cm all’anno"]; return f[Math.floor(Math.random()*f.length)]; },
  handleRecommend(topic){ const l = ["Harry Potter","Il Signore degli Anelli","Percy Jackson"]; return `📚 Consigli su ${topic || "fantasy"}: `+l.join(", "); },
  chatFreeStyle(text){ const r=["Interessante!","Ah sì? Continua","Non sapevo!"]; return r[Math.floor(Math.random()*r.length)]; }
};
