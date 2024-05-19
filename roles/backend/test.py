import unittest
from app import app

data = {
    "_id": "",
    "name": "Jack",
    "yob": "2003",
    "email": "Jack@jack.com",
    "phonenumber": "11111111",
    "gender": "Nam",
    "university": "Harvard",
    "country": "USA"
}
updated_data = {
    "_id": '',
    "name": "Jack New",
    "yob": "2003",
    "email": "Jack@jack.com",
    "phonenumber": "11111111 new",
    "gender": "Nam",
    "university": "Harvard new",
    "country": "USA new "
}
class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.client = app.test_client()

    def test_get_all_students(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_add_student(self):
        response = self.client.post('/add', json=data)
        self.assertEqual(response.status_code, 200)

    def test_get_student(self):
        # thêm sv vào db
        response = self.client.post('/add', json=data)
        _id = response.get_json()['_id']
        response = self.client.get(f'/detail/{_id}')
        response_student = response.get_json()
        response_student['_id'] = '' # không quan tâm id
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data, response_student)
    
    def test_update_student(self):
        # thêm một student vào db
        # response trả về student đó
        response = self.client.post('/add', json=data)
        _id = response.get_json()['_id']
        # cập nhật lại student với _id của student vừa thêm
        response = self.client.post(f'/update/{_id}', json=updated_data)
        updated_data['_id'] = _id # cập nhật lại id
        # print(response.get_json())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(updated_data, response.get_json())
    
    def test_delete_student(self):
        # thêm một student vào db
        # response trả về student đó
        response = self.client.post('/add', json=data)
        _id = response.get_json()['_id']
        response = self.client.post(f'/delete/{_id}')
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    unittest.main()