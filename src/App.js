import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="app">
      <div className="header">
        <h1>Diana Tran</h1>
        <h2>Software Engineer</h2>
      </div>
      <div className="column-container">
        <div className="column left-column">
          <div className="contact">
            <h2>Contact</h2>
            <p>trandianat@gmail.com</p>
            <p>(781) 632-5228</p>
            <p>Boston, MA</p>
          </div>
          <div className="skills">
            <h2>Skills</h2>
            <ul>
              <li>MERN</li>
              <li>AWS architecture</li>
              <li>Agile</li>
            </ul>
          </div>
          <div className="education">
            <h2>Education</h2>
            <p>Boston College</p>
            <p>Computer Science, 2014</p>
          </div>
        </div>
        <div className="column right-column">
          <div className="experience">
            <h2>Experience</h2>
            <p>Senior Software Engineer, U.S. Consumer Markets, Marketing, Digital & Distribution, Direct Sales, Oct '19 - Present</p>
            <ul>
              <li>Developed and supported the auto sales applications for Liberty Mutual</li>
              <li>Created an API via AWS CDK to support state-specific requirements</li>
            </ul>
            <p>Senior Software Developer, U.S. Consumer Markets, Marketing, Digital & Distribution, Direct Claims, Oct '17 - Oct '19</p>
            <ul>
              <li>Developed and supported the claim filing applications for Liberty Mutual and Safeco</li>
              <li>Expanded the claim filing applications beyond first-party customers</li>
            </ul>
            <p>Software Developer, U.S. Consumer Markets, Financial Services, Sales Compensation, Aug '16 - Sep '17</p>
            <ul>
              <li>Pioneered initiative within business unit to migrate legacy systems to a cloud native architecture </li>
              <li>Documented requirements and implement application functionality accordingly</li>
            </ul>
            <p>Software Developer, Global Specialty, Liberty Specialty Markets, Reinsurance, Feb '16 - Jul '16</p>
            <ul>
              <li>Supported development of claims, underwriting, and contact management applications</li>
              <li>Contribute to architecture, design, security, and testing of the three applications</li>
            </ul>
            <p>IT Analyst II, U.S. Consumer Markets, Publishing & Document Management, Feb '15 - Feb '16</p>
            <ul>
              <li>Led decision-making on the architecture and design of a document repository application</li>
              <li>Mentored teammates on technical design, execution, and implementation as Technical Lead</li>
            </ul>
            <p>IT Analyst, Commercial Insurance, LMS, Reporting, Planning & Analytics, Jun '14 - Feb '15</p>
            <ul>
              <li>Attended and observed core trainings and milestone events of ongoing lean transformations</li>
              <li>Performed user acceptance testing and produced reports on LMS reporting application</li>
            </ul>
            <p>Operations Intern, Community Economic Development Assistance Corporation, Jun '13 - May '14</p>
            <ul>
              <li>Updated and managed CEDAC's three websites, emails, and contact management system</li>
              <li>Processed, peer-reviewed, and sent financial audit confirmations</li>
            </ul>
            <p>Communications & Marketing Intern, Community Boating, Inc., Jul '13 - Aug '13</p>
            <ul>
              <li>Designed advertisements, event invitations, and website content</li>
              <li>Drafted and peer-reviewed biweekly emails sent via Constant Contact</li>
            </ul>
            <p>Undergraduate Research Assistant, Boston College, Jun '11 - Dec '11</p>
            <ul>
              <li>Designed course websites on Boston College's content management system for "Japanese Cultural Icons through Modern Times" and "Europe in the World I"</li>
              <li>Managed "China Gateway", an informational website for Chinese history students</li>
            </ul>
            <p>Student Mentor, College Application Education Project, Inc., Jun '09 - Aug '09</p>
            <ul>
              <li>Counseled low-income high school students on the college admissions process</li>
              <li>Researched potential sponsors and wrote letters requesting grants and/or loans</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
