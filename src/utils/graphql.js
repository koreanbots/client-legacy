import config from "../config";

export default async function( query, ignoreToken=false ) {
    const res = await fetch(config.api + '/graphql', {
        method: 'POST',
        headers: {
            Authorization: ignoreToken || !localStorage.token ? '' : 'Bearer ' + localStorage.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    })

    const json = await res.json().catch(e=> { return { message: e } } )
    if(res.status === 401) return window.location.assign(config.url)
    if(res.status.toString().startsWith(4) || res.status.toString().startsWith(5)) return { ...json, code: res.status, message: json.message || '처리중에 문제가 발생하였습니다', }
    if((json.code && !json.code.toString().startsWith(2)) || json.errors) return { code: 400, message: json.errors.length > 0 ? json.errors[0].message : '처리중에 문제가 발생하였습니다.', errors: json.errors }
    return { code: res.status, data: json.data }
}