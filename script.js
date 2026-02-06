const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

loadHistory();

sendBtn.onclick = send;
input.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    send();
  }
});

function addMsg(text, cls) {
  const div = document.createElement("div");
  div.className = "msg " + cls;
  chat.appendChild(div);
  typeText(div, text);
}

function send() {
  const text = input.value.trim();
  if (!text) return;

  save("user", text);
  addMsg(text, "user");
  input.value = "";

  setTimeout(() => {
    const reply = brain.think(text);
    save("bot", reply);
    addMsg(reply, "bot");
  }, 600);
}

function typeText(el, text) {
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i++];
    chat.scrollTop = chat.scrollHeight;
    if (i >= text.length) clearInterval(interval);
  }, 20);
}

function save(role, text) {
  const history = JSON.parse(localStorage.getItem("chat")) || [];
  history.push({ role, text });
  localStorage.setItem("chat", JSON.stringify(history));
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("chat")) || [];
  history.forEach(m => addMsg(m.text, m.role));
}
