import React, { useContext } from 'react'
import DuckImage from '../../imgs/Duck.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { SuperContext } from '../../Context/SuperContext';
import { BsBuildings } from "react-icons/bs";
import { FaBusAlt } from "react-icons/fa";
import { GiRoad } from "react-icons/gi";
import { LuTicket } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
function Vehicles() {
    let navigate = useNavigate();
    let { setSuperToken, setsuperName } = useContext(SuperContext);
    let superName = localStorage.getItem('supername');

    function logout() {
        localStorage.removeItem('superAdminToken');
        localStorage.removeItem('supername');
        setsuperName(null);
        setSuperToken(null);
        navigate('/');
    }
    async function getAllVehicles() {
        const token = localStorage.getItem('superAdminToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return await axios.get(`https://seated-booking.onrender.com/vehicles`,config);

    }
    const { data } = useQuery('getAllVehicles', getAllVehicles);
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
                                <img src={DuckImage} alt="DuckImage" />
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

                    <div>
                        <h4>All Vehicles</h4>


                        <div className='mt-5'>
                            {data?.data.data && Array.isArray(data.data.data) && data.data.data.map((orgs) => (
                                <div key={orgs.id} >
                                    <Link className='linknone' to={`/vehicledetails/${orgs._id}`}>

                                        <table class="table ">

                                            <thead>
                                                <tr>
                                                    <th scope="col">Vehicle ID</th>
                                                    <th scope="col">Organization</th>
                                                    <th scope="col">Vehicle Type</th>
                                                    <th scope="col">Vehicle Name</th>
                                                    <th scope="col">Vehicle Class</th>
                                                    <th scope="col">Vehicle Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">{orgs.Vehicle_ID}</th>
                                                    <td>{orgs.Organization_ID.OrganizationName}</td>
                                                    <td>{orgs.Vehicle_Type}</td>
                                                    <td>{orgs.Vehicle_Name}</td>
                                                    <td>{orgs.Vehicle_Class}</td>
                                                    <td>{orgs.Vehicle_Description}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Link>

                                </div>
                            ))}
                        </div>



                    </div>

                </div>

            </div>
        </div>
    </>
}

export default Vehicles;