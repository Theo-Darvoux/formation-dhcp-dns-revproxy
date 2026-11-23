# DHCP

Dynamic Host Configuration Protocol

---

## Communiquer sur un réseau

<table class="small">
<tr><td><strong>Adresse MAC</strong></td><td>identifiant de la carte réseau</td><td><code>e8:f1:40:03:58:85</code></td></tr>
<tr class="fragment"><td><strong>Adresse IP</strong></td><td>adresse de la machine sur le réseau</td><td><code>192.168.1.69/24</code></td></tr>
<tr class="fragment"><td><strong>Table ARP</strong></td><td>correspondance IP → MAC sur le réseau local</td><td><code>ip neigh</code></td></tr>
<tr class="fragment"><td><strong>Passerelle par défaut</strong></td><td>routeur à qui envoyer tout ce qui sort du réseau local</td><td><code>192.168.1.1</code></td></tr>
</table>

---

## Communiquer sur un réseau

<div class="pipeline">
<div class="stage">Utilisateur<br><code>192.168.1.69</code></div>
<div class="arrow">→</div>
<div class="stage accent">Passerelle<br><code>192.168.1.1</code></div>
<div class="arrow">→</div>
<div class="stage">Internet</div>
</div>

<p>Pour sortir du réseau local, on passe par la passerelle par défaut</p>

---

## Je peux me co ?

<div class="pipeline">
<div class="stage">Nouvelle machine<br><code>e8:f1:40:03:58:85</code><br><code>IP : ???</code></div>
<div class="arrow">?</div>
<div class="stage">Routeur<br><code>192.168.1.1</code></div>
</div>

<p class="fragment">Une machine qui arrive sur le réseau n'a qu'une adresse MAC</p>
<p class="fragment">Configurer l'IP à la main sur chaque machine ? Non merci.</p>
<p class="fragment"><strong>DHCP</strong> : un serveur distribue automatiquement la configuration réseau</p>

---

## DORA

<div class="seq">
<div class="seq-head"><span>Client</span><span>Serveur DHCP</span></div>
<div class="msg right fragment">DHCP <strong>D</strong>ISCOVER <small>Y'a quelqu'un ?</small></div>
<div class="msg left fragment">DHCP <strong>O</strong>FFER <small>Tu veux cette adresse ?</small></div>
<div class="msg right fragment">DHCP <strong>R</strong>EQUEST <small>OK ça me va !</small></div>
<div class="msg left fragment">DHCP <strong>A</strong>CKNOWLEDGE <small>OK, tiens</small></div>
</div>

---

## Discover

<p class="desc">Le client envoie une requête en <strong>broadcast</strong> pour savoir s'il existe un serveur DHCP sur le réseau</p>

<table class="small">
<tr><td>Source</td><td><code>0.0.0.0:68</code></td><td>le client n'a pas encore d'IP</td></tr>
<tr><td>Destination</td><td><code>255.255.255.255:67</code></td><td>tout le réseau local</td></tr>
<tr><td>Contenu</td><td colspan="2">l'adresse MAC du client</td></tr>
</table>

<p class="small fragment">DHCP utilise UDP : port 67 pour le serveur, 68 pour le client</p>

---

## Offer

<p class="desc">Le serveur propose au client une adresse choisie dans sa <strong>pool</strong> d'adresses IP non utilisées</p>

<div class="pipeline">
<div class="stage">Pool<br><code>192.168.1.10</code> → <code>192.168.1.200</code></div>
<div class="arrow">→</div>
<div class="stage accent">Proposition<br><code>192.168.1.69</code></div>
</div>

<p class="small fragment">Plusieurs serveurs DHCP peuvent répondre donc le client choisit une seule offre</p>

---

## Request

<p class="desc">Le client indique qu'il accepte la proposition d'adresse IP</p>

<p class="small fragment">En <strong>broadcast</strong> pour que les autres serveurs voient que leur offre est refusée</p>

---

## Ack

<p class="desc">Le serveur confirme et envoie toutes les informations nécessaires pour se connecter au réseau</p>

<table class="small">
<tr class="fragment"><td><strong>Adresse IP</strong></td><td><code>192.168.1.69</code></td></tr>
<tr class="fragment"><td><strong>Masque</strong></td><td><code>255.255.255.0</code> (<code>/24</code>)</td></tr>
<tr class="fragment"><td><strong>Passerelle</strong></td><td><code>192.168.1.1</code></td></tr>
<tr class="fragment"><td><strong>Serveurs DNS</strong></td><td><code>1.1.1.1</code></td></tr>
<tr class="fragment"><td><strong>Durée du bail</strong></td><td><code>86400</code> s</td></tr>
</table>

---

## Le bail

<ul class="small">
<li class="fragment">À 50 % du bail : le client redemande au même serveur (<code>REQUEST</code> en unicast)</li>
<li class="fragment">À 87,5 % : il redemande à n'importe quel serveur (broadcast)</li>
<li class="fragment">Si le bail expire, il perd son adresse et recommence un <code>DISCOVER</code></li>
</ul>

---

## Et maintenant ?

<div class="pipeline">
<div class="stage">Client<br><code>192.168.1.69</code></div>
<div class="arrow">→</div>
<div class="stage accent">Passerelle<br><code>192.168.1.1</code></div>
<div class="arrow">→</div>
<div class="stage">Internet</div>
</div>

<p class="fragment">« Je suis <code>192.168.1.69</code> et je veux aller sur internet »</p>
