import Link from 'next/link';
import useProjects from '../../components/hooks/useProjects';
import { useState } from 'react';

export default function Projects() {
    const { projects, loading } = useProjects(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <div>
            <h1>Projects</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    { isDialogOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.5)',
                            }}>
                                <dialog
                                    style={{
                                        zIndex: '1',
                                    }} open={isDialogOpen}>
                                    <form>
                                        <label>
                                            Name:
                                            <input type="text" />
                                        </label>
                                        <label>
                                            Description:
                                            <input type="text" />
                                        </label>
                                        <button>Submit</button>
                                    </form>
                                </dialog>
                            </div>
                        )
                    }
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
                            <button onClick={() => setIsDialogOpen(!isDialogOpen)}>
                                New Project
                            </button>
                </div>
            )}
        </div>
    );
}
