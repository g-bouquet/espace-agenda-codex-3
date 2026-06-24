"""Corrige les liens internes "Pour aller plus loin" : remplace (/blog) par le slug réel de l'article ciblé."""
import asyncio
import os
import re
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

SLUG_A = "comment-réduire-les-absences-et-les-lapins-dans-votre-cabinet"
SLUG_B = "gagner-du-temps-en-cabinet-ce-que-la-gestion-de-vos-rendez-vous-vous-coûte-vraiment"
SLUG_C = "quel-logiciel-de-prise-de-rendez-vous-choisir-quand-on-est-praticien-indépendant-guide-2026"


def resolve_slug(link_text: str):
    t = link_text.lower()
    if "lapins" in t or "réduire les absences" in t:
        return SLUG_A
    if "administratif" in t or "gagner du temps" in t:
        return SLUG_B
    if "logiciel" in t:
        return SLUG_C
    return None


def fix_content(content: str):
    def repl(m):
        text = m.group(1)
        slug = resolve_slug(text)
        if slug:
            return f"[{text}](/blog/{slug})"
        return m.group(0)  # laisser inchangé si non résolu
    return re.sub(r"\[([^\]]+)\]\(/blog\)", repl, content)


async def main():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client[os.environ['DB_NAME']]
    posts = await db.blog_posts.find({}).to_list(100)
    for p in posts:
        content = p.get('content', '')
        new_content = fix_content(content)
        if new_content != content:
            await db.blog_posts.update_one({"id": p["id"]}, {"$set": {"content": new_content}})
            print(f"MAJ: {p.get('slug')}")
            for m in re.findall(r"\[([^\]]+)\]\(/blog/([^)]+)\)", new_content):
                print("   ->", m[1])
        else:
            print(f"Inchangé: {p.get('slug')}")
    client.close()


if __name__ == "__main__":
    asyncio.run(main())
