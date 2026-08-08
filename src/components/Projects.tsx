import { projects } from '../data'

export default function Projects() {
  return (
    <section id="work" className="section projects">
      <div className="section__head reveal">
        <span className="section__kicker">02 — Selected work</span>
        <h2 className="section__title">Things I&apos;ve built</h2>
      </div>

      <div className="projects__grid">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className="project-card reveal"
            style={{ ['--accent' as string]: project.accent }}
          >
            <div className="project-card__glow" aria-hidden="true" />
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__desc">{project.description}</p>
            <ul className="project-card__tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <span className="project-card__link">
              View project <span aria-hidden="true">→</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
