import axios from "axios"

class IPdataAPI {

    static token = "f3d509de07cb9f5f1eef10401e496b7560ce74c3967d432877fce624"
    static BASE_URL = "https://api.ipdata.co"

    static async getLocData() {
        let res = await axios(`${this.BASE_URL}?api-key=${this.token}`)
        return res.data
    }
}

export default IPdataAPI