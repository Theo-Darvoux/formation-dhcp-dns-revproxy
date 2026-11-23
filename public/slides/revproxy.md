# Reverse proxy

Exemple : nginx

---

## Le problème

<p>MiNET a <strong>une seule</strong> IP publique : <code>157.159.40.44</code></p>

<div class="pipeline fragment" style="font-size:0.6em">
<div class="stage"><code>minet.net</code></div>
<div class="stage"><code>wiki.minet.net</code></div>
<div class="stage"><code>grafana.minet.net</code></div>
</div>

<p class="fragment">…et plein de services, chacun sur sa machine</p>
<p class="fragment">Mais un seul port <code>443</code> (HTTPS) sur cette IP. <strong class="ko">Qui&nbsp;répond&nbsp;?</strong></p>

---

## Proxy ou reverse proxy ?

<p class="desc"><strong>Proxy</strong> (forward) : parle au nom des <strong>clients</strong></p>

<div class="pipeline">
<div class="stage">Clients</div>
<div class="arrow">→</div>
<div class="stage accent">Proxy</div>
<div class="arrow">→</div>
<div class="stage">Internet</div>
</div>

<div class="fragment">
<p class="desc"><strong>Reverse proxy</strong> : parle au nom des <strong>serveurs</strong></p>

<div class="pipeline">
<div class="stage">Internet</div>
<div class="arrow">→</div>
<div class="stage accent">Reverse proxy</div>
<div class="arrow">→</div>
<div class="stage">Serveurs</div>
</div>
</div>

<p class="small fragment">Le client croit parler directement au site, il ne voit que le reverse proxy</p>

---

## Avec un reverse proxy

<div class="net">
<svg viewBox="0 0 1000 470">
<defs><marker id="rp-q" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path class="head q" d="M0,0 L10,5 L0,10 z"/></marker><marker id="rp-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path class="head r" d="M0,0 L10,5 L0,10 z"/></marker></defs>
<rect class="zone" x="770" y="15" width="220" height="375"/>
<text class="zone-label" x="880" y="420">Réseau privé</text>
<line class="link" x1="200" y1="210" x2="280" y2="210"/>
<line class="link" x1="380" y1="210" x2="450" y2="210"/>
<line class="link" x1="630" y1="210" x2="790" y2="85"/>
<line class="link" x1="630" y1="210" x2="790" y2="210"/>
<line class="link" x1="630" y1="210" x2="790" y2="335"/>
<g class="node"><rect x="20" y="170" width="180" height="80"/><text x="110" y="203">Client</text><text class="ip" x="110" y="232">90.91.82.128</text></g>
<g class="node cloud"><circle cx="330" cy="210" r="50"/><text x="330" y="217">Internet</text></g>
<g class="node accent"><rect x="450" y="170" width="180" height="80"/><text x="540" y="203">nginx</text><text class="ip" x="540" y="232">157.159.40.44</text></g>
<g class="node"><rect x="790" y="50" width="180" height="70"/><text x="880" y="80">Wiki</text><text class="ip" x="880" y="107">10.0.0.2:3000</text></g>
<g class="node"><rect x="790" y="175" width="180" height="70"/><text x="880" y="205">Site</text><text class="ip" x="880" y="232">10.0.0.3:8080</text></g>
<g class="node"><rect x="790" y="300" width="180" height="70"/><text x="880" y="330">Grafana</text><text class="ip" x="880" y="357">10.0.0.4:3000</text></g>
<g class="fragment fade-in-then-out"><line class="hop q" x1="200" y1="210" x2="280" y2="210" marker-end="url(#rp-q)"/><line class="hop q" x1="380" y1="210" x2="450" y2="210" marker-end="url(#rp-q)"/><text class="caption" x="500" y="455">Client → nginx : « Montre-moi wiki.minet.net »</text></g>
<g class="fragment fade-in-then-out"><line class="hop q" x1="630" y1="210" x2="790" y2="85" marker-end="url(#rp-q)"/><text class="caption" x="500" y="455">nginx : « wiki ? C'est 10.0.0.2:3000 » et transmet</text></g>
<g class="fragment fade-in-then-out"><line class="hop r" x1="790" y1="85" x2="630" y2="210" marker-end="url(#rp-r)"/><text class="caption" x="500" y="455">Wiki → nginx : « Voilà la page »</text></g>
<g class="fragment"><line class="hop r" x1="450" y1="210" x2="380" y2="210" marker-end="url(#rp-r)"/><line class="hop r" x1="280" y1="210" x2="200" y2="210" marker-end="url(#rp-r)"/><text class="caption" x="500" y="455">nginx → Client : « Voilà la page » ✓</text></g>
</svg>
</div>

---

## Comment choisir le bon serveur ?

<p class="desc">Toutes les requêtes arrivent sur la même IP… mais le client dit <strong>quel site</strong> il veut</p>

```http [2]
GET / HTTP/1.1
Host: wiki.minet.net
User-Agent: curl/8.11.0
```

<p class="fragment">nginx lit l'en-tête <code>Host</code> et choisit le serveur correspondant</p>
<p class="small fragment">En HTTPS, le nom est aussi envoyé dès la connexion TLS (<strong>SNI</strong>) pour choisir le bon certificat</p>

