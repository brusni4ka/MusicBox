/**
 * Created by kate on 10/01/17.
 */
export const normalizeQuery = (query)=>{
    debugger;
    let q =query.replace(/\s/g,'');
    return encodeURIComponent(q);
}