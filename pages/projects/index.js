import Link from 'next/link';
import useProjects from '../../components/hooks/useProjects';
import { useState } from 'react';
import Dialog from '../../components/Dialog';

export default function Projects() {
    const { projects, loading } = useProjects(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const closeDialog = () => {
        setIsDialogOpen(false);
    }

    return (
        <div>
            <h1>Projects</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Dialog isOpened={isDialogOpen} closeDialog={closeDialog} />
                    <button onClick={() => setIsDialogOpen(!isDialogOpen)}>
                        New Project
                    </button>
                    {projects.map((project, index) => (
                        <div key={index}>
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
                </div>
            )}
        </div>
    );
}
