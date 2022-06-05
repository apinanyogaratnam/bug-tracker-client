import Link from 'next/link';
import useProjects from '../../components/hooks/useProjects';

export default function Projects() {
    const { projects, loading } = useProjects(1);
    return (
        <div>
            <h1>Projects</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
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
                    <button>
                        New Project
                    </button>
                </div>
            )}
        </div>
    );
}
