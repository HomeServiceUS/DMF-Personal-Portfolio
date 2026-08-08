import { experience } from '../data'

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="section__head reveal">
        <span className="section__kicker">03 — Experience</span>
        <h2 className="section__title">Where I&apos;ve worked</h2>
      </div>

      <ol className="timeline">
        {experience.map((item) => (
          <li key={`${item.company}-${item.period}`} className="timeline__item reveal">
            <div className="timeline__dot" aria-hidden="true" />
            <div className="timeline__body">
              <div className="timeline__row">
                <h3 className="timeline__role">{item.role}</h3>
                <span className="timeline__period">{item.period}</span>
              </div>
              <p className="timeline__company">{item.company}</p>
              <p className="timeline__summary">{item.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
