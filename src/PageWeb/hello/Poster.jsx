import styles from "./poster.module.css";

// Palette strip at the bottom of the poster: the Open Bahia colours
const SWATCHES = ["#0f3b59", "#88b8ce", "#eebb48", "#a13a1e", "#3f1d12"];

// Tilt toward the cursor; the photo moves a bit further than the frame for depth
function tilt(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--ry", `${x * 14}deg`);
  el.style.setProperty("--rx", `${-y * 14}deg`);
  el.style.setProperty("--px", `${x * -18}px`);
  el.style.setProperty("--py", `${y * -12}px`);
}

function untilt(e) {
  for (const prop of ["--rx", "--ry", "--px", "--py"]) e.currentTarget.style.removeProperty(prop);
}

// A poster in the style of the minimalist Hunter x Hunter print, with Alexandre in place of the cast
export default function Poster() {
  return (
    <div className={styles.wall}>
      <figure className={styles.poster} onMouseMove={tilt} onMouseLeave={untilt}>
        <div className={styles.paper}>
          <div className={styles.top}>
            <p className={styles.logo} aria-hidden="true">
              <span>Alexandre</span>
              <span className={styles.flip}>Farias</span>
            </p>
            <span className={styles.series}>Alexandre × Farias</span>
          </div>

          <div className={styles.sub}>
            <span lang="ja">アレクサンドル × ファリアス</span>
            <span className={styles.year}>2025</span>
          </div>

          <div className={styles.panel}>
            <img src="/poster-photo.webp" alt="Alexandre Farias" width="600" height="1067" />
          </div>

          <div className={styles.swatches} aria-hidden="true">
            {SWATCHES.map((c) => (
              <span key={c} style={{ background: c }} />
            ))}
          </div>

          <figcaption className={styles.credit}>
            <span>
              Created by
              <strong>Alexandre Farias</strong>
            </span>
            <span className={styles.mark} aria-hidden="true">
              AF
            </span>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}
