import { useRouter } from 'next/router';
import useProject from '../../components/hooks/useProject';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

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

    const [cards, updateCards] = useState(exampleCards);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(cards);
        const [reorderItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderItem);

        updateCards(items);
    };

    return (
        <div>
            <h1>Project</h1>
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
                    <div>
                        <h3>TODO:</h3>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="cards">
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                                        {cards.map((card, index) => (
                                            <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                                                {(provided) => (
                                                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <div style={{backgroundColor: 'steelblue'}}>
                                                            <p>{card.title}</p>
                                                        </div>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    <div>
                        IN PROGRESS:
                    </div>
                    <div>
                        DONE:
                    </div>
                </div>
                </>
            )}
        </div>
    );
}
