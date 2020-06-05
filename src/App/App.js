import React from 'react';
import Title from '../Title/Title';
import experiences from '../experiences';
import './App.scss';

const App = () => {
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
              <li>AWS architecture</li>
              <li>Agile</li>
            </ul>
          </div>
          <div className="education">
            <Title title="Education" />
            <p>Boston College</p>
            <p>Computer Science, 2014</p>
          </div>
        </div>
        <div className="column right-column">
          <div className="experience">
            <Title title="Experience" />
            {experiences.map((experience, eIndex) => {
              return (<><p>{experience.title}, {experience.department ? `${experience.department}, ` : null}{experience.company}, {experience.length}</p>
                <ul>
                  {experience.responsibilities.map((responsibility, rIndex) => {
                    const key = `${eIndex + 1}-${rIndex + 1}`;
                    console.log('key', key);
                    return (<li key={key}>{responsibility}</li>);
                  })}
                </ul>
              </>);
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
