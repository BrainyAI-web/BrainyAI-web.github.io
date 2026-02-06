const chatDiv = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

function addMsg(text, cls) {
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.innerText = text;
  chatDiv.appendChild(div);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

async function saveChatLocal() {
  if (!currentUser || !currentKey) return;
  const messages = [];
  document.querySelectorAll("#chat .msg").forEach(m => {
    messages.push({ text: m.innerText, cls: m.className.includes("bot") ? "bot" : "user" });
  });
  const enc = await encryptData(currentKey, messages);
  localStorage.setItem("chat_" + currentUser, JSON.stringify(enc));
}

send.onclick = async () => {
  const txt = input.value.trim();
  if (!txt) return;
  addMsg(txt, "user");
  input.value = "";
  const reply = await brain.reply(txt);
  addMsg(reply, "bot");
  await saveChatLocal();
};

// Carica chat esistente all'accesso
async function loadChat() {
  chatDiv.innerHTML = "";
  if (!currentUser || !currentKey) return;
  const c = localStorage.getItem("chat_" + currentUser);
  if (!c) return;
  try {
    const data = await decryptData(currentKey, JSON.parse(c));
    data.forEach(m => addMsg(m.text, m.cls));
  } catch {}
}
