import { Cairn } from '../hunt'
import { Rich } from '../components/Rich'
import { copy, techStack } from '../content'

export function TechStack() {
  return (
    <section className="waypoint" aria-labelledby="tech-title">
      <header className="waypoint-head">
        <span className="mile">{copy.tech.label}</span>
        <h1 id="tech-title" className="page-title">
          <Rich text={copy.tech.title} />
        </h1>
        <p>{copy.tech.intro}</p>
      </header>
      <div className="pack">
        {techStack.map((g, i) => (
          <section key={g.group} className="pack-group">
            <h2>
              <span aria-hidden="true">{g.emoji}</span> {g.group}
            </h2>
            {g.note && <p className="pack-note">{g.note}</p>}
            <ul className="badge-list">
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            {i === 2 && <Cairn id="tech-pack" variant="subtle" style={{ right: '1rem', bottom: '0.8rem' }} />}
          </section>
        ))}
      </div>
    </section>
  )
}
