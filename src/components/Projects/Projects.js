import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
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
            [<Link to={`${url}/notes`}>Notes</Link>]
            [<Link to={`${url}/detection`}>Detection</Link>]
            [<Link to={`${url}/chatbot`}>Chatbot</Link>]
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