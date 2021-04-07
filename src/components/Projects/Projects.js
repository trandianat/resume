import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import './Projects.scss';

const Projects = () => {
    return (
        <div className="projects">
            <p>In progress</p>
            <AmplifySignOut />
        </div>
    );
};

export default withAuthenticator(Projects);