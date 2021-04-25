import React, { useState } from 'react';
import Button from 'components/Button';
import Title from 'components/Title';
import { latestExperiences, oldExperiences, primarySkills, familiarSkills } from './ResumeContent';
import './Resume.scss';

const Resume = () => {
  const [isOldExperienceOpen, setIsOldExperienceOpen] = useState(false);

  const toggleOldExperience = () => {
    const oldExperience = document.getElementById('old-experience');
    if (
      !oldExperience.style.display ||
      oldExperience.style.display === 'none'
    ) {
      oldExperience.style.display = 'block';
      setIsOldExperienceOpen(true);
    } else {
      oldExperience.style.display = 'none';
      setIsOldExperienceOpen(false);
    }
  };

  const formatExperienceDetails = experience => (
    <>
      <p className="experience-title">
        <b>{experience.title}</b>
      </p>
      <p>
        {experience.company}
        {experience.department && `, ${experience.department}`}
      </p>
      <p>
        <i>{experience.length}</i>
      </p>
    </>
  );

  return (
    <div className="resume">
      <div className="column-container">
        <div className="column left-column">
          <Title title="Summary" />
          <p>Detail-oriented software engineer with six years of experience in collaborating with business, technology, and UX partners to develop customer-centric solutions</p>
          <div className="resume-email">
            <a href="mailto:trandianat@gmail.com">trandianat@gmail.com</a>
          </div>
          <Title title="Skills" />
          <div className="resume-skills-container">
            <div className="resume-skills">
              <p>
                <i>Primarily used</i>:
              </p>
              <ul>
                {primarySkills.map((skill, sIndex) => (
                  <li key={`primary-skill-${sIndex + 1}`}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="resume-skills">
              <p>
                <i>Familiar with</i>:
              </p>
              <ul>
                {familiarSkills.map((skill, sIndex) => (
                  <li key={`familiar-skill-${sIndex + 1}`}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
          <Title title="Education" />
          <p>Boston College</p>
          <p>Computer Science, 2014</p>
        </div>
        <div className="column right-column">
          <Title title="Experience" />
          {latestExperiences.map((experience, eIndex) => (
            <>
              {formatExperienceDetails(experience)}
              <ul>
              {experience.responsibilities.map((responsibility, rIndex) => (
                <li key={`experience-${eIndex + 1}-${rIndex + 1}`}>
                  {responsibility}
                </li>
              ))}
              </ul>
            </>
          ))}
          <Button
            label={`${isOldExperienceOpen ? 'Hide' : 'Show'} older experience`}
            onClick={() => toggleOldExperience()}
          />
          <div id="old-experience">
            {oldExperiences.map((experience, eIndex) => (
              <>
              {formatExperienceDetails(experience)}
              <ul>
                {experience.responsibilities.map((responsibility, rIndex) => (
                <li key={`experience-${latestExperiences.length + eIndex + 1}-${rIndex + 1}`}>
                  {responsibility}
                </li>
                ))}
              </ul>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;