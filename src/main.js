import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown';
import Highlight from 'reveal.js/plugin/highlight';
import Notes from 'reveal.js/plugin/notes';
import QRCode from 'qrcode';

import 'reveal.js/reset.css';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/black.css';
import 'reveal.js/plugin/highlight/monokai.css';
import './style.css';

const deck = new Reveal({
  hash: true,
  plugins: [Markdown, Highlight, Notes],
});

deck.initialize().then(() => {
  // QR codes : <div class="qr" data-url="..."></div>
  document.querySelectorAll('.qr[data-url]').forEach(async (el) => {
    el.innerHTML = await QRCode.toString(el.dataset.url, { type: 'svg', margin: 2 });
  });
});
