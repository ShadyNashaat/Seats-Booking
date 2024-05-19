import React, { useContext, useState } from 'react';
import DuckImage from '../../imgs/Duck.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useFormik } from 'formik';
import { AdminContext } from '../../Context/AdminContext';

function NewVehicleOrgAdmin() {
    const { setAdminOrganizationId, setAdminName, setAdminToken } = useContext(AdminContext);
    let adminname = localStorage.getItem('adminName');
    const token = localStorage.getItem('orgAdminToken');
    let [isLoading, SetisLoading] = useState(false);
    let [error, seterror] = useState(null);
    let [added, setadded] = useState(null); const navigate = useNavigate();

    
    async function newVehicle(values) {
        SetisLoading(true);
        try {
            let { data } = await axios.post(
                `https://seated-booking.onrender.com/vehicles`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (data.message === 'Success') {
                setadded("Vehicle Added successfully")
                SetisLoading(false);

            }
        } catch (error) {
            seterror("Error, I can't add this Vehicle.")
            SetisLoading(false);

        }
    }

    function logout() {
        localStorage.removeItem('orgAdminToken');
        localStorage.removeItem('adminOrganizationId');
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminToken');
        setAdminToken(null);
        setAdminOrganizationId(null);
        setAdminName(null);
        navigate('/');
    }

    const formik = useFormik({
        initialValues: {
            Vehicle_Name: '',
            Vehicle_Description: '',
            Vehicle_Type: '',
            Vehicle_Class: ''
        },
        onSubmit: newVehicle
    });

    return <>
        <div className='homeBg container-fluid'>
            <div className='row pb-3'>

                <div className='col-md-2 ms-4 mt-5 position-relative'>
                    <div>
                        <div className="d-flex align-items-center ms-2">
                            <h4 className='text-white p me-2'>P</h4>
                            <h5 className='text-black'>Travel</h5>
                            <h5 className='text-white'>Pro</h5>
                        </div>

                        <div className='d-flex mt-5'>
                            <div>
                                <img src={DuckImage} alt="Duck" />
                            </div>
                            <div className='align-self-center'>
                                <h4>Duck UI</h4>
                                <h6>{adminname}</h6>
                            </div>
                        </div>

                        <div className='mt-5'>

                            <div>
                                <CiHome />
                                <Link to="/homeorgadmin" className='text-decoration-none text-dark ms-2'>Home</Link>
                            </div>

                            <div className='mt-3'>
                                <GiRoad />
                                <Link to="/tripsorgadmin" className='text-decoration-none text-dark ms-2'>Trips</Link>
                            </div>
                            <div className='mt-3'>
                                <FaBusAlt />
                                <Link to="/allvehiclesorgadmin" className='text-decoration-none text-dark ms-2'>Vehicles</Link>
                            </div>
                            <div className='mt-3'>
                                <LuTicket />
                                <Link to="/bookingsorgadmin" className='text-decoration-none text-dark ms-2'>Bookings</Link>
                            </div>

                        </div>

                        <div className='position-absolute bottom-0 mb-4'>
                            <CiLogout />
                            <span onClick={() => logout()} className='text-decoration-none text-dark ms-2 cursor-pointer'>Logout</span>
                        </div>

                    </div>
                </div>


                <div className='col-md-9 ms-5 mt-5 dashboardBg rounded-3 p-4'>

                    <div>
                        <h4>New Vehicle</h4>
                        {added !== null ? <div className="alert alert-success">{added}</div> : ''}
                        {error !== null ? <div className="alert alert-danger">{error}</div> : ''}
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="Vehicle_Type" className='form-label'>Vehicle Type</label>
                                        <input value={formik.values.Vehicle_Type} onChange={formik.handleChange} onBlur={formik.handleBlur} name="Vehicle_Type" id="Vehicle_Type" type="text" placeholder='Enter vehicle type' className='form-control' />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="Vehicle_Name" className='form-label'>Vehicle Name</label>
                                        <input value={formik.values.Vehicle_Name} onChange={formik.handleChange} onBlur={formik.handleBlur} name="Vehicle_Name" id="Vehicle_Name" type="text" placeholder='Enter the vehicle name' className='form-control' />
                                    </div>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <label htmlFor="Vehicle_Class" className='form-label'>Vehicle Class</label>
                                <input value={formik.values.Vehicle_Class} onChange={formik.handleChange} onBlur={formik.handleBlur} name="Vehicle_Class" id="Vehicle_Class" type="text" placeholder='Enter the vehicle class' className='form-control' />
                            </div>

                            <div className='mt-5'>
                                <label htmlFor="Vehicle_Description" className='form-label'>Vehicle description</label>
                                <input value={formik.values.Vehicle_Description} onChange={formik.handleChange} onBlur={formik.handleBlur} name="Vehicle_Description" id="Vehicle_Description" type="text" placeholder='Enter the vehicle description' className='form-control' />
                            </div>

                            {isLoading ? <button className='btn btn-primary mb-5 d-flex ms-auto mt-5' type="button">
                                <BallTriangle
                                    height={30}
                                    width={70}
                                    radius={5}
                                    color="white"
                                    ariaLabel="ball-triangle-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </button> :
                                <button type='submit' className='btn btn-primary mb-5 d-flex ms-auto mt-5'>Add vehicle</button>

                            }
                        </form>

                    </div>

                </div>

            </div>
        </div>
    </>
}

export default NewVehicleOrgAdmin;