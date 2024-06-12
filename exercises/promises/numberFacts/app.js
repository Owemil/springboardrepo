const url = 'http://numbersapi.com/'
const $div = $('#container')
const $ul = $('.numFacts')
axios
    .get(`${url}random/trivia?json`)
    .then(resp => {
        console.log(resp)
        console.log(resp.data)
        return axios.get(`${url}1..5/trivia?json`)
    })
    .then(resp => {
        console.log(resp)
        console.log(resp.data)
        for (const [key, value] of Object.entries(resp.data)) {
            $newLi = $("<li></li>")
            $newLi.text(value)
            $ul.append($newLi)
        }
        return axios.get(`${url}27/trivia?json`)
    })
    .then(resp => {
        console.log(resp.data)
        console.log(resp.data.text)
        $newLi = $("<li></li>")
        $newLi.text(resp.data.text)
        $ul.append($newLi)
        return axios.get(`${url}27/trivia?json`)
    })
    .then(resp => {
        console.log(resp.data)
        console.log(resp.data.text)
        $newLi = $("<li></li>")
        $newLi.text(resp.data.text)
        $ul.append($newLi)
        return axios.get(`${url}27/trivia?json`)
    })
    .then(resp => {
        console.log(resp.data)
        console.log(resp.data.text)
        $newLi = $("<li></li>")
        $newLi.text(resp.data.text)
        $ul.append($newLi)
        return axios.get(`${url}27/trivia?json`)
    })
    .then(resp => {
        console.log(resp.data)
        console.log(resp.data.text)
        $newLi = $("<li></li>")
        $newLi.text(resp.data.text)
        $ul.append($newLi)

    })
    .catch(err => {
        console.log(`Error : ${err}`)
    })


