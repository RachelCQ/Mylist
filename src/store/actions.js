export function clickList(newData,theMovie) {
    return {type:'click_list',data:{newData,theMovie}}
}

export function clickRecom(newData,theMovie) {
    return {type:'click_recom',data:{newData,theMovie}}
}