---

## Deux connexions

<div class="cols">
<div class="seq" style="width:100%">
<div class="seq-head"><span>Client</span><span>nginx</span></div>
<div class="msg right fragment" data-fragment-index="1">GET / <small>Host: wiki.minet.net</small></div>
<div class="msg left fragment" data-fragment-index="4">200 OK <small>la page</small></div>
</div>
<div class="seq" style="width:100%">
<div class="seq-head"><span>nginx</span><span>Wiki <code>10.0.0.2</code></span></div>
<div class="msg right fragment" data-fragment-index="2">GET / <small>nouvelle connexion</small></div>
<div class="msg left fragment" data-fragment-index="3">200 OK <small>la page</small></div>
</div>
</div>

<p class="small fragment" data-fragment-index="5">Le wiki ne voit jamais le client : il ne parle qu'à <strong>nginx</strong></p>

---

## nginx

<p class="desc">Serveur web <strong>et</strong> reverse proxy, très utilisé (dont chez MiNET)</p>

```nginx
server {
    listen 80;
    server_name wiki.minet.net;

    location / {
        proxy_pass http://10.0.0.2:3000;
    }
}
```

<table class="small">
<tr class="fragment"><td><code>listen</code></td><td>port sur lequel nginx écoute</td></tr>
<tr class="fragment"><td><code>server_name</code></td><td>comparé à l'en-tête <code>Host</code></td></tr>
<tr class="fragment"><td><code>proxy_pass</code></td><td>où transmettre la requête</td></tr>
</table>

---

## Plusieurs sites

<p class="desc">Un bloc <code>server</code> par site, nginx choisit grâce à <code>server_name</code></p>

<table class="small">
<thead><tr><th><code>server_name</code></th><th></th><th><code>proxy_pass</code></th></tr></thead>
<tbody>
<tr class="fragment"><td><code>minet.net</code></td><td>→</td><td><code>http://10.0.0.3:8080</code></td></tr>
<tr class="fragment"><td><code>wiki.minet.net</code></td><td>→</td><td><code>http://10.0.0.2:3000</code></td></tr>
<tr class="fragment"><td><code>grafana.minet.net</code></td><td>→</td><td><code>http://10.0.0.4:3000</code></td></tr>
</tbody>
</table>

<p class="small fragment">Côté DNS : les trois noms pointent vers la <strong>même IP</strong>, celle de nginx</p>
<p class="small fragment">Un fichier par site dans <code>sites-available/</code>, activé par un lien dans <code>sites-enabled/</code></p>

---

## Qui est le client ?

<div class="pipeline">
<div class="stage">Client<br><code>90.91.82.128</code></div>
<div class="arrow">→</div>
<div class="stage accent">nginx<br><code>10.0.0.1</code></div>
<div class="arrow">→</div>
<div class="stage">Wiki<br>« Requête de <code>10.0.0.1</code> »</div>
</div>

<p class="small fragment">Le wiki pense que toutes les requêtes viennent de nginx. <strong class="ko">Logs inutiles, bans impossibles</strong></p>

<div class="fragment">

```nginx
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

</div>

<p class="small fragment">nginx ajoute des en-têtes pour transmettre la vraie IP et le protocole d'origine</p>

---

## HTTPS : terminaison TLS

<div class="pipeline">
<div class="stage">Client</div>
<div class="arrow">HTTPS 🔒 →</div>
<div class="stage accent">nginx<br><small>certificat</small></div>
<div class="arrow">HTTP →</div>
<div class="stage">Wiki</div>
</div>

<p class="small fragment">nginx déchiffre, le serveur derrière reçoit du HTTP simple</p>

<div class="fragment">

```nginx
listen 443 ssl;
ssl_certificate     /etc/ssl/wiki/fullchain.pem;
ssl_certificate_key /etc/ssl/wiki/privkey.pem;
```

</div>

<p class="small fragment">Les certificats sont gérés à <strong>un seul endroit</strong> (Let's Encrypt + <code>certbot</code>)</p>

---

## Répartition de charge

<p class="desc">Un même service sur plusieurs machines</p>

```nginx
upstream wiki {
    server 10.0.0.2:3000;
    server 10.0.0.5:3000;
}
# ...
proxy_pass http://wiki;
```

<p class="small fragment">Par défaut, chacun son tour (<em>round-robin</em>)</p>
<p class="small fragment">Si un serveur ne répond plus, nginx l'écarte temporairement</p>

---

## Ce que ça apporte

<table class="small">
<tr class="fragment"><td><strong>Un seul point d'entrée</strong></td><td>plein de services derrière une IP et un port</td></tr>
<tr class="fragment"><td><strong>HTTPS centralisé</strong></td><td>les certificats au même endroit</td></tr>
<tr class="fragment"><td><strong>Sécurité</strong></td><td>les serveurs restent dans le réseau privé</td></tr>
<tr class="fragment"><td><strong>Répartition de charge</strong></td><td>plusieurs serveurs pour un même site</td></tr>
<tr class="fragment"><td><strong>Cache, compression</strong></td><td>soulage les serveurs derrière</td></tr>
<tr class="fragment"><td><strong>Logs</strong></td><td>tout le trafic web passe au même endroit</td></tr>
</table>
