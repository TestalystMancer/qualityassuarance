import requests

BASE_URL = "https://jsonplaceholder.typicode.com"

def test_fetch_albums():
    response = requests.get(f"{BASE_URL}/albums")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert "id" in data[0]
    assert "title" in data[0]


def test_fetch_photos():
    response = requests.get(f"{BASE_URL}/photos")
    assert response.status_code == 200
    
    data = response.json()
    assert len(data) > 0

    first_photo = data[0]
    assert "id" in first_photo
    assert "title" in first_photo
    assert "url" in first_photo

    # Fetch the image URL
    image_url = first_photo["url"]
    image_response = requests.get(image_url)

    # Validate image response
    assert image_response.status_code == 200
    assert "image" in image_response.headers["Content-Type"], "URL does not return an image"

def test_fetch_users():
    response = requests.get(f"{BASE_URL}/users")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert "id" in data[0]
    assert "name" in data[0]
    assert "email" in data[0]

def test_fetch_album_by_id():
    response = requests.get(f"{BASE_URL}/albums/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert "title" in data

def test_fetch_photo_by_id():
    response = requests.get(f"{BASE_URL}/photos/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert "title" in data
    assert "url" in data

def test_fetch_user_by_id():
    response = requests.get(f"{BASE_URL}/users/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert "name" in data
    assert "email" in data
