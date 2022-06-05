import { useRouter } from 'next/router';
import useProject from '../../components/hooks/useProject';

export default function Project() {
    const router = useRouter();
    const { id } = router.query;
    const { project, loading } = useProject(id);

    return (
        <div>
            <h1>Project</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>Id: {project.project_id}</p>
                    <p>Name: {project.name}</p>
                    <p>Description: {project.description}</p>
                    <p>User id: {project.user_id}</p>
                    <p>Administrator_id: {project.administrator_id}</p>
                    <p>Co Administrator Ids: {project.co_administrator_ids}</p>
                    <p>Member Ids: {project.member_ids}</p>
                    <p>Created at: {new Date(project.created_at * 1000).toLocaleDateString()}</p>
                    {console.log(project)}
                </div>
            )}
        </div>
    );
}
