import axios from 'axios'

export default class FileService {

    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/files`,
            // baseURL: 'http://localhost:5000/api/files',
            withCredentials: true
        })
    }

    handleUpload = theFile => this.service.post('/upload', theFile)
}