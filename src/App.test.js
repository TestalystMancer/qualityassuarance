import { fetchAlbums, fetchPhotos, fetchUsers, fetchAlbumById, fetchPhotoById, fetchUserById } from './api';

describe('JSONPlaceholder API Tests', () => {
    test('fetchAlbums should return a list of albums', async () => {
        const albums = await fetchAlbums();
        expect(albums.length).toBeGreaterThan(0);
        expect(albums[0]).toHaveProperty('id');
        expect(albums[0]).toHaveProperty('title');
    });

    test('fetchPhotos should return a list of photos', async () => {
        const photos = await fetchPhotos();
        expect(photos.length).toBeGreaterThan(0);
        expect(photos[0]).toHaveProperty('id');
        expect(photos[0]).toHaveProperty('title');
        expect(photos[0]).toHaveProperty('url');
    });

    test('fetchUsers should return a list of users', async () => {
        const users = await fetchUsers();
        expect(users.length).toBeGreaterThan(0);
        expect(users[0]).toHaveProperty('id');
        expect(users[0]).toHaveProperty('name');
    });

    test('fetchAlbumById should return a single album', async () => {
        const album = await fetchAlbumById(1);
        expect(album).toHaveProperty('id', 1);
        expect(album).toHaveProperty('title');
    });

    test('fetchPhotoById should return a single photo', async () => {
        const photo = await fetchPhotoById(1);
        expect(photo).toHaveProperty('id', 1);
        expect(photo).toHaveProperty('title');
        expect(photo).toHaveProperty('url');
    });

    test('fetchUserById should return a single user', async () => {
        const user = await fetchUserById(1);
        expect(user).toHaveProperty('id', 1);
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
    });
});
