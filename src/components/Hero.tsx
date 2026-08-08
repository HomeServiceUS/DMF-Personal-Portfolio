import { profile, stats } from '../data'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__content reveal">
        <p className="hero__eyebrow">
          <span className="hero__status" /> Available for new projects
        </p>
        <h1 className="hero__title">
          Hi, I&apos;m {profile.name.split(' ')[0]}.
          <br />
          <span className="hero__gradient">{profile.role}</span>
        </h1>
        <p className="hero__lede">{profile.tagline}</p>

        <div className="hero__actions">
          <a className="btn btn--primary" href="#work">
            View my work
          </a>
          <a className="btn btn--ghost" href="#contact">
            Get in touch
          </a>
        </div>

        <dl className="hero__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="hero__stat">
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
