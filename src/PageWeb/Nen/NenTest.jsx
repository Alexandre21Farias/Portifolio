import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

// Hunter x Hunter's water divination. Coffee shows up in two of the reactions.
// Each type has its own reaction in the cup, driven by the data-type attribute in CSS.
const TYPES = {
  enhancer: {
    en: ["Enhancer", "The water overflowed. Straightforward and determined, like Gon."],
    pt: ["Intensificação", "A água transbordou. Direto e determinado, como o Gon."],
  },
  transmuter: {
    en: ["Transmuter", "Nothing visible changed, but the water turned sweet. Whimsical, like Killua."],
    pt: ["Transformação", "Nada mudou por fora, mas a água ficou doce. Imprevisível, como o Killua."],
  },
  emitter: {
    en: ["Emitter", "The water changed colour. It turned into coffee. Impatient and hot-headed, like Leorio."],
    pt: ["Emissão", "A água mudou de cor: virou café. Impaciente e esquentado, como o Leorio."],
  },
  conjurer: {
    en: ["Conjurer", "Coffee grains appeared in the water. Serious and careful, like Kurapika."],
    pt: ["Materialização", "Apareceram grãos de café na água. Sério e cuidadoso, como o Kurapika."],
  },
  manipulator: {
    en: ["Manipulator", "The leaf started to spin. Logical, always a step ahead, like Illumi."],
    pt: ["Manipulação", "A folha começou a girar. Lógico, sempre um passo à frente, como o Illumi."],
  },
  specialist: {
    en: ["Specialist", "The leaf rose out of the glass and floated away. Unique, like Chrollo."],
    pt: ["Especialização", "A folha saiu do copo e ficou flutuando. Único, como o Chrollo."],
  },
};

const KEYS = Object.keys(TYPES);

export default function NenTest({ language }) {
  const [type, setType] = useState(null);
  const [held, setHeld] = useState(false);
  const from = useRef(null);
  const stage = useRef(null);
  const sim = useRef({ tx: 0, ty: 0, x: 0, y: 0, vx: 0, vy: 0, s: 0, vs: 0, raf: 0, last: 0 });
  const en = language === "en";

  function castRen() {
    // never repeat the previous result, so every click visibly changes something
    const options = KEYS.filter((k) => k !== type);
    setType(options[Math.floor(Math.random() * options.length)]);
  }

  // Two springs run in one frame loop: the glass chases the pointer (or home), and the water
  // surface is pushed by the glass's acceleration, so it lags, tilts and keeps sloshing after a stop.
  function step(now) {
    const m = sim.current;
    const dt = m.last ? Math.min((now - m.last) / 1000, 0.033) : 1 / 60;
    m.last = now;
    const ax = (m.tx - m.x) * 180 - m.vx * 18;
    const ay = (m.ty - m.y) * 180 - m.vy * 18;
    m.vx += ax * dt;
    m.vy += ay * dt;
    m.x += m.vx * dt;
    m.y += m.vy * dt;
    m.vs += (ax * 0.2 - m.s * 120 - m.vs * 3) * dt;
    m.s = Math.max(-14, Math.min(14, m.s + m.vs * dt));

    const el = stage.current;
    el.style.translate = `${m.x}px ${m.y}px`;
    el.style.rotate = `${m.x / 25}deg`;
    el.style.setProperty("--s", `${m.s}px`);
    el.style.setProperty("--tilt", `${(Math.atan2(2 * m.s, 146) * 180) / Math.PI}deg`);

    const still = [m.tx - m.x, m.ty - m.y, m.vx, m.vy, m.s, m.vs].every((v) => Math.abs(v) < 0.05);
    m.raf = still ? 0 : requestAnimationFrame(step);
    if (still) m.last = 0;
  }

  function wake() {
    if (!sim.current.raf) sim.current.raf = requestAnimationFrame(step);
  }

  useEffect(() => () => cancelAnimationFrame(sim.current.raf), []);

  // Holding the glass is holding Ren: the reaction runs while held, and letting go resets everything.
  function grab(e) {
    if (!e.target.closest(`.${styles.glass}`)) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    from.current = { x: e.clientX - sim.current.tx, y: e.clientY - sim.current.ty };
    setHeld(true);
    castRen();
  }

  function drag(e) {
    if (!from.current) return;
    const clamp = (v, max) => Math.max(-max, Math.min(max, v));
    sim.current.tx = clamp(e.clientX - from.current.x, 220);
    sim.current.ty = clamp(e.clientY - from.current.y, 140);
    wake();
  }

  function release() {
    if (!from.current) return;
    from.current = null;
    sim.current.tx = 0;
    sim.current.ty = 0;
    wake();
    setHeld(false);
    setType(null);
  }

  return (
    <section className={styles.Nen} aria-labelledby="nen-title">
      <div className={styles.text}>
        <h2 id="nen-title" className={styles.title}>
          {en ? "What's your Nen type?" : "Qual é o seu Nen?"}
        </h2>
        <p className={styles.intro}>
          {en
            ? "In Hunter x Hunter, a leaf floating on a glass of water reveals your Nen type when you use Ren. Hold your hands over the glass and try it."
            : "Em Hunter x Hunter, uma folha boiando num copo d'água revela seu tipo de Nen quando você usa Ren. Coloque as mãos sobre o copo e tente."}
        </p>

        <button className={styles.ren} onClick={castRen}>
          {type ? (en ? "Try again" : "Tentar de novo") : en ? "Use Ren" : "Usar Ren"}
        </button>

        <p className={styles.result} aria-live="polite">
          {type && (
            <>
              <strong>{TYPES[type][language][0]}.</strong> {TYPES[type][language][1]}
            </>
          )}
        </p>
      </div>

      {/* the stage stays mounted while dragging; only the glass is re-keyed per result */}
      <div
        className={styles.stage}
        aria-hidden="true"
        ref={stage}
        data-held={held}
        onPointerDown={grab}
        onPointerMove={drag}
        onPointerUp={release}
        onPointerCancel={release}
      >
        {/* key restarts the reaction animation on every new result */}
        <div key={type} className={styles.glass} data-type={type ?? "idle"}>
          <div className={styles.liquid}>
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className={styles.leaf} />
          <div className={styles.spill} />
          <div className={styles.sparkles}>
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}
