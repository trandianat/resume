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
            <Link className="projects-button" to={`${url}/notes`}>
                <Button label="Notes" />
            </Link>
            <Link className="projects-button" to={`${url}/detection`}>
                <Button label="Detection" />
            </Link>
            <Link className="projects-button" to={`${url}/chatbot`}>
                <Button label="Chatbot" />
            </Link>
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