import { useRouter } from 'next/router';
import useProject from '../../components/hooks/useProject';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import styles from '../../styles/Project.module.css';
import _, { set } from 'lodash';
import { v4 } from 'uuid';
import Dialog from '../../components/Dialog';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setColumns, setColumnId } from '../../redux/slices/projectSlice';

export default function Project() {
    const router = useRouter();
    const { id } = router.query;
    const { project, loading } = useProject(id);
    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const [isCreateColumnDialogOpened, setIsCreateColumnDialogOpened] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [columnName, setColumnName] = useState('');
    const dispatch = useDispatch();
    const { columns, column_id } = useSelector(state => state.project);
    const [state, setState] = useState({});
    const [openedColumnKey, setOpenedColumnKey] = useState(null);

    const handleOnDragEnd = ({ destination, source }) => {
        if (!destination) return;
        if (destination.index === source.index && destination.droppableId === source.droppableId) return;
        const itemCopy = {...state[source.droppableId].items[source.index]};

        let prev = structuredClone(state);
        prev[source.droppableId].items.splice(source.index, 1);
        prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);

        setState(prev);

        updateItemChange(prev);
    };

    const updateItemChange = async (raw_columns) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            const { data } = await axios.patch(`${API_URL}/column/${column_id}`, raw_columns);
            dispatch(setColumns(data.raw_columns));
        } catch (error) {
            console.log(error);
        }
    }

    const closeDialog = () => {
        setTaskName('');
        setTaskDescription('');
        setIsDialogOpened(false);
    }

    const openDialog = (key) => {
        setOpenedColumnKey(key);
        setIsDialogOpened(true);
    }

    const closeCreateColumnDialog = () => {
        setColumnName('');
        setIsCreateColumnDialogOpened(false);
    }

    const openCreateColumnDialog = () => {
        setIsCreateColumnDialogOpened(true);
    }

    const createNewColumn = async (column_id) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            const { data } = await axios.put(`${API_URL}/column/${column_id}`, {
                column_name: columnName,
            });
            dispatch(setColumns(data.raw_columns));
        } catch (error) {
            console.log(error);
            alert('Error creating column');
        }
        closeCreateColumnDialog();
    }

    const createNewTask = async (column_id, column_column_id) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
            const { data } = await axios.put(`${API_URL}/column/${column_id}/${column_column_id}`, {
                name: taskName,
                description: taskDescription,
            });
            dispatch(setColumns(data.raw_columns));
        } catch (error) {
            console.log(error);
            alert('Error creating task');
        }
        closeDialog();
    }

    useEffect(() => {
        const getColumns = async () => {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            try {
                const { data } = await axios.get(`${API_URL}/columns?project_id=${id}`);
                dispatch(setColumns(data));
                dispatch(setColumnId(data[0].column_id));
            } catch (error) {
                console.log(error);
            }
        }
        getColumns();
        if (columns[0]) setState(columns[0].raw_columns);
    }, [dispatch, id]);

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
                            <Dialog isOpened={isCreateColumnDialogOpened} closeDialog={closeCreateColumnDialog}>
                                <div className={styles['create-column-dialog']}>
                                    <input type="text" value={columnName} onChange={(e) => setColumnName(e.target.value)} />
                                    <button onClick={() => createNewColumn(column_id)}>Create</button>
                                    <button onClick={closeCreateColumnDialog}>Close</button>
                                </div>
                            </Dialog>
                            <button onClick={openCreateColumnDialog}>
                                New Column
                                <AiOutlinePlusCircle />
                            </button>
                            <div>
                                <DragDropContext onDragEnd={handleOnDragEnd}>
                                    <div className={styles['columns-container']}>
                                        {_.map(state, (data, key) => {
                                            return (
                                                <div className={styles['column-container']} key={key}>
                                                    <h3>{data.name}</h3>
                                                    <Droppable droppableId={key}>
                                                        {(provided) => (
                                                            <div className={styles['droppable-column']} ref={provided.innerRef } {...provided.droppableProps}>
                                                                {data.items.map((el, index) => {
                                                                    let draggableId = `${key}-${index}-${el.id}`;
                                                                    return (
                                                                        <Draggable key={el.id} index={index} draggableId={draggableId}>
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
                                                                <Dialog isOpened={isDialogOpened} closeDialog={closeDialog}>
                                                                    <div className={styles['create-task-dialog']}>
                                                                        <p>Add a new item</p>
                                                                        <input value={taskName} type="text" onChange={(e) => setTaskName(e.target.value)} />
                                                                        <input value={taskDescription} type="text" onChange={(e) => setTaskDescription(e.target.value)} />
                                                                        <button onClick={() => createNewTask(column_id, openedColumnKey)}>Add</button>
                                                                        <button onClick={closeDialog}>close</button>
                                                                    </div>
                                                                </Dialog>
                                                                <button className={styles['add-task']} onClick={() => openDialog(key)}>
                                                                    <AiOutlinePlusCircle />
                                                                </button>
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
