import { Cairn } from '../hunt'
import { Rich } from '../components/Rich'
import { caseStudies, copy, profile, techStack } from '../content'

export function Home() {
  const c = copy.home
  const [first, last] = profile.name.split(' ')
  return (
    <>
      <section className="hero hero-home">
        <div className="hero-copy" style={{ position: 'relative' }}>
          <p className="eyebrow">
            <span className="pin" aria-hidden="true" /> {c.eyebrow}
          </p>
          <h1>
            {first}
            <br />
            <span>{last}</span>
          </h1>
          <p className="tagline tagline-wide">
            <Rich text={c.title} />
          </p>
          <p className="intro">{c.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-solid" href="#/work">
              {c.workLabel}
            </a>
            <a className="btn btn-ghost" href="#/about">
              {c.aboutLabel}
            </a>
          </div>
          <ul className="tags" aria-label="Quick facts">
            <li>{profile.degree}</li>
            <li>{profile.role}</li>
          </ul>
          <Cairn id="home-hero" variant="obvious" style={{ right: '4%', bottom: '-1.2rem' }} />
        </div>
      </section>

      <section className="waypoint" aria-labelledby="featured-title">
        <header className="waypoint-head">
          <span className="mile">{c.featuredLabel}</span>
          <h2 id="featured-title">
            <Rich text={c.featuredTitle} />
          </h2>
          <p>{c.featuredIntro}</p>
        </header>
        <div className="card-grid">
          {caseStudies.map((s, i) => (
            <a key={s.id} className="case-card" href={`#/work?tab=cases&open=${s.id}`}>
              <span className="case-company">{s.company}</span>
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
              <span className="case-stat">
                <b>{s.stat}</b> {s.statLabel}
              </span>
              <span className="case-go">Read the story →</span>
              {i === 1 && <Cairn id="home-card" variant="hover" style={{ top: '0.6rem', right: '0.6rem' }} />}
            </a>
          ))}
        </div>
      </section>

      <section className="waypoint" aria-labelledby="more-title">
        <header className="waypoint-head">
          <span className="mile">{copy.home.moreLabel}</span>
          <h2 id="more-title">
            <Rich text={c.moreTitle} />
          </h2>
          <p>{c.moreIntro}</p>
        </header>
        <div className="card-grid four">
          <a className="mini-card" href="#/work?tab=elearning">
            <span aria-hidden="true">💻</span>
            <b>eLearning</b>
            <small>Courses built in Articulate</small>
          </a>
          <a className="mini-card" href="#/work?tab=videos">
            <span aria-hidden="true">🎬</span>
            <b>Videos</b>
            <small>Instructional and onboarding</small>
          </a>
          <a className="mini-card" href="#/work?tab=guides">
            <span aria-hidden="true">📖</span>
            <b>Guides</b>
            <small>Articles and documentation</small>
          </a>
          <a className="mini-card" href="#/tech-stack">
            <span aria-hidden="true">🎒</span>
            <b>Tech stack</b>
            <small>{techStack.reduce((n, g) => n + g.items.length, 0)} tools and counting</small>
          </a>
        </div>
      </section>
    </>
  )
}
