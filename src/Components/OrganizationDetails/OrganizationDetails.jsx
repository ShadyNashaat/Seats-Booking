import React, { useContext, useState } from 'react';
import DuckImage from '../../imgs/Duck.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SuperContext } from '../../Context/SuperContext';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner'
import { BsBuildings } from "react-icons/bs";
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useFormik } from 'formik';
import * as Yup from 'yup';

function OrganizationDetails() {
    let superName = localStorage.getItem('supername');
    let params = useParams();
    let navigate = useNavigate();
    let { setSuperToken, setsuperName } = useContext(SuperContext);
    const [editMode, setEditMode] = useState(false);

    const token = localStorage.getItem('superAdminToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    function logout() {
        localStorage.removeItem('superAdminToken');
        localStorage.removeItem('supername');
        setsuperName(null);
        setSuperToken(null);
        navigate('/');
    }


    async function getSpecificOrganization(id) {
        return await axios.get(`https://seated-booking.onrender.com/org/${id}`);
    }
    let { data } = useQuery('getallorganizations', () => getSpecificOrganization(params.id));

    async function getAllVehicles() {
        const token = localStorage.getItem('superAdminToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return await axios.get(`https://seated-booking.onrender.com/vehicles`, config);
    }
    const { data: alvehicles } = useQuery('getAllVehicles', getAllVehicles);
    const totalvehicles = alvehicles?.data.data.filter(trip => trip.Organization_ID._id === data?.data.data._id).length;

    async function getAllBookings() {
        return await axios.get(`https://seated-booking.onrender.com/ticket`);
    }
    const { data: allTikets } = useQuery('getAllBookings', getAllBookings);
    const totaltikets = allTikets?.data.data.filter(trip => trip.Organization_ID === data?.data.data._id).length;


    async function getAllTripsHistory() {
        const token = localStorage.getItem('superAdminToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return await axios.get(`https://seated-booking.onrender.com/ticket/history`, config);

    }
    const { data: alltrips } = useQuery('getAllTripsHistory', getAllTripsHistory);
    const totalTrips = alltrips?.data.data.filter(trip => trip.Organization_ID === data?.data.data._id).length;


    async function getOrgAdmin(id) {
        return await axios.get(`https://seated-booking.onrender.com/users/orgAdmin/${id}`, config);
    }
    let { data: orgAdmin } = useQuery('getOrgAdmin', () => getOrgAdmin(params.id));

    async function updateAdmin(values) {
        try {
            const { data } = await axios.put(`https://seated-booking.onrender.com/users/`,
                values,
                config
            );
            if (data.message === 'success') {
                console.log("success")
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                console.log("fail")

            } else {
                console.log("fail2")

            }
        }
    }

    let validationSchema = Yup.object({
        UserEmail: Yup.string().email('Invalid email address').required('Email is required'),
        OrganizationName: Yup.string().required('Please select an organization name'),
        BusinessUserID: Yup.number().required('Organization ID is required').positive('Organization ID must be a positive number').integer('Organization ID must be an integer'),
        Username: Yup.string().required('Username is required'),
        UserNationalID: Yup.number().required('National ID is required').positive('National ID must be a positive number').integer('National ID must be an integer'),
        UserMobileNumber: Yup.number().required('User Mobile Number is required').integer('User Mobile Number must be an integer'),
    });

    let formik = useFormik({
        initialValues: {
            OrganizationName: '',
            UserStatus: false,
            BusinessUserID: '',
            UserEmail: '',
            Username: '',
            UserNationalID: '',
            UserMobileNumber: '',
        },
        validationSchema,
        onSubmit: updateAdmin
    });

    return <>
        <div className=' homeBg container-fluid'>
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
                                <h6>{superName}</h6>
                            </div>
                        </div>

                        <div className='mt-5'>

                            <div>
                                <CiHome />
                                <Link to="/home" className='text-decoration-none text-dark ms-2'>Home</Link>
                            </div>
                            <div className='mt-3'>
                                <BsBuildings />
                                <Link to="/organizations" className='text-decoration-none text-dark ms-2'>Organizaiton</Link>
                            </div>
                            <div className='mt-3'>
                                <GiRoad />
                                <Link to="/trips" className='text-decoration-none text-dark ms-2'>Trips</Link>
                            </div>
                            <div className='mt-3'>
                                <FaBusAlt />
                                <Link to="/vehicles" className='text-decoration-none text-dark ms-2'>Vehicles</Link>
                            </div>
                            <div className='mt-3'>
                                <LuTicket />
                                <Link to="/bookings" className='text-decoration-none text-dark ms-2'>Bookings</Link>
                            </div>

                        </div>

                        <div className='position-absolute bottom-0 mb-4'>
                            <CiLogout />
                            <span onClick={() => logout()} className='text-decoration-none text-dark ms-2 cursor-pointer'>Logout</span>
                        </div>

                    </div>
                </div>

                <div className='col-md-9 ms-5 mt-5 dashboardBg rounded-3 p-4'>
                    <div className='col-md-4 mx-auto'>
                        <ul class="nav nav-pills mb-3 " id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Organization details</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Admin details</button>
                            </li>
                        </ul>
                    </div>




                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">

                            <span className='fw-bolder'>Organization details</span>

                            <div className="row mt-3">
                                {data?.data.data ? <>
                                    <div className="col-md-2">
                                        <img src={data?.data.data.OrganizationImage} alt="Organization" className='w-100 rounded-circle' />
                                    </div>
                                    <div className='col-md-9 mt-3' >
                                        <div className="d-flex justify-content-between">
                                            <div className='d-flex'>
                                                <h4>{data?.data.data.OrganizationName}</h4>

                                            </div>
                                            <div className='d-flex'>
                                                <div class="dropdown-center">
                                                    <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className='fa-solid fa-plus me-2'></i>Add
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><Link class="dropdown-item" to="/newadmin">Admin</Link></li>
                                                        <li><Link class="dropdown-item" to="/newtrip">Trip</Link></li>
                                                        <li><Link class="dropdown-item" to="/newvehicle">Vehicle</Link></li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="d-flex mt-4">
                                            <div className='col-md-3 '>
                                                <div className='d-flex '>
                                                    <div className='me-1'>
                                                        <div className='rounded-5 widt blueBg d-flex justify-content-center'>
                                                            <div className="ft-size"><FaBusAlt /></div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className='mb-0'>Total Vehicles</p>
                                                        <p><b>{totalvehicles}</b></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-md-3'>
                                                <div className='d-flex'>
                                                    <div className='me-1'>
                                                        <div className='rounded-5 widt pinkBg d-flex justify-content-center'>
                                                            <div className='ft-size'><GiRoad /></div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className='mb-0'>Total Trips</p>
                                                        <p><b>{totalTrips}</b> </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-md-3'>
                                                <div className='d-flex'>
                                                    <div className='me-1'>
                                                        <div className='rounded-5 widt yellowBg d-flex justify-content-center'>
                                                            <div className='ft-size'> <LuTicket /></div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className='mb-0'>Total Bookings</p>
                                                        <p><b>{totaltikets}</b></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className='mt-5 ms-3 mb-4'>Recent trips</h5>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Trip ID</th>
                                                <th scope="col">Organization</th>
                                                <th scope="col">Boarding governrate</th>
                                                <th scope="col">Destination governrate</th>
                                                <th scope="col">Start time</th>
                                                <th scope="col">End time</th>
                                                <th scope="col">Vehicle ID</th>
                                                <th scope="col">Seat_Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {alltrips?.data.data && Array.isArray(alltrips?.data.data) && alltrips?.data.data.map((orgs) => (
                                                orgs.Organization_ID === data?.data.data._id && (
                                                    <tr key={orgs._id}>
                                                        <th scope="row">{orgs.Trip_ID.Trip_ID}</th>
                                                        <td>{orgs.Trip_ID?.Organization_ID?.OrganizationName}</td>
                                                        <td>{orgs.Trip_ID?.Boarding_Station?.Governorate_Name}</td>
                                                        <td>{orgs.Trip_ID?.Destination_Station?.Governorate_Name}</td>
                                                        <td>{orgs.Trip_ID.Trip_Start_Date}</td>
                                                        <td>{orgs.Trip_ID.Trip_End_Date}</td>
                                                        <td>{orgs.Trip_ID.Vehicle_ID}</td>
                                                        <td>{orgs.Seat_Number?.Seat_Price}</td>
                                                    </tr>
                                                )
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                                    : <div className='w-100 py-5 d-flex justify-content-center'>
                                        <BallTriangle
                                            height={100}
                                            width={100}
                                            radius={5}
                                            color="#4fa94d"
                                            ariaLabel="ball-triangle-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}
                                        />
                                    </div>}


                            </div>
                        </div>




                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                            <div>
                                <h4>Admin details</h4>
                                <div className='position-absolute le'>
                                    <button type="button" className="btn btn-light ms-2 border-1 border-black" onClick={() => setEditMode(!editMode)}>
                                        {editMode ? 'Cancel' : 'Edit Details'}
                                    </button>
                                </div>

                                <div className="row mt-5">
                                    <div className="col-md-3">
                                        <div>
                                            <label htmlFor="" className='form-label'>Organization's Name</label>
                                            <input value={data?.data.data.OrganizationName} disabled={!editMode} onChange={formik.handleChange} type="text" name="OrganizationName" placeholder='Enter organization name' className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div>
                                            <label htmlFor="" className='form-label'>Vehicle Status</label>
                                            <div className='d-flex justify-content-between bg-white form-control'>
                                                <h6>{orgAdmin?.data.data.UserStatus ? 'Active' : 'Inactive'}</h6>
                                                <div className="form-check form-switch">
                                                    <input value={orgAdmin?.data.data.UserStatus} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled={!editMode} checked={orgAdmin?.data.data.UserStatus} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-5">
                                    <div className="col-md-3">
                                        <div>
                                            <label htmlFor="" className='form-label'>Business user ID</label>
                                            <input value={orgAdmin?.data.data.BusinessUserID} disabled={!editMode} type="number" placeholder='Enter the business user ID' className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div>
                                            <label htmlFor="" className='form-label'>Permission ID</label>
                                            <input value={orgAdmin?.data.data.PermissionID} disabled={!editMode} type="text" placeholder='Enter Permission ID' className='form-control' />
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-5">
                                    <div className="col-md-4">
                                        <div>
                                            <label htmlFor="" className='form-label'>The organization's admin ID</label>
                                            <input value={orgAdmin?.data.data.OrgAdminID} disabled={!editMode} type="text" placeholder='Enter the admin ID' className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div>
                                            <label htmlFor="" className='form-label'>Admin's Email</label>
                                            <input value={orgAdmin?.data.data.UserEmail} disabled={!editMode} type="email" placeholder='Enter the admin email' className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div>
                                            <label htmlFor="" className='form-label'>Admin Username</label>
                                            <input value={orgAdmin?.data.data.Username} disabled={!editMode} type="text" placeholder='Enter the admin username' className='form-control' />
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-5">
                                    <div className="col-md-4">
                                        <div>
                                            <label htmlFor="" className='form-label'>National ID</label>
                                            <input value={orgAdmin?.data.data.UserNationalID} disabled={!editMode} type="number" placeholder='Enter the admin national ID' className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div>
                                            <label htmlFor="" className='form-label'>Mobile Number</label>
                                            <input value={orgAdmin?.data.data.UserMobileNumber} disabled={!editMode} type="number" placeholder='Enter the admin Mobile Number' className='form-control' />
                                        </div>
                                    </div>
                                </div>
                                {editMode && (
                                    <div className="row mt-3">
                                        <div className="col-md-3">
                                            <button className="btn btn-primary" onClick={() => updateAdmin(formik.values)}>
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default OrganizationDetails;