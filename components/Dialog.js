import styles from '../styles/Dialog.module.css';
import { Children, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProjects } from '../redux/slices/projectsSlice';

export default function Dialog({isOpened = false, closeDialog, children}) {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    return (
        <div>
            { isOpened && (
                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                }}>
                    {children}
                </div>
            )}
        </div>
    );
}
