"""
Script d'insertion des 3 articles SEO piliers
Insertion directe MongoDB — N'efface PAS les articles existants
"""
import asyncio
import re
import uuid
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')


def generate_slug(title):
    slug = title.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug.strip('-')


new_posts = [

# ============================================================
# ARTICLE 1 — PILIER 1 : Réduire les absences (TOFU)
# ============================================================
{
    "title": "Comment réduire les absences et les lapins dans votre cabinet ?",
    "excerpt": "Rendez-vous manqués, annulations de dernière minute... Découvrez pourquoi les absences révèlent un déficit de processus — et les 5 actions concrètes pour les réduire durablement dans votre cabinet.",
    "category": "Conseils pratiques",
    "image": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=400&fit=crop",
    "author": "Équipe Espace Agenda",
    "published": True,
    "content": """**Balise title :** Lapins et absences en cabinet : 5 actions pour les réduire (sans changer votre façon de travailler)

**Meta description :** Rendez-vous manqués, annulations de dernière minute… Découvrez pourquoi les absences révèlent un déficit de processus — et les 5 actions concrètes pour les réduire durablement dans votre cabinet.

**Slug URL :** reduire-absences-cabinet-praticien

**Maillage interne :** → /solution · → /offres · → /exemples · → Pilier 2 (gagner du temps) · → Pilier 3 (logiciel de RDV)

---

# Comment réduire les absences et les lapins dans votre cabinet ?

## Introduction — Un lapin par semaine : le calcul que vous n'avez pas encore fait

Un rendez-vous manqué peut sembler anodin. Une exception. Un aléa qu'on absorbe avec un peu de gêne des deux côtés, qu'on note dans un coin, et qu'on oublie le lendemain quand l'agenda reprend son rythme.

Mais posez-vous la question suivante : combien de lapins avez-vous eus ce mois-ci ? Et le mois d'avant ?

Si vous ne savez pas exactement, c'est déjà un problème. Parce qu'un seul rendez-vous manqué par semaine représente **45 à 90 minutes de temps perdu** — le temps de la séance elle-même, auxquelles s'ajoutent les minutes consacrées à gérer l'absence, tenter de joindre le patient, essayer de remplir le créneau en urgence, puis finalement l'absorber. Sur 45 semaines travaillées, c'est une séance non encaissée chaque semaine, un créneau impossible à repourvoir au pied levé, et une charge mentale diffuse qui s'accumule silencieusement en arrière-plan.

Le calcul financier est simple. Si votre séance est à 60 €, un seul lapin par semaine représente **2 700 € de chiffre d'affaires non encaissé par an**. Si votre séance est à 80 €, c'est 3 600 €. Et dans certaines pratiques, il n'y a pas un lapin par semaine — il y en a deux, parfois trois, en période creuse.

Ce n'est pas une critique de vos patients. C'est un constat structurel : sans système pour les encadrer, les absences sont prévisibles. La question n'est pas "pourquoi mes patients font des lapins ?" mais "qu'est-ce que j'ai mis en place pour que ce soit difficile d'en faire un ?"

Cet article vous donne les cinq réponses à cette question.

---

## Pourquoi les absences sont plus fréquentes qu'on ne le pense — et pourquoi on les minimise

### Le manque d'outils pour mesurer

La première raison pour laquelle les praticiens sous-estiment leur taux d'absence : personne ne le mesure. Sans outil dédié, pas de tableau de bord, pas de taux d'absence calculé automatiquement, pas de vision sur ce que ce mois-ci a coûté en créneaux vides. On gère chaque lapin au cas par cas, et on n'additionne jamais.

C'est très différent d'un médecin avec un système de gestion de cabinet qui lui indique en temps réel son taux de no-show. Le praticien bien-être indépendant travaille souvent à vue. Il sait qu'il y a des absences, il ne sait pas combien.

### La gêne à poser un cadre

La deuxième raison est plus profonde, et elle touche à l'identité professionnelle. Beaucoup de praticiens bien-être ont choisi ce métier en partie pour la relation humaine qu'il permet — une relation différente de celle du médecin ou du fonctionnaire. Dans ce contexte, imposer un délai d'annulation, demander un acompte ou facturer une absence ressemble à une trahison de l'esprit de la pratique.

Alors on ne le fait pas. On encaisse le lapin. On ne dit rien. On espère que ça ne se reproduira pas. Et ça se reproduit.

Ce que beaucoup de praticiens découvrent en franchissant ce pas : poser un cadre clair ne dégrade pas la relation — il la renforce. Un patient qui sait que vous valorisez votre temps respecte davantage le vôtre. Et ceux qui partent parce que vous avez instauré une politique d'annulation étaient probablement vos patients les moins engagés.

### Le sentiment que "c'est comme ça dans ce métier"

La troisième raison est culturelle. Les absences sont souvent présentées comme une fatalité dans les pratiques bien-être, coaching et thérapeutiques — contrairement aux professions médicales réglementées où les protocoles sont plus stricts. On compare ses absences à celles du collègue, on se dit que c'est dans la moyenne, on normalise.

Or la moyenne d'un système non structuré n'est pas un objectif. C'est un plancher.

---

## Pourquoi les patients oublient ou annulent au dernier moment

Comprendre ce qui se passe du côté du patient est indispensable avant d'agir. Les absences ne sont presque jamais de la mauvaise volonté. Ce sont des comportements prévisibles dans un contexte où rien ne les empêche de se produire.

### La psychologie du rendez-vous faiblement ancré

Un rendez-vous pris trois semaines à l'avance par téléphone, sans confirmation écrite, sans rappel, n'existe pratiquement pas dans la mémoire de travail du patient. Il l'a noté quelque part — dans son téléphone, sur un papier, dans un coin de la tête. Mais entre ce moment et le jour J, il s'est passé vingt et un jours, plusieurs dizaines de réunions, des événements familiaux, des urgences professionnelles.

La mémoire humaine ne fonctionne pas comme un agenda. Elle fonctionne par saillance — ce qui est rappelé, visible, récurrent, est retenu. Ce qui est enregistré une fois et jamais réactivé disparaît. Ce n'est pas une excuse : c'est une réalité physiologique sur laquelle vous pouvez agir.

### L'absence d'engagement à la prise de rendez-vous

Un rendez-vous qui ne coûte rien à annuler — ni financièrement, ni symboliquement — est un rendez-vous fragile. La réservation par téléphone ou par message WhatsApp crée très peu d'engagement formel : pas de clic de validation, pas de trace écrite remise au patient, pas d'acompte, pas de confirmation que le patient doit signer ou accepter.

Comparez cela à l'achat d'un billet de concert ou d'un vol : vous payez à l'avance, vous recevez un billet nominatif avec toutes les informations, vous ajoutez l'événement à votre agenda, et une notification vous rappelle la veille. Le taux d'absence à un concert payé est quasi nul. Pas parce que les gens aiment plus la musique que votre pratique — parce que le processus de réservation a créé des couches d'engagement successives.

Votre système peut reproduire cette logique, sans être aussi rigide ni commercial.

### Les erreurs fréquentes côté praticien

Trois erreurs structurelles alimentent les absences côté praticien, sans que ce soit intentionnel :

**Aucune confirmation écrite envoyée.** Le patient racccroche après avoir pris rendez-vous par téléphone. Il n'a rien en main. Si vous ne lui envoyez pas un email ou un SMS de confirmation dans les minutes qui suivent, la seule trace de ce rendez-vous est dans sa mémoire — et dans la vôtre.

**Un seul rappel, ou pas de rappel du tout.** Un rappel envoyé une semaine avant est trop tôt : le patient le lit, se dit "c'est dans une semaine", et oublie à nouveau. Un rappel envoyé le matin même pour une séance l'après-midi est trop tard pour remplir le créneau si le patient annule. La fenêtre optimale est J-48h + J-24h.

**Aucune politique d'annulation communiquée au moment de la réservation.** Si vous ne précisez jamais ce qui se passe en cas d'annulation tardive, le patient n'a aucune raison de prendre ses précautions. Il annule quand il veut, parce que c'est gratuit de le faire.

Le résultat de ces trois absences cumulées : le système repose entièrement sur la mémoire et la bonne volonté du patient. C'est un pari risqué, et les absences en sont le prix.

---

## Les 5 actions concrètes pour réduire vos absences

Ce qui distingue cet article d'un conseil générique sur les "rappels SMS" : les absences ne se règlent pas par un seul outil. Elles révèlent un déficit de processus complet. Les cinq actions ci-dessous fonctionnent en système — chacune couvre un angle que les autres ne couvrent pas.

### Action 1 — Activer les rappels automatiques multicanaux

C'est le levier le plus simple, le plus immédiat, et celui avec le meilleur rapport effort / résultat. Un rappel réactive la trace mentale du patient, repositionne la séance comme prioritaire dans son agenda mental, et réduit les oublis involontaires — qui représentent une part significative des absences.

**La combinaison optimale : J-48h + J-24h**

Un seul rappel ne suffit pas. Deux rappels valent mieux qu'un pour deux raisons complémentaires. Le premier à 48h laisse le temps au patient de s'organiser, de déplacer un autre engagement si nécessaire, ou d'annuler dans les délais si vraiment il ne peut pas venir — ce qui vous laisse une fenêtre pour remplir le créneau. Le second à 24h ancre la séance dans le lendemain immédiat, là où l'attention du patient est la plus dense.

Certains praticiens ajoutent un troisième rappel le jour même, notamment pour les séances du matin. C'est optionnel et dépend de votre patientèle — pour des séances longues ou des patients très occupés, ça peut valoir la peine.

**Email, SMS ou WhatsApp — que choisir et comment choisir ?**

Les trois canaux ont des caractéristiques différentes, et votre choix doit tenir compte de votre pratique et de votre patientèle.

L'email est le canal le plus formel et le plus traçable. Il convient parfaitement pour la confirmation initiale — structurée, professionnelle, avec tous les détails de la séance. Son taux de lecture immédiate est plus faible que celui du SMS, mais il constitue une référence écrite que le patient peut retrouver.

Le SMS a un taux de lecture qui dépasse 90 % dans les trois minutes suivant la réception. Il est difficile à ignorer et ne demande aucune application. Il est particulièrement efficace pour les rappels de la veille. Son inconvénient : il est court, peu personnalisable, et peut sembler trop familier selon votre positionnement.

WhatsApp offre une flexibilité similaire au SMS avec la possibilité d'enrichir le message (mise en forme, lien cliquable). Mais il introduit un niveau de proximité — le patient vous répond dans la même interface où il parle à ses amis — qui peut ne pas convenir à toutes les pratiques. Psychopraticiens et thérapeutes sont souvent plus prudents avec ce canal.

La recommandation générale : email de confirmation à la prise de RDV + SMS ou WhatsApp à J-48h et J-24h. Ce n'est pas "tout ou rien" — vous pouvez activer ce que vous souhaitez et l'ajuster selon votre expérience.

> Espace Agenda active ces rappels automatiques dès l'offre Essentiel, sans configuration manuelle à répéter. Vous définissez vos préférences de canaux et de délais une seule fois — ils s'envoient ensuite à chaque réservation, indépendamment de vous.

---

### Action 2 — Demander un acompte ou un engagement financier

L'acompte est probablement l'action la plus efficace de cette liste — et la plus sous-utilisée dans les pratiques bien-être. La raison de cette sous-utilisation : la résistance émotionnelle des praticiens eux-mêmes, plus que celle des patients.

**Pourquoi un acompte réduit-il les absences ?**

La psychologie de l'engagement explique ce mécanisme. Quand un patient verse 20 ou 30 € au moment de la réservation, plusieurs choses se produisent simultanément. Il a effectué une action concrète — pas juste une promesse verbale. Il a une trace de cette transaction. Et l'annulation lui coûterait quelque chose de concret, pas juste une vague culpabilité.

Ce coût perçu à l'annulation n'est pas brutal ni commercial. Il est logique : vous avez bloqué un créneau, vous avez organisé votre journée autour de cette séance. L'acompte reconnaît simplement ce fait.

**Comment le mettre en place sans créer de friction**

La clé est la communication préventive : l'acompte doit être mentionné clairement avant que le patient confirme son créneau, pas après. Sur la page de réservation, une ligne simple suffit : *"Un acompte de X€ vous est demandé pour confirmer votre réservation. Il est remboursé en cas d'annulation avant 48h."*

Pour le montant : 10 à 30 % du tarif de la séance selon votre pratique. Une séance à 80 € → acompte de 15 à 25 €. Le montant exact importe moins que son existence. C'est la présence de l'engagement financier, même modeste, qui change le comportement.

La politique d'annulation associée doit être symétrique et juste : annulation à plus de 48h → remboursement intégral. Annulation entre 48h et 24h → acompte partiellement retenu ou remboursé selon votre choix. Annulation le jour même ou absence → acompte dû.

**L'objection fréquente : "mes patients vont refuser"**

Deux observations de terrain : d'abord, la grande majorité des patients accepte sans résistance dès lors que la règle est claire, annoncée à l'avance, et appliquée de façon cohérente. Ce qui crée de la résistance, c'est quand la règle surgit à la dernière minute ou s'applique de façon inégale. Ensuite, les patients qui refusent catégoriquement un acompte — sans raison particulière — sont statistiquement les mêmes qui font des lapins. Filtrer ces profils en amont est une fonctionnalité, pas un bug.

---

### Action 3 — Communiquer une politique d'annulation claire

Sans règle explicite, c'est le patient qui décide. Il annule quand il veut, comme il veut, parce que rien ne l'en empêche et que personne ne lui a jamais dit que ça posait un problème.

**Le bon moment pour poser le cadre : à la réservation, pas après**

Une politique d'annulation découverte après un lapin — "au fait, j'aurais dû vous prévenir que je facture les absences" — est perçue comme une sanction rétroactive. Elle crée de la résistance et abîme la relation. La même politique annoncée clairement avant la confirmation du créneau est perçue comme une règle professionnelle normale.

Texte recommandé, neutre et factuel, à afficher sur votre page de réservation :

> *"Toute annulation doit être effectuée au moins 24 heures avant la séance. Au-delà de ce délai, la séance pourra être facturée à hauteur de X€."*

Vous n'avez pas à justifier cette règle ni à vous en excuser. Les médecins, les coiffeurs, les kinésithérapeutes ont des politiques d'annulation. Vous aussi avez le droit d'en avoir une.

**Quel délai choisir ?**

24 heures convient aux pratiques à séances courtes ou à forte fréquence : ostéopathie, coaching, sophrologie. C'est un délai raisonnable pour le patient et suffisant pour tenter de remplir le créneau.

48 heures est plus adapté aux pratiques à séances longues, rares ou à forte préparation : psychopraticien, psychothérapie, accompagnements intensifs. Plus le créneau est difficile à remplir, plus le délai de préavis doit être long.

**Comment gérer les cas humains**

Une politique d'annulation n'est pas un contrat d'assurance qu'on applique à la lettre dans tous les cas. Si un patient a un empêchement sérieux et vous prévient même tardivement, vous restez libre d'appliquer ou non la facturation. Ce qui change avec la politique : vous avez le choix. Sans politique, vous n'en avez pas.

---

### Action 4 — Sécuriser la réservation avec une confirmation formelle en ligne

Il y a une différence de poids psychologique fondamentale entre un rendez-vous pris par téléphone et un rendez-vous confirmé via un processus en ligne structuré. Cette différence n'est pas anecdotique — elle joue directement sur l'engagement du patient.

**Ce que la confirmation en ligne crée**

Quand un patient réserve en ligne, plusieurs choses se produisent en séquence. Il choisit activement son créneau dans une interface. Il renseigne ses informations. Il valide. Il reçoit immédiatement un email de confirmation structuré avec tous les détails de la séance : date, heure, adresse, type de séance. Cet email contient un bouton "Ajouter à mon agenda Google" ou "Ajouter à Apple Calendar" — le rendez-vous s'intègre directement dans l'agenda numérique du patient, visible à côté de ses réunions professionnelles et de ses engagements personnels.

Ce processus crée trois couches d'engagement successives : l'action consciente de réservation, la trace écrite envoyée par email, et l'intégration dans l'agenda personnel. Chacune de ces couches réduit la probabilité d'oubli.

**Réservation en ligne vs réservation par téléphone : la différence de posture**

Quand vous prenez le rendez-vous par téléphone, c'est vous qui notez dans votre agenda. Le patient n'a rien à faire — il attend que vous lui confirmiez. Cette passivité se prolonge jusqu'au jour de la séance.

Quand le patient réserve lui-même en ligne, il est acteur de sa réservation. Il a choisi son créneau, il a validé, il a reçu confirmation. Ce changement de posture — de passif à acteur — est directement corrélé à un engagement plus fort.

**Une trace écrite protège aussi en cas de litige**

"Je n'avais pas de confirmation écrite, je pensais que le rendez-vous était le lendemain." Cette situation est impossible avec une confirmation en ligne automatique. Vous avez la trace de l'envoi, le patient a la trace de la réception. C'est un avantage pratique qui ne remplace pas la confiance relationnelle, mais qui la complète utilement.

---

### Action 5 — Activer la fonctionnalité "presque complet"

C'est le levier le moins connu des cinq — et l'un des plus efficaces pour structurer la façon dont les patients perçoivent vos disponibilités.

**Le mécanisme : la rareté perçue crée l'engagement**

Un agenda qui affiche dix créneaux disponibles sur les deux prochaines semaines n'incite pas à agir vite. Le patient peut se dire "je verrai demain", reporte, oublie. Un agenda qui affiche "il reste 2 créneaux cette semaine" crée un sentiment d'urgence et d'exclusivité — le patient confirme rapidement plutôt que de risquer de ne plus trouver de disponibilité.

Cette mécanique est bien connue dans le commerce — les "places limitées", les "stocks presque épuisés". Elle fonctionne parce qu'elle est souvent vraie, et parce qu'elle oblige à prendre une décision plutôt que de la reporter.

**Deux problèmes résolus simultanément**

La fonctionnalité "presque complet" agit sur deux types d'absences en même temps. D'un côté, elle réduit les réservations de très dernière minute — celles prises 6h avant la séance et qui sont impossibles à annuler dans les délais si le patient se ravise. En incitant à réserver plus tôt, vous avez plus de préavis sur les annulations. De l'autre, elle réduit les créneaux vides : un patient hésitant qui voit la disponibilité se réduire confirme plutôt que de temporiser.

**Un effet de posture**

Un agenda trop disponible peut paradoxalement affaiblir la valeur perçue de votre pratique. Un praticien dont les créneaux sont rares inspire davantage confiance qu'un praticien qui a toujours des disponibilités immédiates. Ce n'est pas une manipulation — c'est une communication honnête sur votre charge de travail.

> Cette fonctionnalité est disponible nativement dans Espace Agenda, sans paramétrage technique.

---

## Avant / Après : ce que ça change concrètement sur une semaine type

**Sans système structuré**

Lundi : vous recevez un message à 8h du matin — un patient annule sa séance de 10h. Vous n'aviez pas envoyé de rappel. Vous n'avez aucune politique d'annulation en place. Le créneau reste vide. Vous passez 20 minutes à essayer de remplir le créneau en urgence. Vous n'y parvenez pas.

Mercredi : un patient ne se présente pas. Pas d'appel, pas de message. Vous essayez de le joindre. Il répond le lendemain : "j'avais complètement oublié, désolé." Séance perdue.

Vendredi : bilan de la semaine. Deux absences, deux créneaux vides, 120 € non encaissés, une heure et demie passée à gérer ces situations.

**Avec rappels + acompte + confirmation en ligne + politique claire**

Lundi : votre système a envoyé un rappel vendredi à J-48h. Le patient qui ne pouvait pas venir a annulé vendredi matin — à temps pour que vous proposiez le créneau à un autre. L'acompte couvre partiellement la perte.

Mercredi : la séance se déroule normalement. Le patient a reçu un rappel lundi soir à J-24h. Il n'a pas oublié.

Vendredi : zéro absence cette semaine. Une annulation gérée dans les délais. Aucune heure perdue à courir après les patients.

L'objectif n'est pas zéro lapin à vie. C'est un système qui rend les absences exceptionnelles — et qui vous protège financièrement et logistiquement quand elles surviennent quand même.

---

## Témoignage

> *"Gain de temps réel au quotidien. La facturation intégrée et les paiements en ligne à l'avance ont changé ma façon de travailler. La flexibilité pour créer mes types de séances et gérer mon planning est exactement ce dont j'avais besoin."*
>
> **Guillaume · Psychopraticien · Gironde**

---

## Quelle solution pour automatiser ces 5 actions ?

Appliquer ces cinq actions manuellement est possible. Mais "manuellement" signifie : envoyer vous-même les rappels, intégrer un système de paiement par acompte, rédiger vos confirmations, suivre les annulations. C'est faisable au démarrage — ça devient vite chronophage à mesure que votre activité se remplit.

Un outil prend le relais sur l'ensemble de ces tâches, et le système tourne sans intervention de votre part à chaque réservation.

**Les critères d'un bon outil pour les praticiens bien-être**

- Rappels multicanaux inclus dès le départ, pas en option payante
- Paiement d'acompte en ligne intégré nativement
- Page de réservation à votre nom (marque blanche) — pas "réservez sur MonLogiciel"
- Confirmation automatique avec intégration calendrier (Google, Apple, Outlook)
- Installation et configuration faites pour vous — pas de paramétrage technique à gérer seul
- Support humain réel : quelqu'un à contacter si quelque chose ne fonctionne pas

**Comment Espace Agenda répond à ces critères**

Espace Agenda a été conçu spécifiquement pour les praticiens bien-être indépendants — psychopraticiens, ostéopathes, coachs, thérapeutes, sophrologues — qui veulent un agenda professionnel à leur nom, opérationnel rapidement, sans avoir à devenir techniciens. Rappels automatiques activés dès l'offre Essentiel à 29€/mois, acomptes disponibles dès l'offre Pro, page à votre nom opérationnelle en 7 jours.

[**Découvrir les rappels automatiques d'Espace Agenda →**](/solution)

[**Voir un exemple de page de réservation →**](/exemples)

---

## FAQ — Vos questions sur les absences en cabinet

### Peut-on facturer un rendez-vous manqué ?

Oui, à condition que la règle ait été clairement annoncée avant la réservation. Elle doit être visible et acceptée par le patient au moment de confirmer son créneau — pas découverte après coup. En pratique, un acompte est plus simple et moins conflictuel qu'une facturation rétroactive : le patient a déjà payé une partie, et la règle était connue dès le départ.

### Quelle est la meilleure heure pour envoyer un rappel ?

Entre 9h et 11h le matin, ou entre 17h et 19h en fin de journée — des créneaux où le patient est disponible mentalement et peut prendre une décision si nécessaire. Évitez les rappels après 20h ou le week-end si votre patientèle est sensible à la frontière privé/professionnel. La combinaison J-48h (matin) + J-24h (fin d'après-midi) couvre les deux fenêtres d'attention les plus efficaces.

### Faut-il demander un acompte pour toutes les séances ?

Pas nécessairement. L'acompte est particulièrement pertinent pour les nouveaux patients — qui n'ont pas encore d'historique avec vous — et pour les réservations prises longtemps à l'avance, où le risque d'oubli est plus élevé. Pour vos patients réguliers et fiables, vous pouvez choisir de ne pas l'appliquer systématiquement, ou de l'appliquer uniquement après une absence.

### Les rappels WhatsApp sont-ils plus efficaces que les SMS ?

Le taux de lecture est comparable pour les deux. La différence est de posture : WhatsApp crée une proximité — votre message arrive dans la même interface que les messages des amis et de la famille. C'est un avantage en termes d'attention, et une question de cohérence avec le positionnement de votre pratique. Les coachs et accompagnateurs utilisent souvent WhatsApp sans problème. Les psychopraticiens et thérapeutes privilégient parfois le SMS pour maintenir une distance professionnelle plus nette.

### Que faire si un patient annule en dehors des délais prévus ?

Si votre politique d'annulation a été clairement communiquée, vous pouvez facturer la séance ou retenir l'acompte. Si vous choisissez de ne pas facturer — parce que la raison est sérieuse, parce que c'est un patient régulier, parce que vous préférez préserver la relation — c'est votre droit. Ce qui change avec une politique en place : vous avez le choix. Sans politique, vous n'en avez pas. Et utilisez l'événement pour rappeler simplement la règle : "Je comprends, pas de problème cette fois. Pour l'avenir, pensez à me prévenir 24h à l'avance si vous ne pouvez pas venir."

### Est-ce que la réservation en ligne est adaptée aux consultations sensibles — psy, thérapeute ?

Oui, à condition que la page soit bien conçue. La réservation en ligne automatise uniquement la logistique de prise de rendez-vous — elle ne change rien à la nature de la relation thérapeutique ni au contenu des séances. Une page à votre nom, avec vos textes, votre photo et votre univers visuel renforce la confiance avant même le premier contact. De nombreux psychopraticiens et thérapeutes l'utilisent — y compris pour des pratiques où le lien de confiance est au cœur du travail.

### Est-il légal de facturer une absence ?

Oui. En France, un praticien libéral a le droit de facturer un rendez-vous non honoré à condition que cela ait été stipulé clairement dans les conditions d'accès à la consultation (affichage en cabinet, mention sur le site, conditions générales acceptées à la réservation). Ce n'est pas remboursable par la Sécurité sociale ni par les mutuelles, mais c'est légal et légitime.

---

## Conclusion

Les absences ne sont pas une fatalité. Elles sont le symptôme prévisible d'un système incomplet — un système qui repose entièrement sur la mémoire et la bonne volonté du patient, sans couches d'engagement, sans rappels, sans règles claires.

Les cinq actions de cet article forment un processus cohérent. Rappels automatiques pour réactiver la trace mentale. Acompte pour créer un engagement financier réel. Politique d'annulation pour poser un cadre avant que le problème arrive. Confirmation en ligne pour formaliser l'engagement. Fonctionnalité "presque complet" pour réduire les réservations tardives et les créneaux vides.

Individuellement, chaque action a un impact limité. Ensemble, elles transforment structurellement votre agenda — en réduisant les absences à ce qu'elles devraient être : des exceptions gérées, pas une charge hebdomadaire.

Et bonne nouvelle : aucune d'entre elles ne demande de changer votre façon de pratiquer. Elles demandent de mieux encadrer la logistique autour.

---

**Pour aller plus loin**

→ [Combien de temps passez-vous vraiment sur l'administratif ?](/blog) *(Pilier 2)*

→ [Quel logiciel de prise de rendez-vous choisir en 2026 ?](/blog) *(Pilier 3)*

→ [Voir les fonctionnalités de rappel d'Espace Agenda](/solution)

→ [Découvrir les offres à partir de 29€/mois](/offres)"""
},

# ============================================================
# ARTICLE 2 — PILIER 2 : Gagner du temps (MOFU)
# ============================================================
{
    "title": "Gagner du temps en cabinet : ce que la gestion de vos rendez-vous vous coûte vraiment",
    "excerpt": "Combien d'heures par mois consacrez-vous à l'administratif autour de vos rendez-vous ? Découvrez le coût réel — en temps, en séances perdues, en charge mentale — et comment l'automatisation change concrètement le quotidien.",
    "category": "Organisation",
    "image": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop",
    "author": "Équipe Espace Agenda",
    "published": True,
    "content": """**Balise title :** Gestion des rendez-vous en cabinet : ce que ça vous coûte vraiment (et comment le réduire)

**Meta description :** Combien d'heures par mois consacrez-vous à l'administratif autour de vos rendez-vous ? Découvrez le coût réel — en temps, en séances perdues, en charge mentale — et comment l'automatisation change concrètement le quotidien.

**Slug URL :** gagner-temps-cabinet-praticien

**Maillage interne :** → /solution · → /offres · → /contact · → Pilier 1 (absences) · → Pilier 3 (logiciel de RDV)

---

# Gagner du temps en cabinet : ce que la gestion de vos rendez-vous vous coûte vraiment

## Introduction — Combien d'heures par mois passez-vous sur l'administratif ?

Posez-vous la question sincèrement.

Pas "à peu près". Pas "quelques minutes par jour". Prenez le temps de lister, une par une, toutes les actions que vous effectuez chaque semaine autour de vos rendez-vous — et pas seulement pendant les séances.

Les appels manqués pendant une consultation, rappelés le soir entre 18h et 19h. Les SMS de confirmation envoyés à la main avant chaque séance. Les annulations reçues sur WhatsApp à 7h du matin, qu'il faut gérer, répondre, puis tenter de combler. Les factures créées après la dernière séance de la journée, quand vous commencez à être fatigué. L'historique patient que vous cherchez dans trois supports différents parce que vous n'avez pas trouvé le temps de tout centraliser.

Chacune de ces actions, prise isolément, semble anodine. "Ça prend 5 minutes." Mais c'est exactement ce piège que cet article va démontrer.

La plupart des praticiens sous-estiment massivement le temps qu'ils consacrent à l'administratif autour de leurs rendez-vous. Pas par manque de lucidité — parce que ce temps est fragmenté, dilué dans les interstices de la journée, et que personne ne fait le calcul.

Cet article est conçu comme un miroir : vous allez y reconnaître votre semaine. La progression est simple — prise de conscience, calcul personnel, solutions concrètes, projection. Pas une théorie de la productivité généraliste. Une analyse du quotidien d'un praticien indépendant, avec les chiffres et les outils pour décider si quelque chose doit changer.

---

## Le piège du "ça prend 5 minutes"

### La somme des micro-tâches : faites votre propre calcul

L'erreur classique est d'évaluer chaque tâche séparément. "Répondre à un SMS, ça prend 2 minutes." C'est vrai. Mais il y a dix SMS par jour. Et il y a les appels. Et les confirmations. Et les relances.

Voici une estimation réaliste sur une semaine de 20 séances :

**Appels et messages pour la prise de RDV :** Un patient envoie un message, vous répondez, il propose trois options, vous en acceptez une, vous le notez dans votre agenda. Si tout se passe bien : 5 à 8 minutes par nouveau patient. Si le créneau n'est plus disponible, si le patient ne répond pas dans les 48h, si la séquence dure trois jours : facilement 15 à 20 minutes. Sur 5 nouvelles prises de RDV par semaine : 25 à 100 minutes.

**Confirmations manuelles et rappels :** Un message de confirmation envoyé après chaque prise de RDV, un rappel la veille. 2 à 3 minutes par patient. Sur 20 séances : 40 à 60 minutes.

**Gestion des annulations et déplacements :** Une annulation reçue, une réponse à envoyer, le créneau à libérer dans l'agenda, une tentative de remplissage. 10 à 20 minutes par annulation. Sur 2 annulations par semaine : 20 à 40 minutes.

**Facturation :** Créer une facture propre avec les bonnes mentions légales, le bon numéro, le bon tarif, l'envoyer par email et la classer. Entre 5 et 15 minutes par patient. Sur 20 séances : 1h40 à 5h.

**Historique et notes patients :** Retrouver les informations d'un patient avant la séance, mettre à jour après. 5 à 10 minutes par patient. Sur 20 séances : 1h40 à 3h20.

**Total estimé : 4h30 à 10h par semaine.** Uniquement sur la logistique autour des séances, sans valeur clinique aucune.

Sur 45 semaines travaillées, c'est entre 200 et 450 heures par an. Si votre séance est à 60€, c'est l'équivalent de 33 à 75 séances non réalisées — chaque année, uniquement à cause de la gestion manuelle.

### Ce que ce temps représente réellement

Ces heures ne sont pas neutres. Elles ne disparaissent pas dans le vide — elles remplacent quelque chose. Du temps de consultation disponible. Du temps de repos entre deux séances. Du temps pour développer votre pratique, vous former, prospecter.

Mais leur coût le plus insidieux n'est pas le temps qu'elles consomment. C'est la charge mentale qu'elles génèrent.

Gérer son agenda à la main, c'est avoir en permanence une liste ouverte dans un coin de la tête. Un appel à rappeler. Une facture à ne pas oublier. Un patient qui n'a pas confirmé. Ce fond sonore permanent détériore la qualité de présence — pendant les séances, chez vous le soir, le week-end. Ce n'est pas exceptionnel. C'est structurel.

---

## Les 4 tâches qui monopolisent votre temps sans valeur ajoutée

### 1. Gérer les appels et messages pour la prise de rendez-vous

Imaginez la scène : vous êtes en séance, votre téléphone vibre. Un patient cherche un créneau. Vous ne pouvez pas répondre. Vous y pensez entre deux séances. Vous rappellez en fin de journée, il ne répond pas. Il vous écrit le lendemain matin. Vous êtes chez vous. Vous répondez quand même parce que vous ne voulez pas perdre le patient.

Cette scène se répète plusieurs fois par semaine dans la plupart des cabinets indépendants. Elle a deux effets immédiats : elle interrompt votre concentration dans les moments où vous en avez le plus besoin, et elle empiète régulièrement sur votre vie personnelle, non pas parce que vous le souhaitez, mais parce que le patient réserve quand il peut — pas quand ça vous arrange.

L'autre dimension souvent ignorée : le coût des appels manqués. Un patient qui ne tombe pas sur vous rappelle rarement trois fois. Il passe à quelqu'un d'autre, ou il reporte indéfiniment. Vous ne saurez jamais combien de prises en charge potentielles n'ont pas abouti simplement parce que vous étiez en séance quand il a appelé.

> Avec un système de réservation en ligne, vos patients trouvent un créneau et le confirment seuls — à 23h si nécessaire, sans vous solliciter.

### 2. Confirmer et rappeler les rendez-vous manuellement

Le SMS de confirmation tapé à la main après chaque prise de RDV. "Bonjour, je confirme notre rendez-vous le jeudi 15 à 10h." Deux minutes. Vingt fois par semaine. Quarante minutes par semaine consacrées à un texte identique, répété indéfiniment.

Et les rappels : vous vous en souvenez parfois, pas toujours. Vous envoyez un message la veille quand vous y pensez. Quand vous l'oubliez, le patient oublie aussi — et ne vient pas. Ce n'est pas de la mauvaise volonté de sa part. C'est la mécanique de la mémoire à court terme dans un quotidien chargé. Le rappel est le signal qui repositionne la séance comme prioritaire dans l'agenda mental du patient.

Sans rappel automatique, le taux d'absences augmente mécaniquement. Ce que vous perdez en temps à envoyer des rappels manuels, vous le perdez deux fois : en temps de frappe, et en séances manquées quand vous oubliez de les envoyer.

Pour aller plus loin sur ce sujet : [Comment réduire les absences et les lapins dans votre cabinet →](/blog)

### 3. Créer et envoyer les factures

La facturation est probablement la tâche la plus sous-estimée en temps réel — et la plus silencieusement problématique.

Créer une facture conforme demande : le bon en-tête avec vos coordonnées complètes, un numéro séquentiel (obligatoire), la date de la séance, la description précise de la prestation, le montant, les mentions légales. Si vous êtes en auto-entrepreneur, des mentions supplémentaires s'ajoutent. Si vous utilisez un modèle Word ou un fichier Excel, vous modifiez à la main à chaque fois. Entre 5 et 15 minutes par facture, selon votre organisation.

Sur 20 séances par semaine, c'est entre 1h40 et 5h de facturation hebdomadaire. Et dans la pratique, beaucoup de praticiens ne facturent pas systématiquement. L'oubli s'installe. "Je ferai un lot en fin de mois." Puis la fin du mois arrive chargée. Le lot est reporté. Certaines séances ne sont jamais facturées.

Ce n'est pas de la mauvaise gestion — c'est la conséquence prévisible d'un processus trop manuel sur un volume de séances qui s'accumule.

> Espace Agenda intègre la facturation dès l'offre Essentiel à 29€/mois. La facture est générée automatiquement après chaque séance confirmée, numérotée, et envoyée au patient sans action de votre part.

### 4. Gérer les informations patients et l'historique

Le carnet de notes papier, le fichier Excel sur l'ordinateur du cabinet, les anciens SMS retrouvés six mois plus tard dans une conversation WhatsApp. L'historique patient reconstitué de mémoire avant la séance parce que vous n'avez pas trouvé le temps de centraliser.

Ce mode de fonctionnement a trois conséquences concrètes.

La première est une perte de temps systématique : retrouver une information, naviguer entre plusieurs supports, reconstituer un contexte que vous auriez dû avoir en un clic.

La deuxième est un risque d'erreur : un tarif mal retenu, une information sur un patient confondue avec une autre, une séance dont la trace a disparu. Ces erreurs sont rares — mais leur coût relationnel, quand elles surviennent, est élevé.

La troisième est un problème réglementaire souvent ignoré. **Stocker des données de santé de vos patients sur WhatsApp, dans un fichier Excel non chiffré ou un carnet papier non sécurisé est non conforme au RGPD.** Les données relatives à la santé sont des données dites "sensibles" au sens de l'article 9 du règlement européen. Leur traitement est strictement encadré : obligation de sécurisation, de consentement explicite, de droit d'accès et d'effacement pour le patient. Un praticien bien-être qui collecte et conserve des informations sur la santé ou le bien-être de ses patients est concerné — même s'il exerce seul, même s'il n'a pas de statut médical réglementé.

Un outil dédié avec hébergement européen et gestion des consentements intégrée vous protège, et protège vos patients.

---

## Ce que gagnent concrètement les praticiens qui automatisent leur agenda

### Récupérer du temps pour la pratique clinique

La première chose que récupèrent les praticiens qui automatisent leur gestion : de la disponibilité mentale. Pas d'appels à traiter entre deux séances. Pas de confirmations à écrire. Pas de factures à créer en fin de soirée. L'agenda se remplit, les rappels partent, les factures sont générées — sans intervention.

Ce que ça change en pratique : vous êtes entièrement présent dans vos séances, parce que vous n'avez plus de liste ouverte en arrière-plan. Vos transitions entre deux consultations sont courtes et tranquilles. Votre fin de journée ne commence plus par un lot de tâches administratives.

Ce n'est pas un gain marginal. C'est une transformation de la qualité de votre exercice au quotidien.

### Professionnaliser l'image perçue par les patients

Mettons en parallèle deux expériences patient.

Première expérience : le patient cherche un créneau, il appelle, tombe sur la messagerie, rappelle deux jours plus tard, confirme par SMS informel. Il reçoit un rappel — ou pas. Il vient, paie en espèces, repart sans facture formelle.

Deuxième expérience : le patient visite une page de réservation claire, à votre nom, avec votre photo et vos types de séances. Il choisit son créneau, reçoit instantanément une confirmation par email avec tous les détails, ajoute l'événement à son Google Agenda en un clic. Il reçoit un rappel à J-48h et J-24h. Après la séance, il reçoit sa facture par email.

La qualité clinique de votre travail n'a pas changé. Mais la perception de votre professionnalisme, elle, est radicalement différente. Un praticien organisé inspire confiance avant même la première séance. Cette confiance, elle joue sur la fidélisation, sur les recommandations, sur la valeur perçue de vos séances.

### Avant / Après : une semaine type

**Sans système automatisé**

Lundi matin : 3 messages WhatsApp à traiter pour des demandes de RDV. Un appel manqué à rappeler. Vous répondez entre la 2e et la 3e séance. Un patient ne répond pas — vous relancez le soir. Fin de journée : 4 factures à créer pour les séances de la semaine dernière que vous aviez repoussées.

Mardi : annulation reçue à 8h pour une séance à 9h. Créneau vide impossible à remplir. Vous n'aviez pas envoyé de rappel hier — vous n'aviez pas eu le temps.

Vendredi : vous clôturez la semaine avec 12 factures en retard, 2 séances dont les paiements ne sont pas clairement tracés, et le sentiment diffus d'avoir passé du temps à courir après l'organisation.

**Avec un système automatisé**

Les prises de RDV arrivent directement dans votre agenda, avec confirmation automatique. Vous n'intervenez pas. Les rappels partent à J-48h et J-24h — vous ne les rédigez pas. Les factures sont générées et envoyées après chaque séance. Votre vendredi se termine comme votre lundi a commencé : vous faites de la pratique clinique. Pas de la gestion.

### Témoignage

> *"Gain de temps réel au quotidien. La facturation intégrée et les paiements en ligne à l'avance ont changé ma façon de travailler. La flexibilité pour créer mes types de séances et gérer mon planning est exactement ce dont j'avais besoin."*
>
> **Guillaume · Psychopraticien · Gironde**

---

## Pourquoi ce changement est souvent repoussé — et comment le faire quand même

### L'objection principale : "Je ne suis pas à l'aise avec la technique"

C'est l'objection la plus fréquente, et la plus compréhensible. Beaucoup de praticiens ont déjà essayé un outil, se sont retrouvés devant une interface complexe, ont passé plus de temps à le configurer qu'à l'utiliser, et ont abandonné. L'expérience a laissé une méfiance légitime.

La distinction importante : il existe des outils conçus pour des équipes techniques ou commerciales (Calendly, Setmore), et des outils conçus pour des praticiens indépendants qui n'ont pas — et n't ont pas à avoir — de compétences techniques. Ce sont deux produits fondamentalement différents, même s'ils font la même chose en apparence.

Avec Espace Agenda, l'installation et la configuration sont faites pour vous. Vous fournissez vos informations (types de séances, tarifs, disponibilités, photo, textes), nous paramétrons. Une formation de 30 minutes suffit pour être pleinement autonome. Votre agenda est opérationnel en 7 jours.

### L'objection secondaire : "Même si ce n'est pas optimal, ça marche"

C'est vrai — en apparence. Un fonctionnement manuel marche. Jusqu'au jour où l'activité monte en charge, où les patients se multiplient, où une période de suractivité révèle les limites du système. Les praticiens qui ont automatisé décrivent rarement une transformation spectaculaire immédiate : c'est une amélioration progressive, mais solide, qui change le quotidien sur la durée.

### Le paradoxe du "pas le temps de gagner du temps"

Il y a une ironie réelle dans cette situation : les praticiens qui auraient le plus à gagner d'une automatisation sont précisément ceux qui sont trop occupés pour la mettre en place. Ce paradoxe se résout d'une seule façon : en délégant la mise en place elle-même. C'est exactement le modèle d'Espace Agenda — vous n'avez pas à installer, configurer, ni apprendre seul. Quelqu'un le fait pour vous, avec vous.

---

## Automatiser sa gestion de RDV : par où commencer ?

### Les 5 fonctionnalités indispensables

Quand vous évaluez un outil de gestion de rendez-vous en tant que praticien indépendant, cinq critères sont non négociables.

**1. Réservation en ligne 24/7 à votre nom (marque blanche).** La page doit afficher votre nom, votre univers, votre identité — pas celle de l'outil. Un patient qui réserve sur "monpraticien.monlogiciel.com" ne vit pas la même expérience que sur "harmonietherapeute.wlbookings.com". La marque blanche n'est pas une option cosmétique : elle détermine la crédibilité perçue de votre pratique.

**2. Rappels automatiques multicanaux.** Email, WhatsApp, SMS — avec la possibilité de choisir les canaux et les délais. Le minimum viable : email de confirmation + rappel J-24h. L'idéal : combinaison email + SMS ou WhatsApp à J-48h et J-24h. Ces rappels doivent partir sans que vous interveniez.

**3. Facturation intégrée nativement.** Pas un module séparé, pas une intégration tierce à configurer. La facturation doit être dans le même outil que la réservation, pour que le processus soit fluide de bout en bout. Objectif : zéro double saisie, zéro facture oubliée.

**4. Synchronisation avec votre agenda existant.** Google Agenda, Outlook, Apple Calendar — votre emploi du temps doit rester centralisé. Pas deux agendas à maintenir en parallèle. Le logiciel se synchronise avec ce que vous utilisez déjà.

**5. Support humain.** Pas uniquement une FAQ. Quelqu'un à qui envoyer un message quand quelque chose ne fonctionne pas, avec un délai de réponse clair et un interlocuteur qui connaît votre situation. Pour un praticien indépendant, un problème technique sur son agenda en ligne n'est pas un désagrément — c'est une urgence opérationnelle.

### La question concrète à poser avant de signer

Avant de choisir un outil, posez cette question à l'éditeur : "À qui est-ce que j'envoie un message si ça ne marche plus demain matin ?" Si la réponse est "notre support ticket en ligne", évaluez si c'est suffisant pour vous. Si la réponse est "à moi, directement, sur mon téléphone" — c'est un indicateur de confiance.

[**Voir comment Espace Agenda automatise votre agenda →**](/solution)

[**Découvrir les offres à partir de 29€/mois →**](/offres)

---

## FAQ — Organisation de l'agenda en cabinet

### Comment organiser son agenda quand on est praticien indépendant ?

L'organisation commence par un principe simple : centraliser. Tant que les prises de RDV arrivent par téléphone, les confirmations partent par SMS, les factures sont dans un fichier à part et les notes patients dans un carnet, le temps de gestion restera élevé — indépendamment de votre bonne volonté ou de votre méthode.

La centralisation signifie : un seul outil pour les réservations, les rappels, la facturation et les informations patients. Une fois que tout est au même endroit, les tâches répétitives s'automatisent et le temps récupéré devient structurel, pas ponctuel.

### Faut-il un logiciel pour gérer ses rendez-vous en cabinet ?

Pas nécessairement dès les premiers patients. Avec 3 ou 4 séances par semaine, le volume ne justifie pas encore l'investissement. Mais dès que vous dépassez 8 à 10 séances hebdomadaires, l'absence d'outil commence à coûter plus en temps — et en absences — qu'un abonnement mensuel. À 29€/mois, le seuil de rentabilité d'un agenda automatisé est très bas : une seule séance évitée par mois suffit à le couvrir.

### La réservation en ligne est-elle adaptée aux consultations sensibles (psychologie, thérapie) ?

Oui. La réservation en ligne automatise uniquement la logistique — pas la relation. Une page bien construite, à votre image, avec vos propres textes et votre univers visuel, renforce la confiance avant même le premier contact. Elle ne réduit pas la dimension humaine ou clinique de votre pratique. De nombreux psychopraticiens, thérapeutes et coachs l'utilisent — y compris pour des pratiques où le lien de confiance est au cœur du travail.

### Comment facturer automatiquement ses séances ?

Avec un outil qui intègre la facturation nativement, pas via un module séparé. Le processus idéal : la séance est confirmée → la facture est générée avec les bonnes informations → elle est envoyée automatiquement au patient par email → elle est classée dans votre historique. Zéro saisie manuelle de votre part. Pour que cela fonctionne, l'outil doit connaître votre statut juridique, vos tarifs et vos mentions obligatoires dès la configuration initiale.

### Combien de temps faut-il pour mettre en place un agenda en ligne ?

Avec Espace Agenda : 7 jours pour une installation standard. Vous fournissez vos informations lors d'un appel de cadrage, nous configurons l'ensemble — types de séances, tarifs, design de la page, paramètres de rappel. Une formation de 30 minutes et vous êtes totalement autonome. Aucune compétence technique n'est requise.

### Dois-je prévenir mes patients que je change de système ?

Oui, et c'est une opportunité. Envoyer un message à vos patients réguliers pour leur annoncer que vous lancez votre page de réservation en ligne est perçu positivement : vous leur simplifiez la vie. Un message court, par email ou SMS, avec le lien vers votre page suffit. Certains praticiens en profitent pour relancer des patients perdus de vue.

---

## Conclusion

Le temps administratif est souvent invisible parce qu'il se dilue dans les interstices de la journée. Ce n'est jamais "une heure de gestion" déclarée comme telle — c'est 5 minutes ici, 10 minutes là, un appel entre deux séances, une facture en fin de soirée, un message le week-end.

Mais cumulé, il représente plusieurs dizaines d'heures par mois, l'équivalent de séances non réalisées, d'une charge mentale constante et d'une énergie consacrée à des tâches sans valeur clinique.

Gagner du temps en cabinet ne passe pas par travailler plus vite, ni par "mieux s'organiser" avec les mêmes outils. Ça passe par structurer ce qui peut être automatisé — pour que votre attention reste entière là où elle a de la valeur : dans votre pratique et dans la relation avec vos patients.

La bonne nouvelle : cette transformation ne demande pas de compétences techniques ni plusieurs semaines de mise en place. Elle demande une décision.

---

**Pour aller plus loin**

→ [Comment réduire les absences et les lapins dans votre cabinet ?](/blog) *(Pilier 1)*

→ [Quel logiciel de prise de rendez-vous choisir en 2026 ?](/blog) *(Pilier 3)*

→ [Voir les fonctionnalités d'Espace Agenda](/solution)

→ [Découvrir les offres](/offres)

→ [Planifier un échange de 20 minutes](/contact)"""
},

# ============================================================
# ARTICLE 3 — PILIER 3 : Comparatif logiciels (BOFU)
# ============================================================
{
    "title": "Quel logiciel de prise de rendez-vous choisir quand on est praticien indépendant ? Guide 2026",
    "excerpt": "Doctolib, Calendly, Espace Agenda... Quel logiciel de prise de rendez-vous choisir quand on est praticien indépendant ? Les 6 critères qui comptent vraiment, le comparatif honnête et une recommandation claire selon votre profil.",
    "category": "Comparatif",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    "author": "Équipe Espace Agenda",
    "published": True,
    "content": """**Balise title :** Logiciel de prise de rendez-vous pour praticiens bien-être : guide complet 2026

**Meta description :** Doctolib, Calendly, Espace Agenda… Quel logiciel de prise de rendez-vous choisir quand on est praticien indépendant ? Les 6 critères qui comptent vraiment, le comparatif honnête et une recommandation claire selon votre profil.

**Slug URL :** logiciel-prise-de-rendez-vous-praticien

**Maillage interne :** → /offres · → /exemples · → /contact · → Pilier 1 (absences) · → Pilier 2 (gagner du temps)

---

# Quel logiciel de prise de rendez-vous choisir quand on est praticien indépendant ? Guide 2026

## Introduction — Un marché encombré, une niche presque vide

Il existe aujourd'hui une dizaine de logiciels de prise de rendez-vous sur le marché français. Doctolib, Calendly, Setmore, Simplybook.me, Acuity Scheduling — sans compter les dizaines de solutions moins connues qui se positionnent sur le même segment. Si vous tapez "logiciel prise de rendez-vous" dans Google, vous trouvez des dizaines de comparatifs, des tableaux à vingt colonnes, et des listes de fonctionnalités qui finissent par se ressembler toutes.

Alors pourquoi cet article ?

Parce que 99 % de ces comparatifs ciblent soit le grand public (Calendly, Acuity), soit les professionnels de santé réglementés (Doctolib, Maiia). Aucun ne traite sérieusement la situation du praticien bien-être indépendant — psychopraticien, ostéopathe, sophrologue, coach, thérapeute — qui veut une page de réservation à son nom, qui n'a pas de compétences techniques, et qui cherche quelqu'un à appeler si quelque chose ne fonctionne pas.

C'est cet angle précis que nous allons traiter ici.

Une précision d'emblée : cet article est publié sur le blog d'Espace Agenda. Nous ne prétentons pas à la neutralité. Mais nous visons l'honnêteté : nous allons vous donner les vrais critères de choix, mentionner les alternatives légitimes pour certains profils, et expliquer pourquoi Espace Agenda convient — ou pas — selon votre situation. Si vous êtes très à l'aise techniquement et souhaitez tout configurer vous-même, certaines solutions du marché peuvent tout à fait vous convenir. Nous le dirons.

---

## Pourquoi ce choix est plus structurant qu'il n'y paraît

### Ce qu'un bon logiciel change concrètement

Un logiciel de prise de rendez-vous bien choisi fait plusieurs choses simultanément. Il libère votre temps en automatisant les confirmations et les rappels. Il réduit vos absences en créant des couches d'engagement successives autour de chaque réservation. Il professionnalise votre image en offrant à vos patients une expérience de réservation structurée, à votre nom. Et il centralise vos informations patients, votre facturation et votre agenda dans un seul outil.

Un logiciel mal choisi — ou bien choisi mais mal configuré — fait l'inverse. Il génère des frictions pour vos patients, reste partiellement utilisé, vous oblige à compenser manuellement les fonctionnalités manquantes, et finit par coûter plus de temps qu'il n'en fait gagner.

La différence entre ces deux scénarios ne tient presque jamais aux fonctionnalités listées dans un tableau comparatif. Elle tient à l'adéquation entre la solution et votre réalité de praticien indépendant.

### La question centrale : marque partagée ou marque blanche ?

Avant même de comparer les fonctionnalités, une question structurante mérite une réponse claire : voulez-vous que vos patients réservent "chez Doctolib" ou "chez vous" ?

Sur Doctolib, vos patients voient votre profil sur une plateforme qui porte le nom de Doctolib. Votre URL commence par doctolib.fr. Si demain vous quittez Doctolib, vous perdez votre présence en ligne et vos avis. Vous dépendez de leur algorithme pour votre visibilité.

Avec une solution en marque blanche, vos patients réservent sur une page à votre nom et à votre image — harmonietherapeute.wlbookings.com, par exemple. L'URL vous appartient en termes de positionnement. L'expérience est celle de votre cabinet, pas celle d'une plateforme tierce.

Ce n'est pas un choix cosmétique. C'est un choix stratégique sur votre indépendance et votre image professionnelle à long terme.

### Les 5 questions à se poser avant de comparer les outils

Avant de regarder les fonctionnalités, clarifiez vos besoins réels avec ces cinq questions :

**1. Ai-je besoin que la page de réservation soit à mon nom ?** Si oui, les plateformes à marque partagée (Doctolib, certains modes de Calendly) ne conviennent pas.

**2. Vais-je configurer l'outil moi-même ou déléguer ?** Si la réponse est "déléguer", les solutions self-service ne sont pas adaptées, quelle que soit leur qualité.

**3. Ai-je besoin de paiements en ligne dès le départ ?** L'acompte à la réservation est l'un des leviers les plus efficaces contre les absences. Si vous voulez l'activer, vérifiez que l'outil le propose nativement.

**4. Quel est mon volume mensuel de rendez-vous ?** Un praticien qui fait 10 séances par semaine n'a pas les mêmes besoins qu'un cabinet de 3 praticiens à 80 rendez-vous par semaine.

**5. Ai-je un site web existant ou ai-je besoin d'une présence en ligne complète ?** Certains outils sont conçus pour s'intégrer à un site existant. D'autres fournissent une page autonome. Selon votre situation, l'un ou l'autre sera plus pertinent.

---

## Les 6 critères essentiels pour faire le bon choix

### Critère 1 — La page de réservation est-elle à votre nom ?

Nous l'avons mentionné plus haut, mais ce critère mérite d'être détaillé. La marque blanche ne signifie pas simplement "votre nom apparaît sur la page". Elle signifie que l'expérience complète — URL, design, contenu, ton — est celle de votre cabinet.

Un exemple concret : Harmonie Thérapie, praticienne bien-être utilisant Espace Agenda, a sa page sur harmonietherapeute.wlbookings.com. Un patient qui arrive sur cette page voit sa photo, ses textes, ses types de séances, ses tarifs — dans les couleurs qu'elle a choisies. Il n'y a aucun logo tiers visible. L'expérience est celle d'un cabinet professionnel, pas d'une plateforme de réservation généraliste.

Cette cohérence a un impact direct sur la conversion (le taux de patients qui finalisent une réservation) et sur la fidélisation (le sentiment d'appartenir à un cabinet précis, pas à une base de données partagée).

### Critère 2 — Les rappels multicanaux sont-ils inclus dès le départ ?

Les rappels automatiques sont le levier numéro un contre les absences. Pas une option facultative — une fonctionnalité de base. Vérifiez systématiquement deux points : les canaux disponibles (email seul, ou email + SMS + WhatsApp) et le fait que cette fonctionnalité soit incluse dans l'offre de base, pas réservée à un abonnement supérieur.

Un outil qui inclut les rappels email gratuitement mais facture les SMS en supplément peut vous amener à activer uniquement le canal email — moins efficace que la combinaison email + SMS. Le coût apparent de l'abonnement masque alors un coût réel supérieur ou une fonctionnalité partiellement utilisée.

### Critère 3 — La facturation est-elle intégrée nativement ?

La facturation est le point le plus souvent négligé dans les comparatifs — et l'un des plus importants dans le quotidien d'un praticien indépendant. Gérer la réservation dans un outil et la facturation dans un autre signifie : double saisie des informations patient, risque d'erreur sur les numéros de facture, oublis fréquents, et temps consacré à la synchronisation entre deux systèmes.

Une solution qui intègre la facturation nativement — c'est-à-dire où la facture est générée automatiquement à partir des informations de réservation — élimine toutes ces frictions. C'est une fonctionnalité qui semble secondaire au moment du choix et qui devient centrale dans l'usage quotidien.

### Critère 4 — Qui installe et configure le système ?

C'est le critère le plus discriminant pour les praticiens bien-être indépendants, et le moins souvent mentionné dans les comparatifs. La distinction est simple : self-service ou installation accompagnée.

Les outils self-service (Calendly, Setmore, Simplybook.me) vous donnent accès à une interface que vous configurez vous-même — types de séances, durées, tarifs, couleurs, messages de confirmation, règles de rappel. Pour un utilisateur à l'aise avec la technologie, c'est une flexibilité bienvenue. Pour un praticien qui n'a pas envie de passer trois soirées à paramétrer un outil et dont le logiciel n'est toujours pas opérationnel deux semaines après la souscription, c'est un blocage réel.

Une installation accompagnée signifie que quelqu'un — une vraie personne — configure le système pour vous, à partir de vos informations. Vous vérifiez, vous validez, vous êtes formé en 30 minutes, et l'agenda est opérationnel. La différence d'expérience est radicale.

### Critère 5 — Quel support en cas de problème ?

Avant de souscrire à un outil, posez cette question précise : "À qui est-ce que j'envoie un message si mon agenda ne fonctionne plus demain matin à 8h ?" La réponse que vous obtenez — ou l'absence de réponse — est un indicateur fiable de ce que sera votre expérience sur la durée.

Les options existantes vont du ticket support avec délai de 72h à l'équipe disponible en quelques heures sur votre numéro de téléphone. Pour un praticien indépendant, un problème technique sur son agenda en ligne n'est pas un désagrément — c'est une urgence opérationnelle. Des patients tentent de réserver, ne peuvent pas, et passent à autre chose.

### Critère 6 — La conformité RGPD est-elle assurée ?

Ce critère est rarement mentionné dans les comparatifs grand public, mais il est particulièrement important pour les praticiens bien-être. Vous collectez et stockez des données qui peuvent être qualifiées de sensibles au sens du RGPD — informations relatives à la santé, au bien-être psychologique, à des situations personnelles. L'article 9 du règlement européen encadre strictement le traitement de ces données.

Vérifiez systématiquement : où les données sont-elles hébergées (Europe ou États-Unis) ? Comment les consentements sont-ils collectés et tracés ? Quel est le niveau de sécurisation des données ? En cas de contrôle de la CNIL, c'est votre responsabilité en tant que praticien qui est engagée, pas celle de l'éditeur logiciel.

---

## Panorama honnête des solutions disponibles

### Doctolib — puissant, mais pas pour vous

Doctolib est le leader incontesté en France pour la prise de rendez-vous médicaux. Sa notoriété est réelle, son infrastructure solide, et sa couverture auprès du grand public incomparable. Mais ces atouts sont construits pour les professionnels de santé réglementés — médecins, dentistes, kinésithérapeutes, infirmiers.

Pour un praticien bien-être indépendant, plusieurs points posent problème. La personnalisation est très limitée : vous existez comme une fiche dans la base Doctolib, avec leur design et leur interface. La marque blanche est quasi inexistante. Les tarifs sont conçus pour des volumes médicaux. Et surtout, Doctolib n'est pas prévu pour les pratiques non réglementées — sophrologue, coach, psychopraticien, naturopathe — ce qui peut créer des incompatibilités dans les catégories de praticiens et les parcours proposés aux patients.

### Calendly — simple et efficace, mais généraliste

Calendly est probablement l'outil le plus simple à prendre en main sur le marché. L'interface est intuitive, la prise en main rapide, et l'intégration avec Google Agenda et Outlook fonctionne sans friction. Pour quelqu'un qui veut être opérationnel en une après-midi et qui est à l'aise avec la technologie, c'est une option valide.

Ses limites pour les praticiens bien-être : pas de marque blanche native dans les offres de base — vos patients réservent sur calendly.com/votre-nom. Pas de facturation intégrée — vous avez besoin d'un outil séparé. Le support est anglophone et asynchrone. Et l'outil est conçu pour un usage professionnel généraliste (commerciaux, consultants, recruteurs) plutôt que pour la spécificité d'une pratique de soin ou d'accompagnement.

Si vous êtes très à l'aise techniquement, que vous gérez votre facturation par ailleurs et que vous n'avez pas besoin d'accompagnement à la configuration : Calendly peut convenir, notamment en début d'activité.

### Setmore et Simplybook.me — flexibles, mais exigeants

Ces deux solutions offrent plus de personnalisation que Calendly et davantage de fonctionnalités natives (gestion de plusieurs praticiens, paiements en ligne, pages personnalisables). Elles se positionnent entre la simplicité de Calendly et la spécialisation d'outils métier.

Leur point faible commun : la configuration est entièrement en self-service, et elle est significativement plus complexe que Calendly. Les forums d'entraide en ligne sont en majorité en anglais. Le support est limité en français. Beaucoup de praticiens qui ont souscrit à ces solutions les sous-exploitent massivement — les fonctionnalités sont là, mais la courbe d'apprentissage a découragé la configuration complète.

### Espace Agenda — pour quel profil ?

Espace Agenda n'est pas la solution la plus connue, ni celle avec le plus de fonctionnalités sur le papier. C'est une solution conçue pour un profil précis : le praticien bien-être indépendant (ou le petit cabinet de 2 à 3 praticiens) qui veut une page de réservation à son image, qui ne souhaite pas gérer la configuration technique, et qui cherche un interlocuteur humain sur la durée.

Honnêteté assumée : si vous êtes très à l'aise techniquement, que vous aimez personnaliser vos outils vous-même et que vous n'avez pas besoin d'accompagnement, Calendly ou Simplybook.me peuvent tout à fait vous suffire, à moindre coût. Espace Agenda n'est pas fait pour vous.

En revanche, si vous reconnaissez votre profil dans : "je préfère que quelqu'un s'en occupe pour moi", "j'ai eu de mauvaises expériences avec des outils que je n'ai jamais réussi à configurer correctement", "je veux pouvoir appeler quelqu'un si ça ne marche plus" — alors Espace Agenda a été conçu pour répondre à exactement ces besoins.

---

## Espace Agenda en détail — fonctionnalités, offres et installation

### Les trois offres

**Essentiel — 29€/mois**

L'offre d'entrée comprend la réservation en ligne 24/7 sur votre page à votre nom, les rappels automatiques par email et WhatsApp, la facturation intégrée, la synchronisation Google Agenda / Apple Calendar / Outlook, et l'installation complète par l'équipe Espace Agenda. C'est l'offre qui convient à un praticien qui démarre ou dont l'activité est entièrement individuelle, avec un volume de séances modéré.

**Pro — 45€/mois**

L'offre Pro ajoute aux fonctionnalités Essentiel : les paiements en ligne (acompte et paiement complet à la réservation), 50 SMS inclus par mois, le support téléphonique, et une fiche patient complète avec historique des séances. C'est l'offre recommandée dès que vous souhaitez activer l'acompte à la réservation — le levier numéro un contre les absences.

**Intégral — 69€/mois**

L'offre Intégral comprend l'ensemble des fonctionnalités Pro, avec 100 SMS inclus par mois, un chatbot de prise en charge initial, l'accès API pour les intégrations personnalisées, et un accompagnement prioritaire. Elle s'adresse aux praticiens avec un volume d'activité élevé ou aux petits cabinets multi-praticiens.

Les trois offres sont disponibles en engagement mensuel ou annuel. En annuel : Essentiel 290€ · Pro 450€ · Intégral 690€ (équivalent à 10 mois, soit 2 mois offerts). Des frais d'installation uniques s'appliquent selon l'offre choisie (149€ à 249€) — ils couvrent la configuration complète et la formation initiale.

### Comment se passe l'installation

Le processus tient en quatre étapes. Un appel de cadrage d'abord : vous présentez votre pratique, vos types de séances, vos tarifs, votre univers visuel. Un formulaire de besoins ensuite, que vous remplissez à votre rythme avec vos textes et vos informations. Le paramétrage complet est ensuite réalisé par l'équipe Espace Agenda — vous ne touchez à rien. Une formation de 30 minutes enfin, pour prendre en main l'interface d'administration et comprendre les quelques actions que vous aurez à faire au quotidien (ajouter une indisponibilité, consulter votre agenda, suivre vos réservations).

Délai standard : 7 jours ouvrés entre le premier appel et la mise en ligne de votre page.

### Voir des exemples concrets

Deux pages sont accessibles en ligne pour donner une idée concrète du rendu.

[Harmonie Thérapie →](https://harmonietherapeute.wlbookings.com) — praticienne bien-être, design épuré, palette douce, types de séances variés.

[CalmeOstéo →](https://ostodirect.wlbookings.com) — ostéopathe, design professionnel, gestion des créneaux par type de consultation.

Ces deux exemples illustrent la personnalisation possible en marque blanche — deux pages qui ne se ressemblent pas, et qui ne ressemblent à aucune plateforme généraliste.

---

## Recommandation claire selon votre profil

### Profil 1 — Vous débutez et voulez être opérationnel rapidement

Vous commencez votre activité, vous avez quelques premiers patients, vous gérez encore tout à la main — et vous savez que ça ne tiendra pas longtemps. Vous n'avez pas envie de passer du temps sur la configuration d'un outil : vous voulez quelque chose qui fonctionne, à votre nom, sans que vous ayez à tout apprendre.

**Recommandation : Espace Agenda Essentiel.** Installation faite pour vous, opérationnel en 7 jours, rappels activés dès le premier jour. 29€/mois pour éliminer la gestion manuelle dès le départ.

### Profil 2 — Vous avez déjà des patients et vous voulez sécuriser les réservations

Votre activité est lancée, vous avez un flux régulier de patients, et vous commencez à avoir des absences récurrentes. Vous voulez activer l'acompte à la réservation, avoir un vrai suivi de vos patients, et gagner du temps sur la facturation.

**Recommandation : Espace Agenda Pro.** Paiements en ligne natifs, SMS inclus, fiche patient complète. La combinaison qui donne les meilleurs résultats sur la réduction des absences.

### Profil 3 — Vous êtes à l'aise techniquement et voulez tout configurer vous-même

Vous avez des compétences techniques, vous aimez personnaliser vos outils, vous n'avez pas besoin d'accompagnement et vous maîtrisez votre agenda. Le support anglophone ne vous pose pas de problème.

**Recommandation honnête : Calendly ou Simplybook.me.** Ces solutions self-service peuvent tout à fait suffire si vous êtes dans ce profil. Elles sont moins chères et offrent une flexibilité de configuration que certains utilisateurs apprécient. En revanche, vous n'aurez pas de marque blanche native dans les offres d'entrée, pas de facturation intégrée, et pas de support francophone.

[**Demander l'installation — votre agenda en ligne en 7 jours →**](/contact)

[**Voir les démos en direct (Harmonie Thérapie / CalmeOstéo) →**](/exemples)

[**Planifier un échange de 20 minutes →**](/contact)

---

## Témoignage

> *"Gain de temps réel au quotidien. La facturation intégrée et les paiements en ligne à l'avance ont changé ma façon de travailler. La flexibilité pour créer mes types de séances et gérer mon planning est exactement ce dont j'avais besoin."*
>
> **Guillaume · Psychopraticien · Gironde**

---

## FAQ — Logiciel de prise de rendez-vous pour praticiens

### Quelle différence entre un logiciel généraliste et une solution pour praticiens bien-être ?

Un logiciel généraliste comme Calendly est conçu pour tous les secteurs : commerciaux, recruteurs, consultants, enseignants, professionnels de santé. Il offre des fonctionnalités larges mais peu spécialisées. Une solution pensée pour les praticiens bien-être intègre des spécificités que les outils généralistes ne traitent pas nativement : types de séances variables, politique d'annulation adaptable, acompte à la réservation, facturation conforme aux obligations des libéraux, et souvent un accompagnement à la configuration pensé pour des utilisateurs non techniques.

### Peut-on utiliser Doctolib quand on est coach ou sophrologue ?

Techniquement oui — rien ne l'interdit. En pratique, Doctolib est conçu pour les professionnels de santé réglementés. Les catégories de praticiens, les parcours proposés aux patients, la facturation et même les conditions générales sont pensées pour ce public. Un sophrologue ou un coach qui utilise Doctolib se retrouve souvent dans une case qui ne correspond pas exactement à sa pratique. Et il subit les mêmes contraintes (dépendance à la plateforme, visibilité algorithmique, absence de marque blanche) sans nécessairement bénéficier des avantages (référencement médical, remboursements).

### Combien coûte en moyenne un logiciel de prise de rendez-vous ?

Le spectre est large. Calendly propose une offre gratuite avec des fonctionnalités très limitées, et des abonnements payants à partir de 8 à 10 € par mois en version individuelle. Doctolib facture autour de 100 à 180 € par mois selon la spécialité. Les solutions intermédiaires (Setmore, Simplybook.me) se situent entre 10 et 40 € par mois selon les fonctionnalités. Espace Agenda se positionne à 29€/mois (Essentiel) à 69€/mois (Intégral), avec l'avantage de l'installation et de l'accompagnement inclus dans ce tarif.

La vraie question n'est pas "quel est le moins cher ?" mais "quel est le coût par rapport à ce qu'il me fait gagner ?" Un outil à 10 €/mois que vous n'utilisez qu'à 30 % coûte plus cher qu'un outil à 45 €/mois que vous utilisez pleinement et qui réduit vos absences de moitié.

### Est-il possible d'essayer avant de payer ?

Chez Espace Agenda, nous proposons un échange de 20 minutes avant toute souscription — pour comprendre votre pratique, vous montrer à quoi ressemblera votre page, et vérifier ensemble que la solution correspond à vos besoins. Vous pouvez également consulter les démos live (Harmonie Thérapie et CalmeOstéo) pour avoir une idée concrète du rendu. Calendly et Simplybook.me proposent des périodes d'essai gratuites de 14 à 30 jours.

### La prise de rendez-vous en ligne est-elle adaptée aux consultations psychologiques ?

Oui, à condition que la page soit conçue avec soin. La réservation en ligne n'interfère pas avec la dimension thérapeutique de la relation — elle automatise uniquement la logistique. Une page bien construite, à votre image, avec vos textes et votre positionnement, renforce la confiance avant le premier contact plutôt qu'elle ne la diminue. De nombreux psychopraticiens, thérapeutes et accompagnants utilisent la réservation en ligne — y compris pour des pratiques où la qualité de la relation et du cadre est centrale.

### Comment migrer d'un autre logiciel vers Espace Agenda ?

La migration est prise en charge dans le cadre de l'installation. Nous récupérons les informations utiles de votre outil actuel, configurons le nouveau système, et gérons la transition pour que vos patients ne soient pas perturbés. La seule action de votre côté : mettre à jour le lien de réservation sur votre site web et vos réseaux sociaux.

---

## Conclusion

Choisir un logiciel de prise de rendez-vous n'est pas une décision technique. C'est une décision d'organisation — et, dans une certaine mesure, une décision d'image.

Les bonnes questions ne sont pas "lequel a le plus de fonctionnalités ?" ou "lequel est le moins cher ?" mais : est-ce que cette solution convient à mon profil ? Est-ce qu'elle sera réellement utilisée ? Est-ce qu'elle s'intègre dans mon quotidien sans créer de friction supplémentaire ?

Si vous êtes praticien bien-être indépendant, que vous cherchez une page à votre nom, que vous n'avez pas envie de vous transformer en technicien et que vous voulez quelqu'un à contacter si ça ne marche pas — la réponse à ces questions oriente clairement vers une solution accompagnée.

Si vous êtes à l'aise avec la technologie et souhaitez tout configurer vous-même — Calendly ou Simplybook.me peuvent convenir, avec leurs limites sur la marque blanche et le support francophone.

Le bon outil est celui que vous utilisez vraiment, entièrement, sans compensation manuelle. Quel qu'il soit.

---

**Pour aller plus loin**

→ [Comment réduire les absences et les lapins dans votre cabinet ?](/blog) *(Pilier 1)*

→ [Gagner du temps en cabinet : ce que la gestion de vos rendez-vous vous coûte vraiment](/blog) *(Pilier 2)*

→ [Découvrir les offres Espace Agenda](/offres)

→ [Voir les pages de démonstration](/exemples)

→ [Planifier un échange de 20 minutes](/contact)"""
},

]  # fin de la liste new_posts


async def insert_posts():
    mongo_url = os.environ['MONGO_URL']
    db_name = os.environ['DB_NAME']

    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]

    existing_count = await db.blog_posts.count_documents({})
    print(f"Articles existants en base : {existing_count}")

    # Préparer les documents complets avec id, slug, date
    docs = []
    for post in new_posts:
        doc = {
            'id': str(uuid.uuid4()),
            'slug': generate_slug(post['title']),
            'title': post['title'],
            'excerpt': post['excerpt'],
            'content': post['content'],
            'author': post['author'],
            'date': datetime.utcnow(),
            'category': post['category'],
            'image': post['image'],
            'published': post['published'],
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow(),
        }
        docs.append(doc)

    # Insérer SANS supprimer les existants
    result = await db.blog_posts.insert_many(docs)
    print(f"\n{len(result.inserted_ids)} article(s) inséré(s) avec succès")

    for doc in docs:
        print(f"  - \"{doc['title'][:60]}...\" (id: {doc['id'][:8]}...)")

    new_total = await db.blog_posts.count_documents({})
    print(f"\nTotal articles en base : {new_total}")

    client.close()

if __name__ == "__main__":
    asyncio.run(insert_posts())
