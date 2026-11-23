# DNS

Domain Name System

---

## Pourquoi le DNS ?

<p>« Je veux voir le site de MiNET, c'est quoi l'IP déjà ? »</p>

<div class="pipeline fragment">
<div class="stage accent"><code>minet.net</code></div>
<div class="arrow">→</div>
<div class="stage"><code>157.159.40.44</code></div>
</div>

---

## Sans DNS

<div class="net">
<svg viewBox="0 0 1000 470">
<defs><marker id="nodns-q" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path class="head q" d="M0,0 L10,5 L0,10 z"/></marker></defs>
<line class="link" x1="200" y1="210" x2="290" y2="210"/>
<line class="link" x1="430" y1="195" x2="558" y2="108"/>
<line class="link" x1="643" y1="105" x2="800" y2="195"/>
<g class="node"><rect x="20" y="170" width="180" height="80"/><text x="110" y="203">Client</text><text class="ip" x="110" y="232">69.69.69.69</text></g>
<g class="node"><rect x="290" y="180" width="140" height="60"/><text x="360" y="218">Routeur</text></g>
<g class="node cloud"><circle cx="600" cy="80" r="50"/><text x="600" y="87">Internet</text></g>
<g class="node"><rect x="800" y="170" width="180" height="80"/><text x="890" y="203">MiNET</text><text class="ip" x="890" y="232">157.159.40.44</text></g>
<g class="fragment fade-in-then-out"><line class="hop q" x1="200" y1="210" x2="290" y2="210" marker-end="url(#nodns-q)"/><text class="caption" x="500" y="455">Client : « Montre-moi minet.net »</text></g>
<g class="fragment"><line class="hop ko" x1="200" y1="210" x2="290" y2="210"/><text class="cross" x="360" y="160">✗</text><text class="caption" x="500" y="455">Routeur : « Je ne comprends que les IP, c'est quoi ça ? »</text></g>
</svg>
</div>

---

## Avec DNS

<div class="net">
<svg viewBox="0 0 1000 470">
<defs><marker id="dns-q" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path class="head q" d="M0,0 L10,5 L0,10 z"/></marker><marker id="dns-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path class="head r" d="M0,0 L10,5 L0,10 z"/></marker></defs>
<line class="link" x1="200" y1="210" x2="290" y2="210"/>
<line class="link" x1="430" y1="195" x2="558" y2="108"/>
<line class="link" x1="643" y1="105" x2="800" y2="195"/>
<line class="link" x1="600" y1="130" x2="600" y2="320"/>
<g class="node"><rect x="20" y="170" width="180" height="80"/><text x="110" y="203">Client</text><text class="ip" x="110" y="232">90.91.82.128</text></g>
<g class="node"><rect x="290" y="180" width="140" height="60"/><text x="360" y="218">Routeur</text></g>
<g class="node cloud"><circle cx="600" cy="80" r="50"/><text x="600" y="87">Internet</text></g>
<g class="node"><rect x="800" y="170" width="180" height="80"/><text x="890" y="203">MiNET</text><text class="ip" x="890" y="232">157.159.40.44</text></g>
<g class="node accent"><rect x="510" y="320" width="180" height="80"/><text x="600" y="353">Résolveur DNS</text><text class="ip" x="600" y="382">1.1.1.1</text></g>
<g class="fragment fade-in-then-out"><line class="hop q" x1="200" y1="210" x2="290" y2="210" marker-end="url(#dns-q)"/><line class="hop q" x1="430" y1="195" x2="558" y2="108" marker-end="url(#dns-q)"/><line class="hop q" x1="600" y1="130" x2="600" y2="320" marker-end="url(#dns-q)"/><text class="caption" x="500" y="455">Client → 1.1.1.1 : « Quelle est l'adresse de minet.net ? »</text></g>
<g class="fragment fade-in-then-out"><line class="hop r" x1="600" y1="320" x2="600" y2="130" marker-end="url(#dns-r)"/><line class="hop r" x1="558" y1="108" x2="430" y2="195" marker-end="url(#dns-r)"/><line class="hop r" x1="290" y1="210" x2="200" y2="210" marker-end="url(#dns-r)"/><text class="caption" x="500" y="455">1.1.1.1 → Client : « minet.net est à 157.159.40.44 »</text></g>
<g class="fragment fade-in-then-out"><line class="hop q" x1="200" y1="210" x2="290" y2="210" marker-end="url(#dns-q)"/><line class="hop q" x1="430" y1="195" x2="558" y2="108" marker-end="url(#dns-q)"/><line class="hop q" x1="643" y1="105" x2="800" y2="195" marker-end="url(#dns-q)"/><text class="caption" x="500" y="455">Client → MiNET : « Montre-moi 157.159.40.44 »</text></g>
<g class="fragment"><line class="hop r" x1="800" y1="195" x2="643" y2="105" marker-end="url(#dns-r)"/><line class="hop r" x1="558" y1="108" x2="430" y2="195" marker-end="url(#dns-r)"/><line class="hop r" x1="290" y1="210" x2="200" y2="210" marker-end="url(#dns-r)"/><text class="caption" x="500" y="455">MiNET → Client : « Voilà la page » ✓</text></g>
</svg>
</div>

---

## Un nom de domaine

