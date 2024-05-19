import React, { useContext} from 'react';
import DuckImage from '../../imgs/Duck.png';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { AdminContext } from '../../Context/AdminContext';

function HomeOrgAdmin() {
    let { setAdminOrganizationId, setAdminName, setAdminToken } = useContext(AdminContext);
    const adminorgid = localStorage.getItem('adminOrganizationId');
    let adminname = localStorage.getItem('adminName');
    const token = localStorage.getItem('orgAdminToken');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    async function getSpecificOrganization(id) {
        return await axios.get(`https://seated-booking.onrender.com/org/${id}`);
    }

    function getAllVehicles() {
        return axios.get(`https://seated-booking.onrender.com/vehicles`);
    }
    let { data: allvechilee} = useQuery('getAllVehicles', getAllVehicles);
    const totalvehicles = allvechilee?.data.data.filter(trip => trip.Organization_ID._id === adminorgid).length;

    let { data } = useQuery('getorganizations', () => getSpecificOrganization(adminorgid));

    let navigate = useNavigate();
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

    async function getAllTrips() {
        return await axios.get(`https://seated-booking.onrender.com/trips`);
    }

    const { data: alltrips } = useQuery('getAllTrips', getAllTrips);
    const totalTrips = alltrips?.data.data.filter(trip => trip.Vehicle_ID.Organization_ID._id === adminorgid).length;
    console.log(alltrips?.data.data)
    async function getAllBookings() {
        return await axios.get(`https://seated-booking.onrender.com/ticket`);
    }
    const { data: allTikets } = useQuery('getAllBookings', getAllBookings);
    const totaltikets = allTikets?.data.data.filter(trip => trip.Organization_ID === adminorgid).length;

    async function getOrgAdmin(id) {

        return await axios.get(`https://seated-booking.onrender.com/users/orgAdmin/${id}`, config);
    }
    const { data: orgAdmin } = useQuery('getOrgAdmin', () => getOrgAdmin(adminorgid));
    return (
        <>
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
                                    <img src={DuckImage} alt="Duck-Image" />
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
                        <div className='col-md-4 mx-auto'>
                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Organization details</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Admin details</button>
                                </li>
                            </ul>
                        </div>

                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                                <span className='fw-bolder'>Organization details</span>
                                <div className="row mt-3">
                                    {data?.data.data ? (
                                        <>
                                            <div className="col-md-2">
                                                <img src={data?.data.data.OrganizationImage} alt="Organization" className='w-100 rounded-circle' />
                                            </div>
                                            <div className='col-md-9 mt-3'>
                                                <div className="d-flex justify-content-between">
                                                    <div className='d-flex'>
                                                        <h4>{data?.data.data.OrganizationName}</h4>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className="dropdown-center">
                                                            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className='fa-solid fa-plus me-2'></i>Add
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li><Link className="dropdown-item" to="/newtriporgadmin">Trip</Link></li>
                                                                <li><Link className="dropdown-item" to="/newvehicleorgadmin">Vehicle</Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex mt-4">
                                                    <div className='col-md-3'>
                                                        <div className='d-flex'>
                                                            <div className='me-1'>
                                                                <div className='rounded-5 widt blueBg d-flex justify-content-center'>
                                                                    <div className="ft-size"><FaBusAlt /></div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className='mb-0'>Total Vehicles</p>
                                                                <p>
                                                                    <b>
                                                                       {totalvehicles}
                                                                    </b>
                                                                </p>
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
                                                                <p><b> {totalTrips}</b></p>
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
                                            {alltrips?.data.data && Array.isArray(alltrips.data.data) && alltrips.data.data.map((orgs) => (
                                                <div key={orgs._id}>
                                                    {adminorgid === orgs.Vehicle_ID.Organization_ID._id ? (
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Trip ID</th>
                                                                    <th scope="col">Organization</th>
                                                                    <th scope="col">Boarding governorate</th>
                                                                    <th scope="col">Destination governorate</th>
                                                                    <th scope="col">Start time</th>
                                                                    <th scope="col">End time</th>
                                                                    <th scope="col">Vehicle ID</th>
                                                                    <th scope="col">Vehicle class</th>
                                                                    <th scope="col">Number of seats</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">{orgs.Trip_ID}</th>
                                                                    <td>{orgs.Vehicle_ID?.Organization_ID?.OrganizationName}</td>
                                                                    <td>{orgs.Boarding_Station.Governorate_Name}</td>
                                                                    <td>{orgs.Destination_Station.Governorate_Name}</td>
                                                                    <td>{orgs.Trip_Start_Date}</td>
                                                                    <td>{orgs.Trip_End_Date}</td>
                                                                    <td>{orgs.Vehicle_ID.Vehicle_ID}</td>
                                                                    <td>{orgs.Vehicle_ID.Vehicle_Class}</td>
                                                                    <td>{orgs.Vehicle_ID?.Seats.length}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className='w-100 py-5 d-flex justify-content-center'>
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
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                            <div>
                                <h4>Admin details</h4>

                                <div className="row mt-5">
                                    <div className="col-md-3">
                                        <div>
                                            <label htmlFor="" className='form-label'>Organization's Name</label>
                                            <input value={data?.data.data.OrganizationName} disabled type="text" name="OrganizationName" placeholder='Enter organization name' className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div>
                                            <label htmlFor="" className='form-label'>Vehicle Status</label>
                                            <div className='d-flex justify-content-between bg-white form-control'>
                                                <h6>{orgAdmin?.data.data.UserStatus ? 'Active' : 'Inactive'}</h6>
                                                <div className="form-check form-switch">
                                                    <input value={orgAdmin?.data.data.UserStatus} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled checked={orgAdmin?.data.data.UserStatus} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-5">
                                    <div className="col-md-3">
                                        <div>
                                            <label htmlFor="" className='form-label'>Business user ID</label>
                                            <input value={orgAdmin?.data.data.BusinessUserID} disabled type="number" placeholder='Enter the business user ID' className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div>
                                            <label htmlFor="" className='form-label'>Permission ID</label>
                                            <input value={orgAdmin?.data.data.PermissionID} disabled type="text" placeholder='Enter Permission ID' className='form-control' />
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-5">
                                    <div className="col-md-4">
                                        <div>
                                            <label htmlFor="" className='form-label'>The organization's admin ID</label>
                                            <input value={orgAdmin?.data.data.OrgAdminID} disabled type="text" placeholder='Enter the admin ID' className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div>
                                            <label htmlFor="" className='form-label'>Admin's Email</label>
                                            <input value={orgAdmin?.data.data.UserEmail} disabled type="email" placeholder='Enter the admin email' className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div>
                                            <label htmlFor="" className='form-label'>Admin Username</label>
                                            <input value={orgAdmin?.data.data.Username} disabled type="text" placeholder='Enter the admin username' className='form-control' />
                                        </div>
                                    </div>
                                </div>

                                <div className="row my-5">
                                    <div className="col-md-4">
                                        <div>
                                            <label htmlFor="" className='form-label'>National ID</label>
                                            <input value={orgAdmin?.data.data.UserNationalID} disabled type="number" placeholder='Enter the admin national ID' className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div>
                                            <label htmlFor="" className='form-label'>Mobile Number</label>
                                            <input value={orgAdmin?.data.data.UserMobileNumber} disabled type="number" placeholder='Enter the admin Mobile Number' className='form-control' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeOrgAdmin;
