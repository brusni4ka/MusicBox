/**
 * Created by kate on 04/01/17.
 */
export const responseToGenres = (resp, limit)=> {
    let list = new Set();
    resp.forEach(el=>el.genre !== null && el.genre !== '' ? list.add(el.genre) : null);
    let arr = [...list].slice(0, limit);
    return formatGenres(arr);
};

const formatGenres = (list)=> {
   return list.map(el=>el.replace('\/', '&'));
};