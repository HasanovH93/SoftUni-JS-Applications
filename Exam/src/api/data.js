import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const endPoints = {
    allAlbums: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    getById: '/data/albums/',
    create: '/data/albums',
    remove: '/data/albums/',
    update: '/data/albums/'
}

export async function getAllAlbums() {
    return api.get(endPoints.allAlbums);
}

export async function getAlbumById(albumId) {
    return api.get(endPoints.getById + albumId);
}

export async function create(album) {
    return api.post(endPoints.create, album);
}

export async function edit(albumId, album) {
    return api.put(endPoints.update + albumId, album)
}

export async function remove(albumId) {
    return api.del(endPoints.remove + albumId);
}

export async function search(query) {
    return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`)
}

