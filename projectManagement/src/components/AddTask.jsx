import React, { useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createTask } from '../store/taskSlice';

export default function AddTask() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const toast = useRef(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            priority: null,
            dueDate: null
        }
    });

    const priorityOptions = [
        { name: 'Low', value: 1 },
        { name: 'Medium', value: 2 },
        { name: 'High', value: 3 }
    ];

    const onSubmit = (data) => {
        dispatch(createTask({
            title: data.title,
            description: data.description,
            priority: data.priority,
            dueDate: data.dueDate ? data.dueDate.toLocaleDateString('he-IL') : null,
            idProject: id.toString()
        }));

        toast.current.show({
            severity: 'success',
            summary: 'בוצע בהצלחה',
            detail: 'המשימה נוספה ללוח',
            life: 1500
        });

        setTimeout(() => {
            navigate(`/project/${id}`);
        }, 1500);
    };

    const validateDate = (value) => {
        if (!value) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return value >= today || "לא ניתן לבחור תאריך שעבר";
    };

    const inputStyle = {
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#fefae0',
        padding: '1rem',
        width: '100%'
    };

    return (
        <div className="flex align-items-center justify-content-center min-h-screen w-screen m-0 p-4"
             style={{
                 backgroundImage: 'linear-gradient(to bottom, rgba(40, 54, 24, 0.92), rgba(40, 54, 24, 0.85)), url("/745205069564995779.jpg")',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 direction: 'rtl'
             }}>
            
            <Toast ref={toast} />

            <Card className="shadow-8 border-round-xl overflow-hidden" 
                  style={{ 
                      maxWidth: '500px', 
                      width: '100%', 
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                
                <div className="mb-5 text-center">
                    <span className="block text-sm font-bold mb-1" style={{ color: '#dda15e' }}>BOARD UPDATES</span>
                    <h1 className="text-4xl font-black m-0 text-white">משימה חדשה.</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-4">
                    
                    <div className="flex flex-column gap-2">
                        <FloatLabel>
                            <InputText 
                                id="title" 
                                {...register("title", { required: "חובה להזין שם משימה" })} 
                                className={`w-full ${errors.title ? 'p-invalid' : ''}`}
                                style={inputStyle}
                            />
                            <label htmlFor="title" style={{ color: '#fefae0', opacity: 0.7 }}>מה צריך לעשות?</label>
                        </FloatLabel>
                        {errors.title && <small className="p-error mr-2">{errors.title.message}</small>}
                    </div>

                    <div className="flex flex-column gap-2">
                        <FloatLabel>
                            <InputText 
                                id="description" 
                                {...register("description", { required: "חובה להזין תיאור" })} 
                                className={`w-full ${errors.description ? 'p-invalid' : ''}`}
                                style={inputStyle}
                            />
                            <label htmlFor="description" style={{ color: '#fefae0', opacity: 0.7 }}>פירוט המשימה</label>
                        </FloatLabel>
                        {errors.description && <small className="p-error mr-2">{errors.description.message}</small>}
                    </div>

                    <div className="flex flex-column gap-2">
                        <FloatLabel>
                            <Controller
                                name="priority"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Dropdown
                                        id={field.name}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        options={priorityOptions}
                                        optionLabel="name"
                                        optionValue="value"
                                        className={`w-full ${fieldState.invalid ? 'p-invalid' : ''}`}
                                        style={inputStyle}
                                        pt={{
                                            root: { className: 'flex align-items-center' },
                                            input: { style: { color: '#fefae0', padding: '0' } },
                                            trigger: { className: 'text-white' },
                                            item: { className: 'hover:bg-primary-reverse' }
                                        }}
                                    />
                                )}
                            />
                            <label htmlFor="priority" style={{ color: '#fefae0', opacity: 0.7 }}>רמת דחיפות</label>
                        </FloatLabel>
                        {errors.priority && <small className="p-error mr-2">{errors.priority.message}</small>}
                    </div>

                    <div className="flex flex-column gap-2">
                        <FloatLabel>
                            <Controller
                                name="dueDate"
                                control={control}
                                rules={{ validate: validateDate }}
                                render={({ field, fieldState }) => (
                                    <Calendar
                                        id={field.name}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        dateFormat="dd/mm/yy"
                                        showIcon
                                        minDate={new Date()}
                                        className={`w-full ${fieldState.invalid ? 'p-invalid' : ''}`}
                                        inputStyle={inputStyle}
                                    />
                                )}
                            />
                            <label htmlFor="dueDate" style={{ color: '#fefae0', opacity: 0.7 }}>תאריך יעד לסיום</label>
                        </FloatLabel>
                        {errors.dueDate && <small className="p-error mr-2">{errors.dueDate.message}</small>}
                    </div>

                    <div className="flex flex-column gap-3 mt-4">
                        <Button 
                            type="submit" 
                            label="הוסף ללוח" 
                            icon="pi pi-plus-circle" 
                            className="p-3 font-bold border-none shadow-4 border-round-lg"
                            style={{ backgroundColor: '#606c38', color: '#fefae0' }}
                        />
                       <Button
  type="button"
  label="חזור להצגת הפרויקט"
  icon="pi pi-times"
  className="p-button-outlined p-button-secondary text-white border-round-lg shadow-2"
  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
  onClick={() => navigate(`/project/${id}`)}
/>
                    </div>
                </form>
            </Card>

            <style>{`
                .p-float-label label { right: 1rem; left: auto; transition: all 0.2s; }
                .p-dropdown-panel { background: #283618 !important; border: 1px solid #bc6c25 !important; }
                .p-dropdown-item { color: #fefae0 !important; }
                .p-dropdown-item:hover { background: rgba(188, 108, 37, 0.3) !important; }
                .p-datepicker { background: #283618 !important; border: 1px solid #bc6c25 !important; color: #fefae0 !important; }
                .p-calendar .p-button { background: #606c38 !important; border: none !important; border-radius: 0 12px 12px 0 !important; }
                .p-inputtext:focus { border-color: #dda15e !important; box-shadow: 0 0 0 2px rgba(221, 161, 94, 0.2) !important; }
                .p-placeholder { color: rgba(254, 250, 224, 0.4) !important; }
            `}</style>
        </div>
    );
}