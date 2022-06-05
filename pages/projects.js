import Link from 'next/link';
import useProjects from '../components/hooks/useProjects';

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
                            <Link href="/projects/[project_id]" as={`/projects/${project.id}`}>
                                <button>{project.name}</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
