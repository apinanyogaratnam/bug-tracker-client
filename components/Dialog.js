import styles from '../styles/Dialog.module.css';
import { useState } from 'react';

export default function Dialog({isOpened = false, closeDialog}) {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

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
                            <button onClick={closeDialogInner}>Submit</button>
                        </form>
                        <button onClick={closeDialogInner}>Close</button>
                    </dialog>
                </div>
            )}
        </div>
    );
}
