import { useRouter } from 'next/router';
import useProject from '../../components/hooks/useProject';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import styles from '../../styles/Project.module.css';
import _ from 'lodash';
import { v4 } from 'uuid';

export default function Project() {
    const router = useRouter();
    const { id } = router.query;
    const { project, loading } = useProject(id);

    const exampleCards = [
        {
            id: 1,
            title: 'Bug 1',
        },
        {
            id: 2,
            title: 'Bug 2',
        },
        {
            id: 3,
            title: 'Bug 3',
        },
    ]

    const item = {
        id: v4(),
        name: 'an item',
    }

    const [cards, updateCards] = useState(exampleCards);
    const [state, setState] = useState({
        "todo": {
            "title": "To Do",
            "items": [],
        },
        "inProgress": {
            "title": "In Progress",
            "items": [],
        },
        "done": {
            "title": "Done",
            "items": [],
        },
    });

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(cards);
        const [reorderItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderItem);

        updateCards(items);
    };

    if (!project) return <p>Currently experiencing issues. Please check again soon.</p>;

    return (
        <div>
            { project.length === 0 ? <p>Project Does not Exist</p> : (
                <div>
                    <h1>Project</h1>
                    <div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                            <div>
                                <p>Id: {project.project_id}</p>
                                <p>Name: {project.name}</p>
                                <p>Description: {project.description}</p>
                                <p>User id: {project.user_id}</p>
                                <p>Administrator_id: {project.administrator_id}</p>
                                <p>Co Administrator Ids: {project.co_administrator_ids}</p>
                                <p>Member Ids: {project.member_ids}</p>
                                <p>Created at: {new Date(project.created_at * 1000).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <DragDropContext onDragEnd={handleOnDragEnd}>
                                    <div className={styles['columns-container']}>
                                        {_.map(state, (data, key) => {
                                            console.log(data);
                                            return (
                                                <div key={key}>
                                                    <h3>{data.title}</h3>
                                                    <Droppable droppableId={key}>
                                                        {(provided) => (
                                                            <div className={styles['droppable-column']} ref={provided.innerRef } {...provided.droppableProps}>

                                                            </div>
                                                        )}
                                                    </Droppable>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </DragDropContext>
                            </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
