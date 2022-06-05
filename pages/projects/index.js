import Link from 'next/link';
import useProjects from '../../components/hooks/useProjects';
import { useState } from 'react';
import Dialog from '../../components/Dialog';
import styles from '../../styles/Projects.module.css';

export default function Projects() {
    const { projects, loading } = useProjects(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const closeDialog = () => {
        setIsDialogOpen(false);
    }

    return (
        <div className={styles['main-container']}>
            <h1>Projects</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Dialog isOpened={isDialogOpen} closeDialog={closeDialog} />
                    <div className={styles['projects-container']}>
                        {projects.map((project, index) => (
                            <div key={index} className={styles['project-container']}>
                                <Link href={`/projects/${project.project_id}`}>
                                    <button>
                                        <div>
                                            <h2>{project.name}</h2>
                                            <p>{project.description}</p>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        ))}
                        <button className={styles['project-container']} onClick={() => setIsDialogOpen(!isDialogOpen)}>
                            New Project
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
