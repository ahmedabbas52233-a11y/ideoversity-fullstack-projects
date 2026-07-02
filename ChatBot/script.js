function addMsg(name, text, colorClass) {
  const msg = document.createElement('div');
  msg.className = 'msg ' + colorClass;
  msg.innerHTML = '<b>' + name + ':</b> ' + text;
  document.getElementById('area-ahmad').appendChild(msg.cloneNode(true));
  document.getElementById('area-ali').appendChild(msg.cloneNode(true));
  document.getElementById('area-ahmad').scrollTop =
    document.getElementById('area-ahmad').scrollHeight;
  document.getElementById('area-ali').scrollTop =
    document.getElementById('area-ali').scrollHeight;
}

function sendAhmad() {
  const input = document.getElementById('input-ahmad');
  const text = input.value.trim();
  if (!text) return;
  addMsg('Ahmad', text, 'msg-ahmad');
  input.value = '';
}

function sendAli() {
  const input = document.getElementById('input-ali');
  const text = input.value.trim();
  if (!text) return;
  addMsg('Ali', text, 'msg-ali');
  input.value = '';
}
