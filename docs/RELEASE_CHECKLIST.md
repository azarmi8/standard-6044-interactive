# Release Checklist — v1.0.0

## وضعیت فعلی

Baseline: `main @ 1f281bd511b5f16e11296771d4a08436c5c21a3f`

### گیت‌های فنی فعلی

- [x] Static QA روی main — Run #219 موفق
- [x] Browser Smoke روی main — Run #169 موفق (39/39)
- [x] 22 واحد یادگیری با shared engine
- [x] 1600×900 SVG contract
- [x] reduced-motion / mobile smoke
- [x] assessment/search/simulation contracts
- [x] cover/contents treatment
- [ ] Fullscreen visual QA انسانی
- [ ] Final clause-level source audit
- [ ] Persian TTS human listening benchmark
- [ ] Release narration approval/generation
- [x] GitHub Pages enablement + successful deploy — Run #219
- [ ] Final owner acceptance
- [ ] v1.0.0 tag
- [ ] Release notes finalized

## معیار توقف

تا وقتی هر مورد باقی‌ماندهٔ بالا بسته نشده است، پروژه را «v1.0 release-ready» اعلام نکنید.

## انتشار

پس از سبز شدن همه گیت‌ها:

1. freeze scope
2. run final static + browser checks on the exact release commit
3. verify Pages URL and rendered book
4. create tag `v1.0.0`
5. publish release notes
6. record final SHA and Pages URL in `docs/RELEASE_READINESS.md`
