import request from '@/utils/http'

export async function login(data) {
    return request({
        url: 'api/users/login',
        method: 'post',
        data,
    })
}

export async function register(data) {
    return request({
        url: 'api/users/register',
        method: 'post',
        data,
    })
}

export function save_uml(data){
    return request({
        url: 'api/team/uml/save',
        method: 'post',
        data,
    })
}

export function load_uml(data){
    return request({
        url: 'api/team/uml/load',
        method: 'post',
        data,
    })
}

export async function getuserinfo(data) {
    return request({
        url: 'api/users/get_info',
        method: 'post',
        data,
    })
}

export async function edituserinfo(data) {
    return request({
        url: 'api/users/update/info',
        method: 'post',
        data,
    })
}
export async function comfirm(data) {
    return request({
        url: 'api/users/confirm/email',
        method: 'post',
        data,
    })
}
export async function changepassword(data) {
    return request({
        url: 'api/users/change_password',
        method: 'post',
        data,
    })
}
export async function getteamuserin(data) {
    return request({
        url: 'api/team/viewSomeonesTeams0',
        method: 'post',
        data,
    })
}
export async function getteamuseradmin(data) {
    return request({
        url: 'api/team/viewSomeonesTeams1',
        method: 'post',
        data,
    })
}
export async function getteamusercreat(data) {
    return request({
        url: 'api/team/viewSomeonesTeams2',
        method: 'post',
        data,
    })
}
export async function establishteam(data) {
    return request({
        url: 'api/team/establish',
        method: 'post',
        data,
    })
}
export async function getteammemberbyid(data) {
    return request({
        url: 'api/team/viewMembersInTeam',
        method: 'post',
        data,
    })
}
export async function getteamprojectbyid(data) {
    return request({
        url: 'api/team/viewProjectsInTeam',
        method: 'post',
        data,
    })
}
export async function getteammsgbyid(data) {
    return request({
        url: 'api/team/viewTeam',
        method: 'post',
        data,
    })
}
export async function getteammember(data) {
    return request({
        url: 'api/team/getUsersOfTeam',
        method: 'post',
        data,
    })
}
export async function getteamcreator(data) {
    return request({
        url: 'api/team/getCreatorOfTeam',
        method: 'post',
        data,
    })
}
export async function getteamadmin(data) {
    return request({
        url: 'api/team/getAdminsOfTeam',
        method: 'post',
        data,
    })
}
export async function establishproject(data) {
    return request({
        url: 'api/projects/establish',
        method: 'post',
        data,
    })
}
export async function invitemember(data) {
    return request({
        url: 'api/team/invite',
        method: 'post',
        data,
    })
}
/*export const loginApi=data=>{
    return post({
        url: "api/users/login",
        data
    })
}

export const registerApi=data=>{
    return post({
        url:"api/users/register",
        data
    })
}*/