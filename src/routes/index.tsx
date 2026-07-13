import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { useLenis } from "@/hooks/use-lenis";
import heroEmbers from "@/assets/hero-embers.jpg";
import dishBurrata from "@/assets/dish-burrata.jpg";
import dishGrill from "@/assets/dish-grill.jpg";
import dishParmo from "@/assets/dish-parmo.jpg";
import ambience from "@/assets/ambience.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

const dishes = [
  {
    n: "01",
    title: "Burrata Cremosa",
    desc: "Pesto de pistache, tomates confitados na brasa e focaccia artesanal da casa.",
    price: "R$ 68",
    img: dishBurrata,
  },
  {
    n: "02",
    title: "O Grill",
    desc: "Cortes premium selecionados, finalizados com flor de sal e fumaça de lenha frutífera.",
    price: "Sob consulta",
    img: dishGrill,
  },
  {
    n: "03",
    title: "Nosso Parmo",
    desc: "A releitura Habanero do clássico parmegiana, com crosta crocante e queijo curado.",
    price: "R$ 82",
    img: dishParmo,
  },
];

function Landing() {
  useLenis();
  const [scrolled, setScrolled] = useState(false);
  const heroImgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (heroImgRef.current) {
        const y = Math.min(window.scrollY * 0.35, 300);
        heroImgRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(${1 + window.scrollY * 0.0004})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background text-foreground font-body selection:bg-ember selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 py-5 flex justify-between items-end transition-all duration-500 ${
          scrolled
            ? "bg-coal/85 backdrop-blur-md text-white"
            : "mix-blend-difference text-white"
        }`}
      >
        <a href="#top" className="font-display text-2xl tracking-tighter">
          HABANERO
        </a>
        <div className="hidden md:flex gap-8 text-[10px] font-mono uppercase tracking-widest">
          <a href="#menu" className="hover:text-ember transition-colors">
            Cardápio
          </a>
          <a href="#ambiente" className="hover:text-ember transition-colors">
            O Espaço
          </a>
          <a href="#contato" className="hover:text-ember transition-colors">
            Reservar
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="top"
        className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-coal"
      >
        <div ref={heroImgRef} className="absolute inset-0 will-change-transform">
          <img
            src={heroEmbers}
            alt="Brasa incandescente do grill Habanero"
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-55 animate-scale-in"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coal/50 via-coal/20 to-coal" />
        </div>

        {/* Floating embers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute block rounded-full bg-ember"
              style={{
                left: `${(i * 53) % 100}%`,
                bottom: `${(i * 17) % 40}%`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                animation: `ember-float ${5 + (i % 5)}s ease-in ${i * 0.4}s infinite`,
                opacity: 0,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-ember/90 mb-6 animate-fade-up">
            Maringá — Paraná
          </p>
          <h1 className="font-display text-[18vw] md:text-[15vw] leading-[0.82] tracking-tighter text-white animate-fade-up">
            HABANERO
          </h1>
          <p
            className="text-white/80 mt-8 max-w-md mx-auto text-balance italic animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            A essência do fogo mediterrâneo. Grelhados autorais, burrata artesanal
            e uma atmosfera que respira brasa.
          </p>
        </div>

        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-fade-up"
          style={{ animationDelay: "500ms" }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">
            Descer
          </span>
          <div className="w-px h-14 bg-gradient-to-b from-ember to-transparent" />
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-coal text-white/90 border-y border-white/5 overflow-hidden">
        <div className="flex gap-16 py-6 whitespace-nowrap animate-[marquee_35s_linear_infinite] font-display uppercase text-3xl tracking-tight">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            [
              "Brasa Viva",
              "◆",
              "Mediterrâneo",
              "◆",
              "Vinhos Curados",
              "◆",
              "Cortes Premium",
              "◆",
              "Bistrô Autoral",
              "◆",
            ].map((w, i) => (
              <span key={`${k}-${i}`} className={i % 2 === 0 ? "text-ember" : ""}>
                {w}
              </span>
            )),
          )}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* Signature Dishes */}
      <section id="menu" className="py-32 px-6 max-w-7xl mx-auto">
        <Reveal className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
          <h2 className="font-display text-6xl md:text-7xl uppercase tracking-tighter">
            Assinatura
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/50">
            Maringá • PR — 23°25′S 51°56′W
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {dishes.map((d, i) => (
            <Reveal
              key={d.n}
              className="group cursor-pointer"
              delayMs={i * 120}
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-stone-100">
                <img
                  src={d.img}
                  alt={d.title}
                  width={800}
                  height={1088}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4 font-mono text-[10px] bg-background px-2 py-1">
                  {d.n}
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] bg-ember text-white px-3 py-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {d.price}
                </div>
              </div>
              <h3 className="font-display text-2xl uppercase mb-2 group-hover:text-ember transition-colors">
                {d.title}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                {d.desc}
              </p>
              <span className="font-mono text-xs text-ember">{d.price}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Atmosphere */}
      <section id="ambiente" className="bg-coal text-white py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <Reveal className="relative">
            <div className="relative w-full aspect-[4/5] ring-1 ring-white/10 shadow-2xl overflow-hidden">
              <img
                src={ambience}
                alt="Ambiente do Habanero em Maringá"
                width={1216}
                height={1504}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-ember rounded-full opacity-20 blur-3xl animate-ember-glow" />
          </Reveal>

          <Reveal className="space-y-8" delayMs={150}>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] uppercase tracking-tight">
              Onde o fogo{" "}
              <span className="italic font-body normal-case tracking-normal text-ember">
                encontra
              </span>{" "}
              o tempo.
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              No coração de Maringá, o Habanero é um convite à pausa. Um ambiente
              onde o design contemporâneo abraça o calor rústico do grill —
              ingredientes locais, técnicas ancestrais e uma carta de vinhos
              cuidadosamente curada.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <p className="font-mono text-[10px] uppercase text-white/40 mb-2">
                  Horários
                </p>
                <p className="text-sm leading-relaxed">
                  Ter — Sáb · 19h — 23h
                  <br />
                  Domingo · 12h — 16h
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase text-white/40 mb-2">
                  Local
                </p>
                <p className="text-sm leading-relaxed">
                  Av. Mauá, 2694
                  <br />
                  Maringá — PR
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <footer id="contato" className="py-24 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-ember mb-6">
              Reserve sua noite
            </p>
            <h3 className="font-display text-5xl md:text-6xl uppercase mb-12 tracking-tighter">
              Sinta o calor
            </h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/554430296900"
                target="_blank"
                rel="noreferrer"
                className="group relative px-12 py-5 bg-foreground text-background font-mono text-xs uppercase tracking-widest overflow-hidden transition-all hover:pr-16"
              >
                <span className="relative z-10">Reservar Mesa</span>
                <div
                  className="absolute top-0 right-0 h-full w-0 bg-ember group-hover:w-full transition-all duration-500"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                />
              </a>
              <a
                href="https://www.ifood.com.br/delivery/maringa-pr/habanero-restaurante-zona-09/6342b124-e9bd-4938-a22d-1f1b3e2a6c76"
                target="_blank"
                rel="noreferrer"
                className="px-12 py-5 border border-foreground/20 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
              >
                Pedir no iFood
              </a>
            </div>
          </Reveal>

          <div className="mt-20 flex justify-center gap-12 font-mono text-[10px] uppercase tracking-tight text-foreground/40">
            <a
              href="https://www.instagram.com/habaneromaringa/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ember transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/554430296900"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ember transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://maps.google.com/?q=Av.+Mau%C3%A1+2694+Maring%C3%A1"
              target="_blank"
              rel="noreferrer"
              className="hover:text-ember transition-colors"
            >
              Google Maps
            </a>
          </div>
          <p className="mt-20 font-mono text-[10px] text-foreground/25">
            © {new Date().getFullYear()} HABANERO · MARINGÁ, BRASIL
          </p>
        </div>
      </footer>
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
