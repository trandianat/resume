import React, { useState } from 'react';
import Title from '../Title';
import { latestExperiences, oldExperiences, skills } from '../../constants';
import './App.scss';

const App = () => {
  const [isOldExperienceOpen, setIsOldExperienceOpen] = useState(false);

  const toggleOldExperience = () => {
    const oldExperience = document.getElementById('old-experience');
    if (oldExperience.style.display === 'none') {
      oldExperience.style.display = 'block';
      setIsOldExperienceOpen(true);
    } else {
      oldExperience.style.display = 'none';
      setIsOldExperienceOpen(false);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Diana Tran</h1>
        <h2>Software Engineer</h2>
      </div>
      <div className="column-container">
        <div className="column left-column">
          <div className="contact">
            <Title title="Contact" />
            <p>trandianat@gmail.com</p>
            <p>Boston, MA</p>
          </div>
          <div className="skills">
            <Title title="Skills" />
            <ul>
              {skills.map((skill, sIndex) => (
                <li key={`skill-${sIndex + 1}`}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="education">
            <Title title="Education" />
            <p>Boston College</p>
            <p>Computer Science, 2014</p>
          </div>
          <p className="footnote">Last updated: 3/12/21 2:42pm</p>
        </div>
        <div className="column right-column">
          <div id="latest-experience">
            <Title title="Experience" />
            {latestExperiences.map((experience, eIndex) => (
              <>
                <p>
                  <b>{experience.title}</b>,{' '}
                  {experience.department && `${experience.department}, `}
                  {experience.company}, {experience.length}
                </p>
                <ul>
                  {experience.responsibilities.map((responsibility, rIndex) => (
                    <li key={`experience-${eIndex + 1}-${rIndex + 1}`}>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </>
            ))}
            <button
              className="experience-toggle"
              onClick={() => toggleOldExperience()}
              type="button"
            >
              {isOldExperienceOpen ? 'Hide' : 'Show'} older experience
            </button>
            <div id="old-experience">
              {oldExperiences.map((experience, eIndex) => (
                <>
                  <p>
                    <b>{experience.title}</b>,{' '}
                    {experience.department && `${experience.department}, `}
                    {experience.company}, {experience.length}
                  </p>
                  <ul>
                    {experience.responsibilities.map(
                      (responsibility, rIndex) => (
                        <li
                          key={`experience-${
                            latestExperiences.length + eIndex + 1
                          }-${rIndex + 1}`}
                        >
                          {responsibility}
                        </li>
                      )
                    )}
                  </ul>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
