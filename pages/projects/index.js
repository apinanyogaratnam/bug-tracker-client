import Link from 'next/link';
import useProjects from '../../components/hooks/useProjects';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Dialog from '../../components/Dialog';
import styles from '../../styles/Projects.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../redux/slices/userSlice';
import { useUser as useAuth0User } from '@auth0/nextjs-auth0';
import useUser from '../../components/hooks/useUser';

export default function Projects() {
    const { user_id } = useSelector(state => state.user);
    const { projects, loading } = useProjects(user_id);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dispatch = useDispatch();

    const { user: auth0User, error } = useAuth0User();
    const { fetchedUser: user } = useUser(auth0User);

    const closeDialog = () => {
        setIsDialogOpen(false);
    }

    if (user && user != {} && !user_id) {
        dispatch(setUserId(user.internal_user_id));
    }

    if (!projects) return <p>Currently experiencing issues. Please check again soon.</p>;

    return (
        <div className={styles['main-container']}>
            <h1>Projects</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Dialog isOpened={isDialogOpen} closeDialog={closeDialog} user_id={user_id} />
                    <div className={styles['projects-container']}>
                        {projects.map((project, index) => (
                            <div key={index} className={styles['project-container']}>
                                <Link href={`/projects/${project.project_id}`}>
                                    <button>
                                        <div>
                                            <h2 className={styles['project-name']}>{project.name}</h2>
                                            <p>{project.description}</p>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        ))}
                        <button className={styles['new-project-container']} onClick={() => setIsDialogOpen(!isDialogOpen)}>
                            <AiOutlinePlusCircle className={styles['plus-icon']} />
                            <h4>Create Project</h4>
                        </button>
                    </div>
                </div>
            )}
            <a href="/api/auth/logout">Logout</a>
        </div>
    );
}
