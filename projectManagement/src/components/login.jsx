import { useForm, Controller } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';  
import { login as loginAction, updateName, updatePassword } from "../store/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: { username: "", password: "" }
    });

    const onSubmit = (data) => {
        dispatch(updateName(data.username));
        dispatch(updatePassword(data.password));
        dispatch(loginAction());
        navigate('/projects');
    };

    // עיצוב אחיד לכל השדות
    const commonStyle = {
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#fefae0',
        padding: '1rem',
        width: '100%',
    };

    return (
        <div className="flex min-h-screen w-screen m-0 p-0" 
             style={{ 
                 backgroundImage: 'linear-gradient(to left, rgba(40, 54, 24, 0.8), rgba(40, 54, 24, 0.4)), url("/745205069564995779.jpg")',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundAttachment: 'fixed',
                 position: 'fixed', top: 0, left: 0, direction: 'rtl'
             }}>
            
            <div className="flex flex-column justify-content-center p-6 md:p-8 w-full md:w-5">
                
                <div className="mb-6">
                    <h1 className="text-6xl font-black mb-2" style={{ color: '#fefae0' }}>כניסה.</h1>
                    <p className="text-xl opacity-80" style={{ color: '#fefae0' }}>הזן את הפרטים שלך כדי לגשת לפרויקטים.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-4 w-full" style={{ maxWidth: '350px' }}>
                    
                    {/* שם משתמש */}
                    <div className="flex flex-column gap-2">
                        <label className="text-sm font-bold" style={{ color: '#dda15e' }}>שם משתמש</label>
                        <InputText 
                            {...register("username", { required: "שדה חובה" })} 
                            placeholder="YOUR NAME"
                            style={commonStyle}
                            /* שימוש ב-PrimeReact PT כדי לשנות את ה-placeholder */
                            pt={{
                                root: { className: 'custom-placeholder' }
                            }}
                        />
                    </div>

                    {/* סיסמה */}
                    <div className="flex flex-column gap-2">
                        <label className="text-sm font-bold" style={{ color: '#dda15e' }}>סיסמה</label>
                        <Controller 
                            name="password" 
                            control={control} 
                            rules={{ required: "שדה חובה" }}
                            render={({ field }) => (
                                <Password 
                                    {...field} 
                                    toggleMask={false} 
                                    feedback={false} 
                                    placeholder="YOUR PASSWORD"
                                    inputStyle={commonStyle}
                                    style={{ width: '100%' }}
                                    /* ביטול העין והתאמת רוחב מלאה */
                                />
                            )}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        label="התחבר עכשיו" 
                        className="p-3 mt-4 font-bold border-none shadow-4 border-round-pill"
                        style={{ backgroundColor: '#bc6c25', color: '#fefae0' }}
                    />
                </form>
            </div>

            {/* הערה לגבי ה-Placeholder: 
                כדי לשנות צבע פלייסהולדר ב-PrimeReact ללא CSS בכלל, 
                הדרך הכי "נקייה" היא להוסיף שורה אחת ב-index.css של הפרויקט.
                אם את מתעקשת לא לגעת ב-CSS, נשתמש ב-Inline Style פשוט ב-main.jsx או כאן.
            */}
            <style>{`
                ::placeholder { color: #2b2b29 !important; opacity: 1; }
                input:focus { border-color: #dda15e !important; box-shadow: 0 0 0 2px rgba(221, 161, 94, 0.2) !important; outline: none; }
            `}</style>
        </div>
    );
};

export default Login;