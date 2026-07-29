"""
Focused bug verification for:
1) Admin UI route renamed from /admin/* to /gestion-x7k9p2/* and old /admin/* hidden.
2) Offer cards feature counters on /offres.

This script is intended to run with the MCP browser automation tool against the preview URL.
"""

async def run(page):
    base_url = "https://wellness-blog-seo.preview.emergentagent.com"
    password = "JQi]=3+8Azc4"

    async def no_visible_errors(step):
        error_text = await page.evaluate("""() => {
            const errorElements = Array.from(document.querySelectorAll('.error, [class*="error"], [id*="error"]'));
            return errorElements.map(el => el.textContent).join(", ");
        }""")
        if error_text:
            print(f"{step}: Found error message: {error_text}")
        else:
            print(f"{step}: No error messages found on the page")
        return error_text

    try:
        await page.set_viewport_size({"width": 1920, "height": 1080})
        print("Step 1: viewport set")

        # New admin URL must show admin login page.
        await page.goto(f"{base_url}/gestion-x7k9p2/login", wait_until="domcontentloaded")
        await page.wait_for_load_state("networkidle", timeout=15000)
        print(f"Step 2: loaded new admin login route: {page.url}")
        await page.locator("h2", has_text="Administration").wait_for(timeout=10000)
        await page.locator("#password").wait_for(timeout=10000)
        assert "/gestion-x7k9p2/login" in page.url, f"Expected new login URL, got {page.url}"
        print("PASS: New /gestion-x7k9p2/login displays admin login page")
        await no_visible_errors("new-login")

        # Login once using the correct password and verify dashboard route.
        await page.locator("#password").fill(password)
        await page.get_by_role("button", name="Se connecter").click()
        await page.wait_for_url("**/gestion-x7k9p2/dashboard", timeout=15000)
        await page.locator("h1", has_text="Administration").wait_for(timeout=10000)
        print(f"PASS: Admin login succeeded and redirected to {page.url}")
        token_exists = await page.evaluate("Boolean(localStorage.getItem('admin_jwt'))")
        assert token_exists, "Expected admin_jwt token in localStorage after login"
        print("PASS: JWT token stored in localStorage")
        await no_visible_errors("dashboard-after-login")

        # Dashboard internal links must use the new prefix and not /admin.
        dashboard_links = await page.evaluate("""() => Array.from(document.querySelectorAll('a'))
            .map(a => ({text: a.textContent.trim().replace(/\s+/g, ' '), href: a.getAttribute('href')}))""")
        print(f"Dashboard links: {dashboard_links}")
        forbidden = [link for link in dashboard_links if link.get('href') and link.get('href').startswith('/admin')]
        assert not forbidden, f"Dashboard still contains /admin links: {forbidden}"
        expected_hrefs = {"/gestion-x7k9p2/posts", "/gestion-x7k9p2/posts/new", "/gestion-x7k9p2/contacts", "/gestion-x7k9p2/newsletters"}
        actual_hrefs = {link.get('href') for link in dashboard_links}
        assert expected_hrefs.issubset(actual_hrefs), f"Missing expected dashboard hrefs: {expected_hrefs - actual_hrefs}"
        print("PASS: Dashboard links use /gestion-x7k9p2 prefix")

        # Click through admin navigation pages and verify no blank/404 and new route is retained.
        await page.get_by_role("button", name="Gérer les articles").click()
        await page.wait_for_url("**/gestion-x7k9p2/posts", timeout=15000)
        await page.locator("h1", has_text="Gestion des articles").wait_for(timeout=10000)
        assert "/gestion-x7k9p2/posts" in page.url and "/admin" not in page.url
        print("PASS: Posts navigation works on new prefix")

        posts_links = await page.evaluate("""() => Array.from(document.querySelectorAll('a'))
            .map(a => a.getAttribute('href')).filter(Boolean)""")
        assert not [href for href in posts_links if href.startswith('/admin')], f"Posts page contains old /admin links: {posts_links}"
        print("PASS: Posts page links avoid old /admin prefix")

        await page.get_by_role("button", name="Nouvel article").first.click()
        await page.wait_for_url("**/gestion-x7k9p2/posts/new", timeout=15000)
        await page.locator("h1", has_text="Nouvel article").wait_for(timeout=10000)
        assert "/gestion-x7k9p2/posts/new" in page.url and "/admin" not in page.url
        print("PASS: Post editor navigation works on new prefix")

        editor_links = await page.evaluate("""() => Array.from(document.querySelectorAll('a'))
            .map(a => a.getAttribute('href')).filter(Boolean)""")
        assert not [href for href in editor_links if href.startswith('/admin')], f"Editor page contains old /admin links: {editor_links}"
        assert "/gestion-x7k9p2/posts" in editor_links, "Editor back link should point to /gestion-x7k9p2/posts"
        print("PASS: Editor page internal links use new prefix")

        await page.goto(f"{base_url}/gestion-x7k9p2/dashboard", wait_until="domcontentloaded")
        await page.wait_for_load_state("networkidle", timeout=15000)
        await page.get_by_role("button", name="Voir les messages").click()
        await page.wait_for_url("**/gestion-x7k9p2/contacts", timeout=15000)
        await page.locator("h1", has_text="Messages de contact").wait_for(timeout=10000)
        assert "/gestion-x7k9p2/contacts" in page.url and "/admin" not in page.url
        contact_links = await page.evaluate("""() => Array.from(document.querySelectorAll('a'))
            .map(a => a.getAttribute('href')).filter(Boolean)""")
        assert "/gestion-x7k9p2/dashboard" in contact_links, "Contacts back link should point to new dashboard URL"
        assert not [href for href in contact_links if href.startswith('/admin')], f"Contacts page contains old /admin links: {contact_links}"
        print("PASS: Contacts navigation works and links use new prefix")

        await page.goto(f"{base_url}/gestion-x7k9p2/dashboard", wait_until="domcontentloaded")
        await page.wait_for_load_state("networkidle", timeout=15000)
        await page.get_by_role("button", name="Voir les abonnés").click()
        await page.wait_for_url("**/gestion-x7k9p2/newsletters", timeout=15000)
        await page.locator("h1", has_text="Newsletter").wait_for(timeout=10000)
        assert "/gestion-x7k9p2/newsletters" in page.url and "/admin" not in page.url
        newsletter_links = await page.evaluate("""() => Array.from(document.querySelectorAll('a'))
            .map(a => a.getAttribute('href')).filter(Boolean)""")
        assert "/gestion-x7k9p2/dashboard" in newsletter_links, "Newsletters back link should point to new dashboard URL"
        assert not [href for href in newsletter_links if href.startswith('/admin')], f"Newsletters page contains old /admin links: {newsletter_links}"
        print("PASS: Newsletters navigation works and links use new prefix")

        # Old admin URLs must not show admin login and must not reveal the new URL.
        await page.evaluate("localStorage.removeItem('admin_jwt')")
        await page.goto(f"{base_url}/admin/login", wait_until="domcontentloaded")
        await page.wait_for_load_state("networkidle", timeout=15000)
        await page.wait_for_timeout(500)
        old_login_path = await page.evaluate("window.location.pathname")
        old_login_text = await page.locator("body").inner_text(timeout=10000)
        print(f"Old /admin/login ended at path={old_login_path}, url={page.url}")
        assert old_login_path == "/", f"/admin/login should land on '/', got {old_login_path}"
        assert "/gestion-x7k9p2" not in page.url, f"/admin/login revealed new route: {page.url}"
        assert "Espace Agenda - Connexion" not in old_login_text, "Old /admin/login still displays admin login content"
        print("PASS: Old /admin/login is inaccessible and does not reveal new route")

        await page.goto(f"{base_url}/admin/some-unknown-url", wait_until="domcontentloaded")
        await page.wait_for_load_state("networkidle", timeout=15000)
        await page.wait_for_timeout(500)
        old_unknown_path = await page.evaluate("window.location.pathname")
        old_unknown_text = await page.locator("body").inner_text(timeout=10000)
        print(f"Old /admin/* unknown ended at path={old_unknown_path}, url={page.url}")
        assert old_unknown_path == "/", f"/admin/* unknown should land on '/', got {old_unknown_path}"
        assert "/gestion-x7k9p2" not in page.url, f"/admin/* unknown revealed new route: {page.url}"
        assert "Espace Agenda - Connexion" not in old_unknown_text, "Old /admin/* displays admin login content"
        print("PASS: Old /admin/* unknown routes are inaccessible and do not reveal new route")

        # Offer feature counters: 8 textual features + correct +N counters.
        await page.goto(f"{base_url}/offres", wait_until="domcontentloaded")
        await page.wait_for_load_state("networkidle", timeout=15000)
        await page.locator('[data-testid="offer-card-essentiel"]').wait_for(timeout=10000)
        print("Step: loaded /offres")

        expected_counters = {
            "essentiel": "+ 11 autres fonctionnalités incluses",
            "pro": "+ 6 autres fonctionnalités incluses",
            "intégral": "+ 4 autres fonctionnalités incluses",
        }

        for slug, expected_text in expected_counters.items():
            card = page.locator(f'[data-testid="offer-card-{slug}"]')
            await card.wait_for(timeout=10000)
            result = await card.evaluate("""(card) => {
                const featureList = card.querySelector('ul');
                const items = Array.from(featureList.querySelectorAll(':scope > li')).map(li => li.textContent.trim().replace(/\s+/g, ' '));
                const counter = items.find(t => t.includes('autres fonctionnalités incluses')) || '';
                const displayedFeatures = items.filter(t => !t.includes('autres fonctionnalités incluses'));
                return {items, counter, displayedFeatureCount: displayedFeatures.length};
            }""")
            print(f"Offer {slug}: {result}")
            assert result["displayedFeatureCount"] == 8, f"{slug}: expected 8 displayed features, got {result['displayedFeatureCount']}"
            assert result["counter"] == expected_text, f"{slug}: expected counter '{expected_text}', got '{result['counter']}'"
            print(f"PASS: {slug} shows 8 features and counter {expected_text}")

        await no_visible_errors("offres")
        print("ALL CHECKS PASSED")

    except Exception as exc:
        print(f"TEST FAILED: {type(exc).__name__}: {exc}")
        raise
