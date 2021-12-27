import {$authHost, $host} from "./index";

export const createGenres = async (genre) => {
    const {data} = await $authHost.post('api/genre', genre)
    return data
}

export const fetchGenres = async () => {
    const {data} = await $host.get('api/genre')
    return data
}

export const createCountries = async (country) => {
    const {data} = await $authHost.post('api/country', country)
    return data
}

export const fetchCountries = async () => {
    const {data} = await $host.get('api/country', )
    return data
}

export const createSerials = async (serial) => {
    const {data} = await $authHost.post('api/serial', serial)
    return data 
}

export const updateSerialInfo = async (id, number_of_seasons, number_of_episodes, status, rating_IMDB, main_actors) => {
    const {data} = await $authHost.put('api/serial/' + id, {number_of_seasons, number_of_episodes, status, rating_IMDB, main_actors})
    return data 
}

export const fetchSerials = async (genre_id, country_id, page, limit= 5) => {
    const {data} = await $host.get('api/serial', {params: {
            genre_id, country_id, page, limit
        }})
    return data
}

export const fetchOneSerial = async (id) => {
    const {data} = await $host.get('api/serial/' + id)
    return data
}


export const fetchReviews = async (id) => {
    const {data} = await $host.get('api/reviews/' + id)
    return data
}

export const checkList = async (id) => {
    const {data} = await $authHost.get('api/userlists/check', {params: {id}} )
    return data
}

export const fetchLists = async (is_viewed) => {
    const {data} = await $authHost.get('api/userlists', {params: {is_viewed}})
    return data
}

export const addChangedReview = async (review_id, text_rew) => {
    const {data} = await $authHost.put('api/reviews/' + review_id, {text_rew})
    return data
}