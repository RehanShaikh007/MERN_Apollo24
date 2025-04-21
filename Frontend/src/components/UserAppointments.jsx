import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const UserAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const { isAuthenticated } = useContext(Context);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:4000/api/v1/user/patient/appointments",
                    { withCredentials: true }
                );
                setAppointments(data.appointments);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchAppointments();
    }, []);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'Accepted':
                return 'status-accepted';
            case 'Pending':
                return 'status-pending';
            case 'Rejected':
                return 'status-rejected';
            default:
                return '';
        }
    };

    const getStatusMessage = (status) => {
        switch (status) {
            case 'Accepted':
                return (
                    <div className="reminder-text accepted-message">
                        Please arrive 15 minutes before your appointment time
                    </div>
                );
            case 'Pending':
                return (
                    <div className="reminder-text pending-message">
                        Your appointment is under review. We will notify you once it's confirmed
                    </div>
                );
            case 'Rejected':
                return (
                    <div className="reminder-text rejected-message">
                        We're sorry, this appointment couldn't be accommodated.
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className='container appointments'>
            <h1>My Appointments</h1>
            <div className="banner">
                {appointments && appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <div className="card" key={appointment._id}>
                            <div className="details">
                                <p>
                                    <strong>Doctor:</strong> 
                                    <span>Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}</span>
                                </p>
                                <p>
                                    <strong>Department:</strong> 
                                    <span>{appointment.department}</span>
                                </p>
                                <p>
                                    <strong>Date:</strong> 
                                    <span>{new Date(appointment.appointment_date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </p>
                                <p>
                                    <strong>Status:</strong> 
                                    <span className={getStatusClass(appointment.status)}>
                                        {appointment.status}
                                    </span>
                                </p>
                                {getStatusMessage(appointment.status)}
                            </div>
                        </div>
                    ))
                ) : (
                    <h3>No Appointments Found!</h3>
                )}
            </div>
        </section>
    );
};

export default UserAppointments; 