import React, { useState } from 'react';
import Title from '../Title/Title';
import { latestExperiences, oldExperiences } from '../experiences';
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
            <p>(781) 632-5228</p>
            <p>Boston, MA</p>
          </div>
          <div className="skills">
            <Title title="Skills" />
            <ul>
              <li>MERN</li>
              <li>GraphQL</li>
              <li>CI/CD</li>
              <li>AWS architecture</li>
              <li>Agile</li>
            </ul>
          </div>
          <div className="education">
            <Title title="Education" />
            <p>Boston College</p>
            <p>Computer Science, 2014</p>
          </div>
          <p className="footnote">Last updated: 2/4/21 7:21pm</p>
        </div>
        <div className="column right-column">
          <div id="latest-experience">
            <Title title="Experience" />
            {latestExperiences.map((experience, eIndex) => {
              return (
                <>
                  <p>
                    <b>{experience.title}</b>,{' '}
                    {experience.department && `${experience.department}, `}
                    {experience.company}, {experience.length}
                  </p>
                  <ul>
                    {experience.responsibilities.map(
                      (responsibility, rIndex) => {
                        return (
                          <li key={`${eIndex + 1}-${rIndex + 1}`}>
                            {responsibility}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </>
              );
            })}
            <button
              className="experience-toggle"
              onClick={() => toggleOldExperience()}
              type="button"
            >
              {isOldExperienceOpen ? 'Hide' : 'Show'} older experience
            </button>
            <div id="old-experience">
              {oldExperiences.map((experience, eIndex) => {
                return (
                  <>
                    <p>
                      <b>{experience.title}</b>,{' '}
                      {experience.department && `${experience.department}, `}
                      {experience.company}, {experience.length}
                    </p>
                    <ul>
                      {experience.responsibilities.map(
                        (responsibility, rIndex) => {
                          return (
                            <li
                              key={`${latestExperiences.length + eIndex + 1}-${
                                rIndex + 1
                              }`}
                            >
                              {responsibility}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
