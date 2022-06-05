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
                <ul>
                    {projects.map((project, index) => (
                        <div key={index}>
                            <li>
                                <Link href="/projects/[project_id]" as={`/projects/${project.id}`}>
                                    <a>{project.name}</a>
                                </Link>
                            </li>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}
