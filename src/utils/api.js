import request, {post} from '@/utils/http'

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

export function save_axure(data){
    return request({
        url: 'api/projects/save/axure',
        method: 'post',
        data,
    })
}

export function create_axure(data){
    return request({
        url: 'api/projects/new/axure',
        method: 'post',
        data,
    })
}

export function load_axure(data){
    return request({
        url: 'api/projects/load/axure',
        method: 'post',
        data,
    })
}

//
// export function del_axure(data){
//     return request({
//         url: 'api/projects/delete/axure',
//         method: 'post',
//         data,
//     })
// }

export function get_axurefile(data){
    return request({
        url: 'api/projects/viewDesignsInProject',
        method: 'post',
        data,
    })
}

export function save_uml(data){
    return request({
        url: 'api/projects/save/xml',
        method: 'post',
        data,
    })
}

export function create_uml(data){
    return request({
        url: 'api/projects/new/xml',
        method: 'post',
        data,
    })
}
export function load_uml(data){
    return request({
        url: 'api/projects/load/xml',
        method: 'post',
        data,
    })
}

export function del_uml(data){
    return request({
        url: 'api/projects/delete/xml',
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


export function save_doc(data){
    return request({
        url: 'api/projects/save/doc',
        method: 'post',
        data,
    })
}

export function load_doc(data){
    return request({
        url: 'api/projects/load/doc',
        method: 'post',
        data,
    })
}

export function del_doc(data){
    return request({
        url: 'api/projects/delete/doc',
        method: 'post',
        data,
    })
}

export function create_doc(data){
    return request({
        url: 'api/projects/new/doc',
        method: 'post',
        data,
    })
}

export function get_umlfile(data){
    return request({
        url: 'api/projects/viewUMLsInProject',
        method: 'post',
        data,
    })
}

export function renameFileById(data){
    return request({
        url: 'api/projects/rename/file',
        method: 'post',
        data,
    })
}

export function deleteFileById(data){
    return request({
        url: 'api/projects/delete/file',
        method: 'post',
        data,
    })
}

export function get_docfile(data){
    return request({
        url: 'api/projects/viewTextsInProject',
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
export async function setteamadmin(data) {
    return request({
        url: 'api/team/setAdmins',
        method: 'post',
        data,
    })
}
export async function deleteteammem(data) {
    return request({
        url: 'api/team/deleteMem',
        method: 'post',
        data,
    })
}

export function getProsByUser(data){
    return request({
        url: 'api/projects/getprojects/byuser',
        method: 'post',
        data,
    })
}



export async function deleteproject(data) {
    return request({
        url: 'api/projects/delete/project',
        method: 'post',
        data,
    })
}
export async function copyproject(data) {
    return request({
        url: 'api/team/copyproject',
        method: 'post',
        data,
    })
}
export async function editteaminfo(data) {
    return request({
        url: 'api/team/updateteaminfo',
        method: 'post',
        data,
    })
}
export async function getpersonalmsg(data) {
    return request({
        url: 'api/interact/getPersonalMessage',
        method: 'post',
        data,
    })
}
export async function agreeinvitation(data) {
    return request({
        url: 'api/interact/agreeInvitation',
        method: 'post',
        data,
    })
}
export async function deletepersonalmsg(data) {
    return request({
        url: 'api/interact/disagreeInvitation',
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
