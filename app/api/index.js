import {CLIENT_ID, ROOT_URL} from '../constants/SoundCloudConfig';

export const getSongsUrlByGenre = (data)=> {
    return `${ROOT_URL}?linked_partitioning=1&limit=10&offset=0&client_id=${CLIENT_ID}&tags=${data}&genres=${data}`;
};

export const getGenresList = ()=> {
    return `${ROOT_URL}?client_id=${CLIENT_ID}`;
};
