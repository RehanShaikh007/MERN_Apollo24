import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];
  
  const navigateTo = useNavigate();

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "https://mern-apollo24-1.onrender.com/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const validateForm = () => {
    // Name validation
    if (firstName.length < 2 || lastName.length < 2) {
      toast.error("First and last name must be at least 2 characters long");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Phone validation
    if (phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return false;
    }

    // Aadhar validation
    if (aadhar.length !== 12) {
      toast.error("Aadhar number must be exactly 12 digits");
      return false;
    }

    // Date validations
    const today = new Date();
    const birthDate = new Date(dob);
    const appointmentDay = new Date(appointmentDate);

    if (birthDate >= today) {
      toast.error("Date of birth cannot be in the future");
      return false;
    }

    if (appointmentDay <= today) {
      toast.error("Appointment date must be in the future");
      return false;
    }

    // Address validation
    if (address.length < 10) {
      toast.error("Please provide a complete address (minimum 10 characters)");
      return false;
    }

    return true;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setPhone(value);
    } else {
      toast.warn("Phone number cannot be more than 10 digits");
    }
  };

  const handleAadharChange = (e) => {
    const value = e.target.value;
    if (value.length <= 12) {
      setAadhar(value);
    } else {
      toast.warn("Aadhar number cannot be more than 12 digits");
    }
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      // Check if all required fields are filled
      if (!firstName || !lastName || !email || !phone || !aadhar || !dob || 
          !gender || !appointmentDate || !department || !doctorFirstName || 
          !doctorLastName || !address) {
        toast.error("Please fill in all required fields!");
        return;
      }

      // Validate form data
      if (!validateForm()) {
        return;
      }

      const appointmentData = {
        firstName,
        lastName,
        email,
        phone,
        aadhar,
        dob,
        gender,
        appointment_date: appointmentDate,
        department,
        doctor_firstName: doctorFirstName,
        doctor_lastName: doctorLastName,
        hasVisited,
        address,
      };

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        appointmentData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json", },
        }
      );
      toast.success(data.message);
      navigateTo("/my-appointments");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAadhar("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while booking the appointment");
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              required
              onChange={handlePhoneChange}
              min="0"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Aadhar"
              value={aadhar}
              required
              onChange={handleAadharChange}
              min="0"
            />
            <input 
              type="date"
              placeholder="Date of Birth"
              value={dob}
              required
              onChange={(e) => setDob(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              required
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <select
              value={department}
              required
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
              }}
            >
              <option value="">Select Department</option>
              {departmentsArray.map((depart, index) => (
                <option value={depart} key={index}>
                  {depart}
                </option>
              ))}
            </select>
            <select
              value={`${doctorFirstName} ${doctorLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
              }}
              disabled={!department}
              required
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter(doctor => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    Dr. {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
              display: "flex",
              alignItems: "center"
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px", cursor: "pointer" }}
            />
          </div>
          <button type="submit" style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
