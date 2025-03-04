import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"
import RescueAPI from "./API/RescueAPI"
import IPdataAPI from './API/IPdataAPI';
import PetlyApi from './API/PetlyAPI';
import Petly from "./Petly"
import PetlyContext from './PetlyContext';
import NavBar from './NavBar';
import Search from './Search';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import AnimalDetails from './AnimalDetails';
import OrgSearch from './OrgSearch';
import OrgAnimals from './OrgAnimals';

function App() {
  const [nearbyPetly, setNearbyPetly] = useState()
  const [singleAnimal, setSingleAnimal] = useState()
  const [orgAnimals, setOrgAnimals] = useState()
  const [locData, setLocData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState()

  const navigate = useNavigate()

  const otherFilters = {
    filterSet: new Set(["Barnyard", "Reptile", "Small & Furry", "Scales, Shells & Other"]),
    scalesshellsother: ["Fish", "Frogs", "Turtles", "Tortoises",],
    reptile: ["Geckos", "Iguanas", "Snakes", "Lizards"],
    smallfurry: ["Chinchillas", "Ferrets", "Gerbils", "Hamsters", "Mice", "Rats",],
    barnyard: ["Chickens", "Cows", "Donkeys", "Ducks", "Geese", "Goats", "Pigs", "Ponies", "Turkeys",]
  }


  useEffect(() => {


    async function populateUser() {
      // check localStorage for token
      if (localStorage.token) {

        //  if so grab and parse token
        const tokenLocal = localStorage.getItem('token')
        PetlyApi.token = JSON.parse(tokenLocal)
        // grab username from decoded JWT
        const { username } = jwtDecode(tokenLocal)
        // get user data from api call
        const userData = await PetlyApi.getUser(username)

        //  set state of user
        setUser(() => ({ ...userData }))

      }

    }
    populateUser()

    const locate = async () => {
      // get location data for current user
      const ip = await IPdataAPI.getLocData()
      let distanceType
      if (ip.country_code === "US") {
        distanceType = "miles"
      } else if (ip.country === "CA") {
        distanceType = "kilometers"
      }
      //  set location data for later use
      setLocData(() => ({
        lat: ip.latitude,
        lon: ip.longitude,
        distanceType: distanceType,
        zip: user ? user.zipCode : ip.postal,
      }))
      // change isLoading state to trigger other useEffect
      setIsLoading(!isLoading)
    }
    if (!locData) locate()

  }, [token])

  useEffect(() => {
    // function for populating nearby animals on front page
    if (!isLoading && locData) {
      async function populateNearby(locData) {
        const filters = {
          page: 1,
          limit: 3,
          sort: "random"
        }
        const petly = await RescueAPI.postNearby(filters, locData)

        setNearbyPetly(() => [...petly.data, petly.meta])

      }
      populateNearby(locData)
    }


  }, [isLoading, locData])


  // function for cleaning up pet about info
  function slugify(str) {
    str = str.toLowerCase().trim();
    str = str.replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
      .replace(/\s+/g, '') // Collapse whitespace 
    return str;
  }

  // function for handling authentication for login/sign up
  const handleAuth = async (evt, route, authForm) => {
    evt.preventDefault()
    const res = await PetlyApi.handleAuth(route, authForm)
    PetlyApi.token = res
    setToken(() => res)
    localStorage.setItem("token", JSON.stringify(res))
    navigate('/')
  }
  //  logout function, empties state for token/ user and empties localStorage
  const logout = () => {
    PetlyApi.token = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }

  // user update function for profile form. changes token state for re-render to update user info
  const updateUser = async data => {
    const update = await PetlyApi.updateUser(`users/${user.username}`, data, 'patch')

    setUser(oldUser => ({ ...oldUser, update }))
    setToken('rerender')
  }
  // filter function for Search component to get filtered animal searchs
  const filter = async (filterData, page) => {
    if (page) {
      const filterRes = await RescueAPI.postFilter(filterData, locData, page)
      return filterRes.data
    } else {
      const filterRes = await RescueAPI.postFilter(filterData, locData)
      return filterRes.data
    }

  }
  // function to get single animal data for AnimalDetails component
  const getAnimal = async id => {
    const animal = await RescueAPI.getAnimal(id)
    setSingleAnimal(() => ({ ...animal }))
    navigate(`/animal/${id}`)

  }
  // function passed into AnimalDetails
  // it gets other nearby pets of a certain species as well as 
  // animals from the same org
  const getOtherPets = async (id, species) => {
    const limit = 3
    const otherOrgPets = await RescueAPI.postOtherOrgPets(id, species, limit)
    const otherNearby = await RescueAPI.postOtherNearby(species, locData)
    return { otherOrgPets, otherNearby }
  }
  // function for getting orgs for orgSearch component
  const getOrgs = async (filterData, page) => {
    const res = await RescueAPI.postOrgs(filterData, locData, page)
    return res
  }
  // function for getting all animals from a certain org.
  const getOrgAnimals = async (id, orgName, page) => {
    if (page) {
      const res = await RescueAPI.postOrgAnimals(id, page)
      return res
    } else {
      const res = await RescueAPI.postOrgAnimals(id)
      res.meta.count === 0 ?
        setOrgAnimals(() => ({ meta: res.meta, animals: ["Sorry, we couldn't find what you're looking for.."] }))
        :
        setOrgAnimals(() => ({
          meta: res.meta,
          animals: res.data
        }))
      setOrgAnimals(() => ({ meta: res.meta, animals: res.data }))
      navigate(`/orgs/${orgName}/${id}/animals`)
    }
  }

  async function getNearby() {
    const filters = {
      page: 1,
      limit: 30,
      sort: "animals.distance"
    }
    const search = await RescueAPI.postNearby(filters, locData)
    // setNearbySearch(() => [...search.data, search.meta])
    return search
  }

  // function for adding a favorite pet
  const addFavPet = async (username, pet) => {
    const res = await PetlyApi.addFavPet(username, pet)
    console.log(res)
  }
  // function for removing a favorite pet
  const removeFavPet = async (username, id) => {
    const res = await PetlyApi.removeFavPet(username, id)
    console.log(res)
  }
  // function for adding a favorite org
  const addFavOrg = async (username, org) => {
    const res = await PetlyApi.addFavOrg(username, org)
    console.log(res)
  }
  // function for removing a favorite org
  const removeFavOrg = async (username, id) => {
    const res = await PetlyApi.removeFavOrg(username, id)
    console.log(res)
  }



  return (
    <PetlyContext.Provider value={{ user, getNearby, getAnimal, filter, otherFilters, slugify, getOrgAnimals, addFavPet, removeFavPet, addFavOrg, removeFavOrg, }}>
      <div className="App">
        <NavBar logout={logout} user={user} other={otherFilters} />
        <Routes>
          <Route path="/" element={<Petly nearby={nearbyPetly} getanimal={getAnimal} />} />
          <Route path="/search">
            <Route index element={<Search />} />
            <Route path=":species" element={<Search />} />
          </Route>
          <Route path="/animal/:id" element={<AnimalDetails animal={singleAnimal} getOtherPets={getOtherPets} />} />
          <Route path="/orgs">
            <Route index element={<OrgSearch search={getOrgs} locData={locData} />} />
            <Route path=":orgName/:id/animals" element={<OrgAnimals animals={orgAnimals} getAnimals={getOrgAnimals} />} />
          </Route>
          <Route path="/login" element={<Login login={handleAuth} />} />
          <Route path="/signup" element={<Signup signup={handleAuth} />} />
          <Route path="/user" element={<Profile currUser={user} update={updateUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </PetlyContext.Provider>
  );
}

export default App;
