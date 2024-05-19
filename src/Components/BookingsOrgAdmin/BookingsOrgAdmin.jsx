import React, { useContext, useEffect, useState } from 'react';
import DuckImage from '../../imgs/Duck.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { AdminContext } from '../../Context/AdminContext';
function BookingsOrgAdmin() {
    let { setAdminOrganizationId, setAdminName, setAdminToken } = useContext(AdminContext);
    let adminorgid = localStorage.getItem('adminOrganizationId');
    let adminname = localStorage.getItem('adminName');
    let navigate = useNavigate();
    async function getAllticket() {
        return await axios.get(`https://seated-booking.onrender.com/ticket`);
    }
    const { data } = useQuery('getAllticket', getAllticket)
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
                                <img src={DuckImage} alt="Duck Image" />
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
                        <h4>All Bookings</h4>
                        {data?.data.data && Array.isArray(data?.data.data) && data?.data.data.map((orgs) => (
                            <div key={orgs._id} >
                                {orgs.Organization_ID === adminorgid ? (<>
                                    <h6 className='my-4 fw-bolder'>{orgs.Trip_ID.Trip_Start_Date}</h6>
                                    <Link className='linknone' to={`/bookingsorgadmindetails/${orgs._id}`}>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Trip ID</th>
                                                    <th scope="col">Organization</th>
                                                    <th scope="col">Username</th>
                                                    <th scope="col">Boarding governrate</th>
                                                    <th scope="col">Destination governrate</th>
                                                    <th scope="col">PNR</th>
                                                    <th scope="col">Seat price</th>
                                                    <th scope="col">Ticket Id</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{orgs.Trip_ID.Trip_ID}</th>
                                                    <td>{orgs.Trip_ID.Organization_ID.OrganizationName}</td>
                                                    <td>{orgs.Passenger_Name}</td>
                                                    <td>{orgs.Trip_ID.Boarding_Station.Governorate_Name}</td>
                                                    <td>{orgs.Trip_ID.Destination_Station.Governorate_Name}</td>
                                                    <td>{orgs.PNR}</td>
                                                    <td>{orgs.Seat_Number.Seat_Price}</td>
                                                    <td>{orgs._id}</td>

                                                </tr>


                                            </tbody>
                                        </table>
                                    </Link>
                                </>) : ('')}

                            </div>
                        ))}




                    </div>

                </div>
            </div>
        </div>
    </>
}

export default BookingsOrgAdmin;