const brain = {
  persona: "Sei un assistente utile, amichevole e intelligente.",

  memory: [],

  think(input) {
    this.memory.push(input);

    input = input.toLowerCase();

    if (input.startsWith("/help"))
      return "Comandi disponibili: /help /clear /persona";

    if (input.startsWith("/clear")) {
      localStorage.clear();
      return "Memoria cancellata ✅";
    }

    if (input.startsWith("/persona")) {
      this.persona = input.replace("/persona", "").trim();
      return "Personalità aggiornata 😎";
    }

    if (input.includes("ciao"))
      return "Ciao! Come posso aiutarti oggi? 😊";

    if (input.includes("chi sei"))
      return "Sono una ChatGPT simulata che gira solo su GitHub Pages 😄";

    if (input.includes("aiuto"))
      return "Dimmi cosa ti serve, provo a ragionarci 🧠";

    return this.generateSmartAnswer(input);
  },

  generateSmartAnswer(input) {
    if (this.memory.length > 3)
      return "Interessante. Tenendo conto di quello che hai detto prima, penso che tu stia cercando una soluzione pratica.";

    return "Capisco quello che dici. Puoi spiegarmi meglio?";
  }
};
