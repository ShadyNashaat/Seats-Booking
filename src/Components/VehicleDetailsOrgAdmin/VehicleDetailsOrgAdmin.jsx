import React, { useContext } from 'react';
import DuckImage from '../../imgs/Duck.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { AdminContext } from '../../Context/AdminContext';
import { useQuery } from 'react-query';

function VehicleDetailsOrgAdmin() {
    const { setAdminOrganizationId, setAdminName, setAdminToken } = useContext(AdminContext);
    let adminname = localStorage.getItem('adminName');
    const navigate = useNavigate();
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
    let params = useParams();

    function getVehicleId(id) {
        return axios.get(`https://seated-booking.onrender.com/vehicles/${id}`);
    }
    let { data } = useQuery('getAllVehicles', () => getVehicleId(params.id))
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
                        <h4>Vehicle Details</h4>
                        <form>
                            <div className="row my-5">
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="" className='form-label'>Vehicle ID</label>
                                        <input value={data?.data.data.Vehicle_ID} type="number" placeholder='Enter the vehicle ID' className='form-control' disabled />
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
                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="Vehicle_Type" className='form-label'>Vehicle Type</label>
                                        <input value={data?.data.data.Vehicle_Type} name="Vehicle_Type" id="Vehicle_Type" type="text" placeholder='Enter vehicle type' className='form-control' disabled />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="Vehicle_Name" className='form-label'>Vehicle Name</label>
                                        <input value={data?.data.data.Vehicle_Name} name="Vehicle_Name" id="Vehicle_Name" type="text" placeholder='Enter the vehicle name' className='form-control' disabled />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <label htmlFor="Vehicle_Class" className='form-label'>Vehicle Class</label>
                                        <input value={data?.data.data.Vehicle_Class} name="Vehicle_Class" id="Vehicle_Class" type="text" placeholder='Enter the vehicle class' className='form-control' disabled />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="Vehicle_Description" className='form-label'>Vehicle description</label>
                                <input value={data?.data.data.Vehicle_Description} name="Vehicle_Description" id="Vehicle_Description" type="text" placeholder='Enter the vehicle description' className='form-control' disabled />
                            </div>
                        </form>


                    </div>

                </div>

            </div>
        </div>
    </>
}

export default VehicleDetailsOrgAdmin;