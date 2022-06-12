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

    const item2 = {
        id: v4(),
        name: 'an item',
    }

    const [cards, updateCards] = useState(exampleCards);
    const [state, setState] = useState({
        "todo": {
            "title": "To Do",
            "items": [item],
        },
        "inProgress": {
            "title": "In Progress",
            "items": [item2],
        },
        "done": {
            "title": "Done",
            "items": [],
        },
    });

    const handleOnDragEnd = ({ destination, source }) => {
        if (!destination) return;
        if (destination.index === source.index && destination.droppableId === source.droppableId) return;
        const itemCopy = {...state[source.droppableId].items[source.index]};
        setState(prev => {
            prev = {...prev};
            prev[source.droppableId].items.splice(source.index, 1);
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);
            return prev;
        })
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
                                                <div className={styles['column-container']} key={key}>
                                                    <h3>{data.title}</h3>
                                                    <Droppable droppableId={key}>
                                                        {(provided) => (
                                                            <div className={styles['droppable-column']} ref={provided.innerRef } {...provided.droppableProps}>
                                                                {data.items.map((el, index) => {
                                                                    return (
                                                                        <Draggable key={el.id} index={index} draggableId={el.id}>
                                                                            {(provided) => {
                                                                                return (
                                                                                    <div className={styles['column-item']} ref={provided.innerRef} {...provided.draggableProps}>
                                                                                        <div>{el.name}</div>
                                                                                        <div {...provided.dragHandleProps}>⁝⁝</div>
                                                                                    </div>
                                                                                )
                                                                            }}
                                                                        </Draggable>
                                                                    )
                                                                })}
                                                                {provided.placeholder}
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
