import React, { useState, useEffect } from 'react'
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import JoblyApi from './api'
import Jobly from './Jobly'
import CompanyList from './CompanyList'
import CompanyDetails from './CompanyDetails';
import NavBar from './NavBar'
import Jobs from './Jobs';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import { jwtDecode } from "jwt-decode"
import JoblyContext from "./JoblyContext"

/**
 * main app for jobly app. contains all routes and api call functions
 * 
 */

function App() {
  const [companies, setCompanies] = useState([])
  const [jobs, setJobs] = useState([])
  const [user, setUser] = useState()
  const [token, setToken] = useState()

  const navigate = useNavigate()

  //  useEffect gathers initial data for populating companies and jobs
  // also checks if there is a token in localStorage
  useEffect(() => {

    async function populate() {
      // check localStorage for token
      if (localStorage.token) {
        //  if so grab and parse token
        const tokenLocal = localStorage.getItem('token')
        JoblyApi.token = JSON.parse(tokenLocal)
        // grab username from decoded JWT
        const { username } = jwtDecode(tokenLocal)
        // get user data from api call
        const userData = await JoblyApi.getUser(username)
        //  set state of user
        setUser(() => ({ ...userData }))

      }
      // initial data for companies and jobs
      const companies = await JoblyApi.getCompanies()
      const jobs = await JoblyApi.getJobs()
      //  set state for both
      setCompanies(companies)
      setJobs(jobs)
    }
    populate()
  }, [token])
  // api function call for making filtered searchs of companies
  const getCompanies = async (formData) => {
    const res = await JoblyApi.getCompanies(formData)
    return res
  }
  // api function call for making filtered searchs of jobs
  const searchJobs = async (evt, filters) => {
    evt.preventDefault()
    const res = await JoblyApi.getJobs(filters)
    return res
  }
  // function for handling authentication for login/sign up
  const handleAuth = async (evt, route, authForm) => {
    evt.preventDefault()
    const res = await JoblyApi.handleAuth(route, authForm)
    JoblyApi.token = res
    setToken(() => res)
    localStorage.setItem("token", JSON.stringify(res))
    navigate('/')
  }
  //  logout function, empties state for token/ user and empties localStorage
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/')
  }
  // user update function for profile form. changes token state for re-render to update user info
  const updateUser = async (evt, data) => {
    evt.preventDefault()
    const update = await JoblyApi.updateUser(`users/${user.user.username}`, data, 'patch')

    setUser(oldUser => ({ ...oldUser, update }))
    setToken('re-render')
  }
  // function to apply for jobs, changes token state for re-render to update info on if applied to or not
  const apply = async (evt, id) => {
    evt.preventDefault()
    await JoblyApi.applyToJob(`users/${user.user.username}/jobs/${id}`)

    setToken('re-render')

  }


  return (
    <JoblyContext.Provider value={{ user, apply }}>
      <div className="App">
        <NavBar user={user} logout={logout} />
        <Routes>
          <Route path='/' element={<Jobly />} />
          <Route path='/companies'>
            <Route index element={<CompanyList companies={companies} getCompanies={getCompanies} />} />
            <Route path=':handle' element={<CompanyDetails companies={companies} jobs={jobs} />} />
          </Route>
          <Route path='/jobs' element={<Jobs jobs={jobs} search={searchJobs} />} />
          <Route path='/login' element={<Login login={handleAuth} />} />
          <Route path='/signup' element={<Signup signup={handleAuth} />} />
          <Route path='/profile' element={<Profile update={updateUser} />} />
        </Routes>
      </div>
    </JoblyContext.Provider>
  );
}

export default App;
