import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import Button from 'components/Button';
import Chatbot from 'components/Chatbot';
import Detection from 'components/Detection';
import Notes from 'components/Notes';
import Title from 'components/Title';
import './Projects.scss';

const Projects = () => {
    let { path, url } = useRouteMatch();
    return (
        <div className="projects">
            <AmplifySignOut />
            <Title title="Projects" />
            <div className="projects-container">
                <div className="projects-link">
                    <Link to={`${url}/notes`}>
                        <Button className="projects-button" label="Notes" />
                    </Link>
                </div>
                <div className="projects-link">
                    <Link to={`${url}/detection`}>
                        <Button className="projects-button" label="Detection" />
                    </Link>
                </div>
                <div className="projects-link">
                    <Link to={`${url}/chatbot`}>
                        <Button className="projects-button" label="Chatbot" />
                    </Link>
                </div>
            </div>
            <Switch>
                <Route path={`${path}/notes`}>
                    <Notes />
                </Route>
                <Route path={`${path}/detection`}>
                    <Detection />
                </Route>
                <Route path={`${path}/chatbot`}>
                    <Chatbot />
                </Route>
            </Switch>
        </div>
    );
};

export default withAuthenticator(Projects);