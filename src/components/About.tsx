import { profile, skills } from '../data'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section__head reveal">
        <span className="section__kicker">01 — About</span>
        <h2 className="section__title">A bit about me</h2>
      </div>

      <div className="about__grid">
        <p className="about__bio reveal">{profile.about}</p>

        <div className="about__skills">
          {skills.map((group) => (
            <div key={group.category} className="skill-card reveal">
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
