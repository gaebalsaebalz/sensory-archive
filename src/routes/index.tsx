import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import heroOcean from "@/assets/hero.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import tea1 from "@/assets/tea-1.jpg";
import perfume1 from "@/assets/perfume-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "오감 아카이브 — 다섯 감각의 도서관" },
      {
        name: "description",
        content: "푸른 바다처럼 고요한 개인의 아카이브. 시각, 청각, 미각, 후각으로 수집한 감각의 기록들.",
      },
      { property: "og:title", content: "오감 아카이브 — 다섯 감각의 도서관" },
      { property: "og:description", content: "다섯 가지 감각으로 수집한 개인의 기록." },
      { property: "og:image", content: heroOcean },
      { name: "twitter:image", content: heroOcean },
    ],
  }),
  component: Home,
});

const categories = [
  { to: "/visual", num: "01", ko: "시각", en: "Visual", desc: "사이버 사진전, 미술관처럼 감상하는 이미지의 방." },
  { to: "/audio", num: "02", ko: "청각", en: "Audio", desc: "재즈, 클래식, 그리고 J-Pop. 바로 재생되는 소리의 서랍." },
  { to: "/taste", num: "03", ko: "미각", en: "Taste", desc: "맛집의 기록과 정성스럽게 우려낸 차의 시음기." },
  { to: "/scent", num: "04", ko: "후각", en: "Scent", desc: "한 방울에 담긴 계절. 향수의 후기 노트." },
  { to: "/guestbook", num: "05", ko: "방명록", en: "Guestbook", desc: "이 도서관에 다녀간 흔적을 남겨주세요." },
] as const;

function Home() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <img
          src={heroOcean}
          alt="해질 무렵의 깊고 푸른 바다"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/40 via-ocean-deep/30 to-ocean-deep/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 fade-up">
          <div className="text-[10px] tracking-[0.4em] uppercase text-paper/60 mb-8">
            A Private Curation · Vol. 01
          </div>
          <h1 className="font-display italic text-paper text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight">
            Ocean of Memory
          </h1>
          <p className="mt-6 font-serif text-paper/80 text-base md:text-lg tracking-[0.3em] uppercase">
            오 · 감 · 아 · 카 · 이 · 브
          </p>
          <p className="mt-10 max-w-[42ch] text-paper/70 text-sm md:text-base leading-relaxed">
            낡은 도서관과 한적한 사진전 사이 어딘가, 다섯 감각이 머무는 방.
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-paper/50 text-[10px] tracking-[0.3em] uppercase">
          Scroll · 스크롤
        </div>
      </section>

      {/* CURATOR NOTE */}
      <section className="max-w-3xl mx-auto px-6 md:px-8 py-32 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-accent">Preface · 00.1</span>
        <h2 className="mt-6 font-display italic text-3xl md:text-4xl text-ink leading-tight text-balance">
          기록되지 않은 감각은 잊혀진 계절과 같다.
        </h2>
        <p className="mt-8 text-muted-ink leading-loose text-pretty">
          이곳은 나의 오감을 천천히 수집하는 개인적인 도서관입니다.
          낡은 책장 사이로 스며드는 바다의 냄새, 귀 끝에 머무는 재즈의 선율,
          입안을 감도는 찻잎의 떫은 맛까지. 소멸하기 쉬운 찰나의 감각들을
          한 권의 책처럼 가지런히 보관합니다.
        </p>
      </section>

      {/* CATEGORY INDEX */}
      <section className="bg-secondary border-y border-ink/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-24">
          <div className="flex items-baseline justify-between mb-12 border-b border-ink/10 pb-4">
            <h2 className="font-display italic text-3xl md:text-4xl text-ink">Index of Senses</h2>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-ink">
              다섯 개의 방
            </span>
          </div>
          <ul className="divide-y divide-ink/10">
            {categories.map((c) => (
              <li key={c.to}>
                <Link
                  to={c.to}
                  className="group grid grid-cols-12 gap-4 py-8 items-center hover:bg-paper/60 transition-colors px-2 md:px-4 -mx-2 md:-mx-4"
                >
                  <span className="col-span-2 md:col-span-1 text-muted-ink font-serif italic text-lg">
                    {c.num}
                  </span>
                  <div className="col-span-10 md:col-span-3">
                    <div className="font-display italic text-3xl md:text-4xl text-ink group-hover:text-accent transition-colors">
                      {c.ko}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-muted-ink mt-1">
                      {c.en}
                    </div>
                  </div>
                  <p className="col-span-12 md:col-span-7 text-sm md:text-base text-muted-ink leading-relaxed">
                    {c.desc}
                  </p>
                  <span className="hidden md:block col-span-1 text-right text-muted-ink group-hover:text-accent transition-colors">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RECENT ENTRIES */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-32">
        <div className="flex items-baseline justify-between mb-12 border-b border-ink/10 pb-4">
          <h2 className="font-display italic text-3xl md:text-4xl text-ink">Recent Entries</h2>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-ink">최근의 기록</span>
        </div>
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          <Entry
            img={gallery1}
            kicker="시각 / Visual"
            title="기하학적 고독"
            desc="오후의 빛이 만든 가장 단순한 풍경에 대하여."
            to="/visual"
          />
          <Entry
            img={tea1}
            kicker="미각 / Taste"
            title="우지 교쿠로, 첫 안개"
            desc="씁쓸함 끝에 찾아오는 은은한 단맛. 차의 첫 모금에 대하여."
            to="/taste"
          />
          <Entry
            img={perfume1}
            kicker="후각 / Scent"
            title="Byredo · Bal d'Afrique"
            desc="병 속에 담긴 노을. 마리골드와 시더우드의 잔향."
            to="/scent"
          />
        </div>
      </section>
    </PageShell>
  );
}

function Entry({
  img,
  kicker,
  title,
  desc,
  to,
}: {
  img: string;
  kicker: string;
  title: string;
  desc: string;
  to: "/visual" | "/taste" | "/scent";
}) {
  return (
    <Link to={to} className="group block">
      <div className="overflow-hidden bg-secondary aspect-[4/5] mb-5">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
        />
      </div>
      <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
        {kicker}
      </span>
      <h3 className="mt-2 font-display italic text-2xl text-ink group-hover:underline underline-offset-4">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted-ink leading-relaxed">{desc}</p>
    </Link>
  );
}
