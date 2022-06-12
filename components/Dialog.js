import styles from '../styles/Dialog.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProjects } from '../redux/slices/projectsSlice';

export default function Dialog({isOpened = false, closeDialog, user_id}) {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const dispatch = useDispatch();

    const createProject = async (user_id) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        try {
            const { data } = await axios.post(`${API_URL}/projects`, {
                name: projectName,
                description: projectDescription,
                user_id: user_id,
            });
            dispatch(setProjects(data));
        } catch (error) {
            console.log(error);
            alert('Error creating project');
            setProjectName('');
            setProjectDescription('');
        }
    }

    const createProjectSubmit = (e) => {
        e.preventDefault();
        createProject(user_id);
        closeDialog();
    }

    const closeDialogInner = () => {
        closeDialog();
        setProjectName('');
        setProjectDescription('');
    }

    return (
        <div>
            { isOpened && (
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                }}>
                    <dialog
                        className={styles.dialog}
                        style={{
                            zIndex: '1',
                        }} open={isOpened}>
                        <form className={styles.form}>
                            <input className={styles.input} type="text" placeholder="Project Name" value={projectName} onChange={(event) => setProjectName(event.target.value)} />
                            <input className={styles.input} type="text" placeholder="Description" value={projectDescription} onChange={(event) => setProjectDescription(event.target.value)}/>
                            <button onClick={createProjectSubmit}>Submit</button>
                        </form>
                        <button onClick={closeDialogInner}>Close</button>
                    </dialog>
                </div>
            )}
        </div>
    );
}
