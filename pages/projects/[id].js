import { useRouter } from 'next/router';

export default function Project() {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
            <h1>Project</h1>
            <p>Project id: {id}</p>
        </div>
    );
}
