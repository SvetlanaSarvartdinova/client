import {makeAutoObservable} from "mobx";

export default class SerialStore {
    constructor() {
        this._genres = []
        this._countries = []
        this._serials = []
        this._selectedGenre = {}
        this._selectedCountry = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 6
        makeAutoObservable(this)
    }

    setGenres(genres) {
        this._genres = genres
    }
    setCountries(countries) {
        this._countries = countries
    }
    setSerials(serials) {
        this._serials = serials
    }

    setSelectedGenre(genre) {
        this.setPage(1)
        this._selectedGenre = genre
    }
    setSelectedCountry(country) {
        this.setPage(1)
        this._selectedCountry = country
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get genres() {
        return this._genres
    }
    get countries() {
        return this._countries
    }
    get serials() {
        return this._serials
    }
    get selectedGenre() {
        return this._selectedGenre
    }
    get selectedCountry() {
        return this._selectedCountry
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}