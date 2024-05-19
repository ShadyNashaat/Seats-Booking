import React, { useContext } from 'react';
import DuckImage from '../../imgs/Duck.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { SuperContext } from '../../Context/SuperContext';
import { BsBuildings } from "react-icons/bs";
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import axios from 'axios';

function VehicleDetails() {
    let navigate = useNavigate();
    let superName = localStorage.getItem('supername');

    let { setSuperToken, setsuperName } = useContext(SuperContext);
    function logout() {
        localStorage.removeItem('superAdminToken');
        localStorage.removeItem('supername');
        setsuperName(null);
        setSuperToken(null);
        navigate('/');
    }
    let params = useParams();

    function getVehicleId(id) {
        return axios.get(`https://seated-booking.onrender.com/vehicles/${id}`);
    }
    let { data } = useQuery('getAllVehicles', () => getVehicleId(params.id));

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
                                <img src={DuckImage} alt="Duck Image" />
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

                <div className='col-md-9 ms-5 my-5 dashboardBg rounded-3 p-4'>

                    <div>
                        <h4 className='mb-5'>Vehicle details</h4>
                        {data?.data.data ? <>
                            <div className="row my-5">
                                <div className="col-md-3">
                                    <div>
                                        <label htmlFor="" className='form-label'>Organization's Name</label>
                                        <input value={data?.data.data.Organization_ID.OrganizationName} type="text" placeholder='Enter organization name' className='form-control' disabled />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div>
                                        <label htmlFor="" className='form-label'>Vehicle Status</label>
                                        <div className='d-flex justify-content-between bg-white form-control'>
                                            <h6>{data?.data.data.Active_Vehicle ? 'Active' : 'Inactive'}</h6>
                                            <div class="form-check form-switch">
                                                <input value={data?.data.data.Active_Vehicle} class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled checked={data?.data.data.Active_Vehicle} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row my-5">
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="" className='form-label'>Vehicle ID</label>
                                        <input value={data?.data.data.Vehicle_ID} type="number" placeholder='Enter the vehicle ID' className='form-control' disabled />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="" className='form-label'>Vehicle Type</label>
                                        <input value={data?.data.data.Vehicle_Type} type="text" placeholder='Enter vehicle type' className='form-control' disabled />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="" className='form-label'>Vehicle Name</label>
                                        <input value={data?.data.data.Vehicle_Name} type="text" placeholder='Enter the vehicle name' className='form-control' disabled />
                                    </div>
                                </div>
                            </div>

                            <div className='my-5'>
                                <label htmlFor="" className='form-label'>Vehicle Class</label>
                                <input value={data?.data.data.Vehicle_Class} type="text" placeholder='Enter the vehicle class' className='form-control' disabled />
                            </div>

                            <div className='my-5'>
                                <label htmlFor="" className='form-label'>Vehicle description</label>
                                <textarea value={data?.data.data.Vehicle_Description} type="text" placeholder='Enter the vehicle description' className='form-control' disabled />
                            </div>

                        </> : ''}

                    </div>

                </div>

            </div>
        </div>
    </>
}

export default VehicleDetails;