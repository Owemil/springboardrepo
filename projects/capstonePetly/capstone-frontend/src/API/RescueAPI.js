import axios from "axios";

class RescueAPI {

    static token = "OrUvfA4U"
    static BASE_URL = "https://api.rescuegroups.org/v5"

    static async request(endpoint, data = {}, params = {}, method = "get") {

        const url = `${this.BASE_URL}/${endpoint}`
        const headers = {
            Authorization: `${this.token}`
        }

        try {
            return (await axios({ url, method, data, params, headers }))
        } catch (err) {
            console.error("API Error:", err.response);
        }
    }

    static async postNearby(params = {}, locData, distance = 100, method = "post") {
        const { lat, lon, distanceType } = locData


        const data = {
            data: {
                filterRadius: {
                    [distanceType]: distance,
                    lat: lat,
                    lon: lon
                }
            }
        }

        let res = await this.request(`public/animals/search/available`, data, params, method)
        return res.data
    }

    static async getAnimal(id) {
        let res = await this.request(`public/animals/${id}`)
        return res.data
    }

    static async postFilter(filterData, locData, page, method = "post") {
        const { species, radius, sort, location } = filterData
        console.log(location)
        const params = {
            page: page ? page : 1,
            limit: 30
        }

        const data = {
            data: {
                filters: [
                    {
                        fieldName: "statuses.name",
                        operation: "equals",
                        criteria: "Available"
                    },

                ],

            }
        }
        if (species != " ") {
            data.data.filters.push({
                fieldName: "species.plural",
                operation: "equals",
                criteria: species
            })
        }
        console.log(data)
        if (locData) {
            const { lat, lon, distanceType } = locData
            let filterRadius
            if (radius === 'Anywhere') {

            } else {
                if (sort === "Nearest" && (locData || location)) {
                    params.sort = "animals.distance"
                } else if (sort === "Furthest" && (locData || location)) {
                    params.sort = "-animals.distance"
                } else {
                    params.sort = "random"
                }

                const [num] = radius.split(' ')

                filterRadius = { [distanceType]: num }

                if (location === '') {
                    console.log('hey')
                    filterRadius.lat = lat
                    filterRadius.lon = lon
                } else {
                    filterRadius.postalcode = location
                }
                data.data.filterRadius = filterRadius
            }
        }

        let res = await this.request(`public/animals/search`, data, params, method)
        return res
    }

    static async postOtherOrgPets(id, species, limit, method = "post") {
        const data = {
            data: {
                filters: [
                    {
                        fieldName: "statuses.name",
                        operation: "equals",
                        criteria: "Available"
                    },
                    {
                        fieldName: "species.plural",
                        operation: "equals",
                        criteria: species
                    }
                ],

            }
        }
        const params = {
            page: 1,
            limit: limit ? limit : 30,
            sort: "random"
        }
        let res = await this.request(`public/orgs/${id}/animals/search`, data, params, method)
        return res.data
    }

    static async postOtherNearby(species, locData, method = "post") {

        const { lat, lon, distanceType } = locData


        const data = {
            data: {
                filters: [
                    {
                        fieldName: "statuses.name",
                        operation: "equals",
                        criteria: "Available"
                    },
                    {
                        fieldName: "species.plural",
                        operation: "equals",
                        criteria: species
                    }
                ],
                filterRadius: {
                    [distanceType]: 100,
                    lat: lat,
                    lon: lon
                }

            }
        }
        const params = {
            page: 1,
            limit: 3,
            sort: "random"
        }
        let res = await this.request(`public/animals/search`, data, params, method)
        return res.data
    }

    static async postOrgs(filterData, locData, page, method = "post") {
        const { location, name } = filterData

        const params = {
            page: page ? page : 1,
            limit: 30
        }

        if (location === '') {

        } else {
            params.sort = "orgs.distance"
        }

        const data = {
            data: {

            }
        }
        if (name) {
            data.data.filters = [
                {
                    fieldName: "orgs.name",
                    operation: "contains",
                    criteria: name
                }
            ]
        }
        if (locData) {
            const { distanceType } = locData
            let filterRadius

            filterRadius = { [distanceType]: 100 }

            if (location === '') {
            } else {
                filterRadius.postalcode = location
                data.data.filterRadius = filterRadius
            }

        }



        let res = await this.request(`public/orgs/search`, data, params, method)
        return res
    }

    static async postOrgAnimals(id, page, method = "post") {

        const params = {
            page: page ? page : 1,
            limit: 30
        }

        const data = {
            data: {

            }
        }

        let res = await this.request(`public/orgs/${id}/animals/search/available`, data, params, method)
        return res.data
    }





}



export default RescueAPI