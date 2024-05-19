import './App.css';
import Login from './Components/Login/Login'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Bookings from './Components/Bookings/Bookings'
import Organizations from './Components/Organizations/Organizations'
import Trips from './Components/Trips/Trips'
import Vehicles from './Components/Vehicles/Vehicles'
import NewOrg from './Components/NewOrg/NewOrg'
import NewAdmin from './Components/NewAdmin/NewAdmin'
import NewVehicle from './Components/NewVehicle/NewVehicle'
import NewTrip from './Components/NewTrip/NewTrip'
import OrganizationDetails from './Components/OrganizationDetails/OrganizationDetails'
import VehicleDetails from './Components/VehicleDetails/VehicleDetails'
import TripDetails from './Components/TripDetails/TripDetails'
import BookingDetails from './Components/BookingDetails/BookingDetails'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { SuperContext } from './Context/SuperContext';
import SuperProtectedRoute from './Components/SuperProtectedRoute/SuperProtectedRoute';
import { AdminContext } from "../src/Context/AdminContext";
import AdminProtectedRoute from './Components/AdminProtectedRoute/AdminProtectedRoute';
import HomeOrgAdmin from './Components/HomeOrgAdmin/HomeOrgAdmin'
import NewVehicleOrgAdmin from './Components/NewVehicleOrgAdmin/NewVehicleOrgAdmin'
import AllVehiclesOrgAdmin from './Components/AllVehiclesOrgAdmin/AllVehiclesOrgAdmin'
import VehicleDetailsOrgAdmin from './Components/VehicleDetailsOrgAdmin/VehicleDetailsOrgAdmin'
import TripsOrgAdmin from './Components/TripsOrgAdmin/TripsOrgAdmin'
import BookingsOrgAdmin from './Components/BookingsOrgAdmin/BookingsOrgAdmin'
import BookingsOrgAdminDetails from './Components/BookingsOrgAdminDetails/BookingsOrgAdminDetails'
import NewTripOrgAdmin from './Components/NewTripOrgAdmin/NewTripOrgAdmin'
import TripDetailsOrgAdmin from './Components/TripDetailsOrgAdmin/TripDetailsOrgAdmin'

let routers = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <Login /> },
      { path: 'home', element: <SuperProtectedRoute><Home /> </SuperProtectedRoute> },
      { path: 'organizations', element: <SuperProtectedRoute><Organizations /> </SuperProtectedRoute> },
      { path: 'bookings', element: <SuperProtectedRoute><Bookings /> </SuperProtectedRoute> },
      { path: 'trips', element: <SuperProtectedRoute><Trips /> </SuperProtectedRoute> },
      { path: 'vehicles', element: <SuperProtectedRoute><Vehicles /> </SuperProtectedRoute> },
      { path: 'neworg', element: <SuperProtectedRoute><NewOrg /> </SuperProtectedRoute> },
      { path: 'newadmin', element: <SuperProtectedRoute><NewAdmin /> </SuperProtectedRoute> },
      { path: 'newvehicle', element: <SuperProtectedRoute> <NewVehicle /> </SuperProtectedRoute> },
      { path: 'newtrip', element: <SuperProtectedRoute><NewTrip /> </SuperProtectedRoute> },
      { path: 'organizationdetails/:id', element: <SuperProtectedRoute> <OrganizationDetails /> </SuperProtectedRoute> },
      { path: 'vehicledetails/:id', element: <SuperProtectedRoute><VehicleDetails /> </SuperProtectedRoute> },
      { path: 'tripdetails/:id', element: <SuperProtectedRoute><TripDetails />  </SuperProtectedRoute> },
      { path: 'bookingdetails/:id', element: <SuperProtectedRoute><BookingDetails /> </SuperProtectedRoute> },
      { path: 'homeorgadmin', element: <AdminProtectedRoute><HomeOrgAdmin /> </AdminProtectedRoute> },
      { path: 'newvehicleorgadmin', element: <AdminProtectedRoute><NewVehicleOrgAdmin /> </AdminProtectedRoute> },
      { path: 'allvehiclesorgadmin', element: <AdminProtectedRoute><AllVehiclesOrgAdmin /> </AdminProtectedRoute> },
      { path: 'vehicledetailsorgadmin/:id', element: <AdminProtectedRoute><VehicleDetailsOrgAdmin /> </AdminProtectedRoute> },
      { path: 'tripsorgadmin', element: <AdminProtectedRoute><TripsOrgAdmin /> </AdminProtectedRoute> },
      { path: 'bookingsorgadmin', element: <AdminProtectedRoute><BookingsOrgAdmin /> </AdminProtectedRoute> },
      { path: 'bookingsorgadmindetails/:id', element: <AdminProtectedRoute><BookingsOrgAdminDetails /> </AdminProtectedRoute> },
      { path: 'newtriporgadmin', element: <AdminProtectedRoute><NewTripOrgAdmin /> </AdminProtectedRoute> },
      { path: 'tripdetailsorgadmin/:id', element: <AdminProtectedRoute><TripDetailsOrgAdmin /> </AdminProtectedRoute> },

      
    ]
  }
])

function App() {
  let { setSuperToken } = useContext(SuperContext);
  let { setAdminToken, setAdminOrganizationId, setAdminName } = useContext(AdminContext);

  useEffect(() => {
    if (localStorage.getItem('superAdminToken') !== null) {
      setSuperToken(localStorage.getItem('superAdminToken'));
      setAdminName(localStorage.getItem('supername'));
    } else if (localStorage.getItem('orgAdminToken') !== null) {
      setAdminToken(localStorage.getItem('orgAdminToken'));
      setAdminOrganizationId(localStorage.getItem('adminOrganizationId'));
      setAdminName(localStorage.getItem('adminName'));
    }
  }, [setAdminName, setAdminOrganizationId, setAdminToken, setSuperToken]);
  return <RouterProvider router={routers} ></RouterProvider>
}

export default App;
