"""
Continuation script after initial focused run timed out on networkidle while dashboard was visible.
Verifies remaining admin navigation, old /admin/* hiding, and /offres counters.
"""

async def run_remaining(page):
    base_url = "https://wellness-blog-seo.preview.emergentagent.com"
    password = "JQi]=3+8Azc4"

    try:
        await page.set_viewport_size({"width": 1920, "height": 1080})

        await page.goto(f"{base_url}/gestion-x7k9p2/login", wait_until="domcontentloaded")
        await page.locator("#password").wait_for(timeout=10000)
        await page.locator("#password").fill(password)
        await page.get_by_role("button", name="Se connecter").click()
        await page.wait_for_url("**/gestion-x7k9p2/dashboard", timeout=15000)
        await page.locator("h1", has_text="Administration").wait_for(timeout=10000)
        print("PASS: logged in for continuation checks")

        await page.get_by_role("button", name="Voir les messages").click()
        await page.wait_for_url("**/gestion-x7k9p2/contacts", timeout=15000)
        await page.locator("h1", has_text="Messages de contact").wait_for(timeout=10000)
        contact_links = await page.evaluate("""() => Array.from(document.querySelectorAll('a'))
            .map(a => a.getAttribute('href')).filter(Boolean)""")
        assert "/gestion-x7k9p2/dashboard" in contact_links
        assert not [href for href in contact_links if href.startswith('/admin')]
        print("PASS: contacts route and back link use /gestion-x7k9p2")

        await page.goto(f"{base_url}/gestion-x7k9p2/dashboard", wait_until="domcontentloaded")
        await page.locator("h1", has_text="Administration").wait_for(timeout=10000)
        await page.get_by_role("button", name="Voir les abonnés").click()
        await page.wait_for_url("**/gestion-x7k9p2/newsletters", timeout=15000)
        await page.locator("h1", has_text="Newsletter").wait_for(timeout=10000)
        newsletter_links = await page.evaluate("""() => Array.from(document.querySelectorAll('a'))
            .map(a => a.getAttribute('href')).filter(Boolean)""")
        assert "/gestion-x7k9p2/dashboard" in newsletter_links
        assert not [href for href in newsletter_links if href.startswith('/admin')]
        print("PASS: newsletters route and back link use /gestion-x7k9p2")

        await page.evaluate("localStorage.removeItem('admin_jwt')")
        for old_path in ["/admin/login", "/admin/unknown-route"]:
            await page.goto(f"{base_url}{old_path}", wait_until="domcontentloaded")
            await page.wait_for_function("window.location.pathname === '/'", timeout=10000)
            body_text = await page.locator("body").inner_text(timeout=10000)
            current_url = page.url
            assert "/gestion-x7k9p2" not in current_url
            assert "Espace Agenda - Connexion" not in body_text
            assert "Entrez le mot de passe admin" not in body_text
            print(f"PASS: {old_path} lands on home without revealing new route")

        await page.goto(f"{base_url}/offres", wait_until="domcontentloaded")
        await page.locator('[data-testid="offer-card-essentiel"]').wait_for(timeout=10000)
        expected = {
            "essentiel": "+ 11 autres fonctionnalités incluses",
            "pro": "+ 6 autres fonctionnalités incluses",
            "intégral": "+ 4 autres fonctionnalités incluses",
        }
        for slug, expected_counter in expected.items():
            card = page.locator(f'[data-testid="offer-card-{slug}"]')
            data = await card.evaluate("""(card) => {
                const items = Array.from(card.querySelector('ul').querySelectorAll(':scope > li'))
                    .map(li => li.textContent.trim().replace(/\s+/g, ' '));
                return {
                    items,
                    counter: items.find(t => t.includes('autres fonctionnalités incluses')) || '',
                    displayed: items.filter(t => !t.includes('autres fonctionnalités incluses')).length
                };
            }""")
            assert data["displayed"] == 8, f"{slug} displayed count = {data['displayed']}"
            assert data["counter"] == expected_counter, f"{slug} counter = {data['counter']}"
            print(f"PASS: {slug} shows 8 displayed features and {expected_counter}")

        print("ALL REMAINING CHECKS PASSED")
    except Exception as exc:
        print(f"TEST FAILED: {type(exc).__name__}: {exc}")
        raise