<div class="domain">
<span class="part">formations</span>.<span class="part">minet</span>.<span class="part">net</span>.<span class="part root">&nbsp;</span>
</div>

<table class="small">
<tr class="fragment"><td><code>.</code></td><td>racine (root)</td><td>13 serveurs racine, <code>a</code> à <code>m.root-servers.net</code></td></tr>
<tr class="fragment"><td><code>net</code></td><td>TLD (Top Level Domain)</td><td>géré par Verisign</td></tr>
<tr class="fragment"><td><code>minet</code></td><td>domaine</td><td>acheté chez un registrar</td></tr>
<tr class="fragment"><td><code>formations</code></td><td>sous-domaine</td><td>créé par minet</td></tr>
</table>

<p class="small fragment">On lit de droite à gauche : chaque niveau délègue au suivant</p>

---

## Résolution récursive

<p class="desc">Le client ne demande qu'au résolveur</p>

<div class="seq">
<div class="seq-head"><span>Client</span><span>Résolveur <code>1.1.1.1</code></span></div>
<div class="msg right fragment">Adresse de <code>formations.minet.net</code> ?</div>
<div class="msg left fragment"><code>157.159.40.44</code></div>
</div>

<p class="fragment">Mais comment <code>1.1.1.1</code> trouve-t-il la réponse ?</p>

---

## Serveur racine

<div class="seq">
<div class="seq-head"><span>Résolveur <code>1.1.1.1</code></span><span>Racine <code>e.root-servers.net</code></span></div>
<div class="msg right fragment"><code>.net</code> ?</div>
<div class="msg left fragment">Demande à <code>a.gtld-servers.net</code></div>
</div>

<p class="fragment">La racine ne connaît pas la réponse, mais sait qui gère <code>.net</code></p>
<p class="fragment"><code>a.gtld-servers.net</code> est lui-même en <code>.net</code>… <strong class="ko">Boucle ?</strong></p>

---

## Glue record

<p class="desc">Le serveur transmet un <strong>nom</strong> de serveur et non une IP</p>

<p class="fragment">Pour éviter la boucle, il « colle » l'adresse IP au nom</p>

<div class="seq fragment">
<div class="seq-head"><span>Résolveur <code>1.1.1.1</code></span><span>Racine <code>e.root-servers.net</code></span></div>
<div class="msg left"><code>a.gtld-servers.net</code> + <code>192.5.6.30</code></div>
</div>

---

## Serveur TLD

<div class="seq">
<div class="seq-head"><span>Résolveur <code>1.1.1.1</code></span><span>TLD <code>a.gtld-servers.net</code></span></div>
<div class="msg right fragment"><code>minet.net</code> ?</div>
<div class="msg left fragment">Demande à <code>ns1.minet.net</code></div>
</div>

<p class="fragment">Le TLD sait quel serveur fait <strong>autorité</strong> sur <code>minet.net</code></p>

---

## Serveur autoritaire

<div class="seq">
<div class="seq-head"><span>Résolveur <code>1.1.1.1</code></span><span>Autoritaire <code>ns1.minet.net</code></span></div>
<div class="msg right fragment"><code>formations.minet.net</code> ?</div>
<div class="msg left fragment"><code>157.159.40.44</code></div>
</div>

---

## Résolution récursive

<table class="small">
<thead><tr><th></th><th>Question</th><th>Serveur</th><th>Réponse</th></tr></thead>
<tbody>
<tr><td>1</td><td><code>formations.minet.net</code></td><td>Résolveur <code>1.1.1.1</code></td><td>…</td></tr>
<tr class="fragment"><td>2</td><td><code>.net</code> ?</td><td>Racine</td><td><code>a.gtld-servers.net</code></td></tr>
<tr class="fragment"><td>3</td><td><code>minet.net</code> ?</td><td>TLD</td><td><code>ns1.minet.net</code></td></tr>
<tr class="fragment"><td>4</td><td><code>formations.minet.net</code></td><td>Autoritaire</td><td><code>157.159.40.44</code></td></tr>
<tr class="fragment"><td>5</td><td colspan="2">Le résolveur répond au client</td><td><code>157.159.40.44</code></td></tr>
</tbody>
</table>

---

## Les enregistrements

<table class="small">
<tr><td><code>A</code></td><td>nom → IPv4</td><td><code>minet.net → 157.159.40.44</code></td></tr>
<tr class="fragment"><td><code>AAAA</code></td><td>nom → IPv6</td><td></td></tr>
<tr class="fragment"><td><code>CNAME</code></td><td>nom → autre nom (alias)</td><td></td></tr>
<tr class="fragment"><td><code>NS</code></td><td>serveur qui fait autorité sur la zone</td><td><code>minet.net → ns1.minet.net</code></td></tr>
<tr class="fragment"><td><code>MX</code></td><td>serveur mail du domaine</td><td></td></tr>
<tr class="fragment"><td><code>TXT</code></td><td>texte libre (SPF, vérifications…)</td><td></td></tr>
<tr class="fragment"><td><code>PTR</code></td><td>IP → nom (DNS inverse)</td><td></td></tr>
</table>

---

## En pratique

```bash
dig minet.net
dig minet.net AAAA
dig @1.1.1.1 minet.net
dig +trace formations.minet.net
dig -x 157.159.40.44
```

<p class="small fragment"><code>+trace</code> : refait la résolution étape par étape, depuis la racine</p>
