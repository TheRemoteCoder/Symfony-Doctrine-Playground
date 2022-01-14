# udemy course - Real world app

- [General](#general)
- [Q+A](#qa)
- [Tools](#tools)

---

## General

- [ ] Migrate knowledge in own data structures/folders (e.g. snippets)

---

## Q+A

### Symfony

Bugs

- [ ] Login auth: User password `test` does not work (invalid?)
- [ ] Login auth: `access_control` in `security.yaml` does not work

Optional / Advanced

- [ ] Forms: Entering whitespace (no text) bypasses length validation, but then crashes later: 'Expected argument of type "string", "null" given at property path "text".'
  - How to fix this in backend (not via JS)?
  - Are there filters/sanitizations -before- validation?
- [ ] Why do -some- classes need constructor() import and others not?
  - e.g. Factory/Repository classes
  - Service container autowiring?
- [ ] Entities: Why nullable types, despite telling in CLI generatator that it should NOT be null?
  - Example: `public function getId(): ?int`
- [ ] .gitignore: Why so many of them e.g. in Entities, Migrations, translations, ...?
  - Instead of: .gitkeep?

Other

- [ ] Check 'todo' comments in code

### Development

- [ ] VSCode: ORM annotations don't have IntelliSense - Possible? How to fix?
  - e.g. `@ORM\GeneratedValue` is not clickable to see details?

---

## Ecosystem

- [ ] Symfony UX - https://github.com/symfony/ux

