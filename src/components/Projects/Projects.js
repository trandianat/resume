import React, { useEffect, useState } from 'react';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Button from '../Button';
import Title from '../Title';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../../graphql/mutations';
import { listNotes } from '../../graphql/queries';
import './Projects.scss';

const initialFormState = { name: '', description: '' };

const Projects = () => {
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const apiData = await API.graphql({ query: listNotes });
        const notesFromAPI = apiData.data.listNotes.items;
        await Promise.all(notesFromAPI.map(async note => {
            if (note.image) {
              const image = await Storage.get(note.image);
              note.image = image;
            }
            return note;
        }))
        setNotes(apiData.data.listNotes.items);
    }

    const createNote = async () => {
        if (!formData.name || !formData.description) return;
        await API.graphql({ query: createNoteMutation, variables: { input: formData } });
        if (formData.image) {
            const image = await Storage.get(formData.image);
            formData.image = image;
        }
        setNotes([ ...notes, formData ]);
        setFormData(initialFormState);
    }

    const deleteNote = async ({ id }) => {
        const newNotesArray = notes.filter(note => note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
    }

    const onChange = async (e) => {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        setFormData({ ...formData, image: file.name });
        await Storage.put(file.name, file);
        fetchNotes();
    }

    return (
        <div className="projects">
            <AmplifySignOut />
            <div className="note-container">
                <div className="note-add">
                    <Title title="Add notes" />
                    <input
                        className="note-name"
                        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                        placeholder="Note name"
                        value={formData.name}
                    />
                    <textarea
                        maxLength={100}
                        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                        placeholder="Note description"
                        value={formData.description}
                    />
                    <input className="note-image-upload" type="file" onChange={onChange} />
                    <Button label="Submit note" onClick={createNote} variant="primary" />
                </div>
                {notes.length > 0 && (
                    <div className="note-all">
                        <Title title="All notes" />
                        <table>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Delete</th>
                            </tr>
                            {notes.map((note, index) => (
                                <tr>
                                    <td className="note-cell">{ note.image && <img alt="note" src={note.image} /> }</td>
                                    <td>{note.name}</td>
                                    <td>{note.description}</td>
                                    <td className="note-cell"><Button label="X" onClick={() => deleteNote(note)} /></td>
                                </tr>
                            ))}
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default withAuthenticator(Projects);