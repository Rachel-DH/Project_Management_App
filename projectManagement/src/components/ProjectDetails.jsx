import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { deleteTask, updateTask } from "../store/taskSlice";

const ProjectDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const tasksList = useSelector(state => state.tasks.list || []);
    const filteredTasks = tasksList.filter(task => task.idProject === id.toString());
    const statuses = ["To Do", "In Progress", "In Review", "Done"];
    const priorityOptions = [
        { label: 'High', value: 3 },
        { label: 'Medium', value: 2 },
        { label: 'Low', value: 1 }
    ];
    const [editTaskId, setEditTaskId] = useState(null);
    const [mode, setMode] = useState('');
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedDueDate, setUpdatedDueDate] = useState('');
    const [updatedPriority, setUpdatedPriority] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState('');
    const statusTheme = {

        "To Do": "#64748b", "In Progress": "#bc6c25", "In Review": "#606c38", "Done": "#2e7d32"

    };

    const handleSave = (taskId) => {
        const taskToUpdate = {
            id: taskId,
            title: updatedTitle,
            description: updatedDescription,
            dueDate: updatedDueDate,
            priority: updatedPriority,
            status: updatedStatus,
            idProject: id
        };
        dispatch(updateTask(taskToUpdate));
        setEditTaskId(null);
        setMode('');
    };

    const handleDelete = (taskId) => {
        if (window.confirm("למחוק את המשימה לצמיתות?")) {
            dispatch(deleteTask(taskId));
        }
    };

    return (
        <div className="h-screen w-screen overflow-hidden m-0 p-0"
            style={{
                backgroundImage: 'linear-gradient(to bottom, rgba(40, 54, 24, 0.94), rgba(40, 54, 24, 0.88)), url("/745205069564995779.jpg")',
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', direction: 'rtl'
            }}>
            <div className="flex justify-content-between align-items-center mb-3 px-3">
                <div className="flex align-items-center gap-3">
                    <Button icon="pi pi-arrow-right" className="p-button-rounded p-button-text text-white bg-white-alpha-10" onClick={() => navigate('/projects')} />
                    <h1 className="text-4xl font-black m-0 text-white">לוח משימות</h1>
                </div>
                <Button label="משימה חדשה" icon="pi pi-plus" className="p-button-md border-round-pill border-none shadow-6" style={{ backgroundColor: '#bc6c25', color: '#fefae0' }} onClick={() => navigate(`/project/${id}/add-task`)} />
            </div>
            <div className="flex flex-wrap gap-2 px-2 justify-content-center h-full pb-4" style={{ alignItems: 'start', paddingTop: '1rem' }}>
                {statuses.map(status => (
                    <div key={status} className="flex-1 min-w-18rem max-w-22rem">
                        <div className="flex flex-column shadow-8 h-full" style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', borderTop: `6px solid ${statusTheme[status]}`, maxHeight: 'calc(100vh - 8rem)' }}>
                            <div className="p-3 flex justify-content-between align-items-center bg-white-alpha-5">
                                <span className="text-lg font-bold text-white uppercase">{status}</span>
                                <Badge value={filteredTasks.filter(t => t.status === status).length} style={{ background: statusTheme[status] }}></Badge>
                            </div>
                            <div className="p-3 overflow-y-auto flex-grow-1">
                                {filteredTasks.filter(t => t.status === status).map(task => (
                                    <Card key={task.id} className="mb-3 border-none shadow-3" style={{ background: 'rgba(254, 250, 224, 0.98)', borderRadius: '12px' }}>
                                        {editTaskId === task.id ? (
                                            <div className="flex flex-column gap-4 mt-2" style={{ direction: 'rtl', textAlign: 'right' }}>
                                                {mode === 'edit' ? (
                                                    <>
                                                        <FloatLabel>
                                                            <InputText value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} className="w-full text-right" />
                                                            <label style={{ right: '0.5rem', left: 'auto' }}>כותרת</label>
                                                        </FloatLabel>
                                                        <FloatLabel>
                                                            <InputText value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} className="w-full text-right" />
                                                            <label style={{ right: '0.5rem', left: 'auto' }}>תיאור</label>
                                                        </FloatLabel>
                                                        <Dropdown value={updatedPriority} options={priorityOptions} onChange={(e) => setUpdatedPriority(e.value)} placeholder="עדיפות" className="w-full text-right" />
                                                        <Calendar value={updatedDueDate ? new Date(updatedDueDate.split('.').reverse().join('-')) : null} onChange={(e) => setUpdatedDueDate(e.value.toLocaleDateString('he-IL'))} dateFormat="dd.mm.yy" className="w-full" />
                                                    </>
                                                ) : (
                                                    <Dropdown value={updatedStatus} options={statuses} onChange={(e) => setUpdatedStatus(e.value)} placeholder="בחר סטטוס חדש" className="w-full text-right" />
                                                )}
                                                <div className="flex gap-2 mt-2">
                                                    <Button label="שמור" icon="pi pi-check" className="p-button-sm flex-grow-1"
                                                        style={{ backgroundColor: '#283618', borderColor: '#283618', color: '#fefae0' }}
                                                        onClick={() => handleSave(task.id)}
                                                    />
                                                    <Button label="ביטול" icon="pi pi-times" className="p-button-sm p-button-text text-700" onClick={() => setEditTaskId(null)} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-column gap-2" style={{ textAlign: 'right' }}>
                                                <div className="flex justify-content-between align-items-start">
                                                    <span className="font-bold text-900" style={{ color: '#283618', fontSize: '1.1rem' }}>{task.title}</span>
                                                    <div className="flex gap-1">
                                                        <Button icon="pi pi-pencil" className="p-button-text p-button-rounded p-0 w-2rem h-2rem text-blue-600"
                                                            onClick={() => {
                                                                setEditTaskId(task.id); setMode('edit');
                                                                setUpdatedTitle(task.title); setUpdatedDescription(task.description);
                                                                setUpdatedDueDate(task.dueDate); setUpdatedPriority(task.priority); setUpdatedStatus(task.status);
                                                            }}
                                                        />
                                                        <Button icon="pi pi-trash" className="p-button-text p-button-rounded p-0 w-2rem h-2rem text-red-600"
                                                            onClick={() => handleDelete(task.id)}
                                                        />
                                                    </div>
                                                </div>
                                                <p className="text-sm text-700 m-0 line-height-3">{task.description}</p>
                                                <div className="flex justify-content-between align-items-center mt-3 pt-2 border-top-1 border-200">
                                                    <Badge value={task.dueDate} style={{ background: '#dda15e', color: '#283618' }} />
                                                    <Button label="העבר שלב" icon="pi pi-sync" className="p-button-text p-0 text-xs font-bold" style={{ color: '#bc6c25' }}
                                                        onClick={() => {
                                                            setEditTaskId(task.id); setMode('status');
                                                            setUpdatedStatus(task.status); setUpdatedTitle(task.title); setUpdatedDescription(task.description);
                                                            setUpdatedDueDate(task.dueDate); setUpdatedPriority(task.priority);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectDetails;