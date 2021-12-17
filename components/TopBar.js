import styles from '../styles/TopBar.module.scss'
export const TopBar = () => (
  <div className={styles.TopBar}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <g transform="rotate(45 5.382 14.736)">
            <path stroke="#4C4C4C" d="M.506.501h11v11h-11z" />
            <ellipse
              fill="#4C4C4C"
              style={{
                mixBlendMode: "multiply",
              }}
              cx={8.199}
              cy={8.215}
              rx={4.515}
              ry={4.5}
            />
            <path stroke="#4C4C4C" d="M4.749 4.743h11v11h-11z" />
            <path
              stroke="#4C4C4C"
              strokeLinejoin="bevel"
              d="M5.113 5.108.535.53M15.72 15.714l-4.243-4.242"
            />
          </g>
          <path stroke="#4C4C4C" strokeLinecap="square" d="M20 9.5v5M4 9.5v5" />
        </g>
      </svg>
    <a href={"https://www.lucaslorenzo.digital"} target="_blank" rel="noreferrer">by Lucas Lorenzo Pe&ntilde;a</a>
  </div>
)
