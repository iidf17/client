from flask import Flask, jsonify, request
from flask_cors import CORS  
from datetime import datetime
import uuid
import secrets

app = Flask(__name__)
CORS(app)  

def generate_token():
    return secrets.token_hex(16)

fake_users = [{
    "id": 1,
    "login": 'user1',
    "password": '1234',
    "role": 'user'
},{
    "id": 2,
    "login": 'user2',
    "password": '12345',
    "role": 'manager'
},{
    "id": 3,
    "login": 'user3',
    "password": '123456',
    "role": 'admin'
}]

fake_employees_data_2 = [
    { "id": 1, "firstName": 'Dan', "lastName": 'Radcliff', "files" : [{
            "id":1,
            "systemName": "iiiffiiif",
            "displayName": "file1.txt"
        }]},
    { "id": 2, "firstName": 'Rupert', "lastName": 'Green'},
    { "id": 3 , "firstName": 'Albus', "lastName":'Potter', "middleName": 'Severus', 
        "education": [{
            "id":1,
            "description":'VSTU',
            "title": 'VSTU'
        }, {
            "id":2,
            "description":'Griffindor faculty',
            "title": 'Hogwarts witchcraft and wizardry school'
        }],
        "workExperience": [{
            "id":1,
            "description":'Ministry of magic',
            "workedYears": 3
        }]
    }
]

fake_employees_data_3 = [
    { "id": 1, "firstName": 'Alex', "lastName": "O'Riley"},
    { "id": 2, "firstName": 'Dolores', "lastName": "O'Riordan", 
     "files" : [{
            "id":1,
            "systemName": "iiiffiiif",
            "displayName": "file1.txt"
        }]},
    { "id": 3 , "firstName": 'Dave', "lastName":'Grohl', "middleName": 'Eric', 
        "education": [{
            "id":1,
            "description":'Used to be drums',
            "title": 'Pillows'
        }],
        "workExperience": [{
            "id":1,
            "description":'Nirvana, Drummer',
            "workedYears": 4
        },{
            "id":2,
            "description":'Queens of the stone age, Drummer',
            "workedYears": 2
        },{
            "id":3,
            "description":'Foo Fighters, Frontman',
            "workedYears": 31
        }]
    }
]

departments = [
    { "id": 1, "name": 'otdel 1', "employees": []}, 
    { "id": 2, "name": 'otdel 2', "employees": fake_employees_data_2},
    { "id": 3, "name": 'otdel 3',  "employees": fake_employees_data_3},
    { "id": 4, "name": 'otdel 4',  "employees": []}
]


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data or 'login' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid request'}), 400
    
    if any(user['login'] == data['login'] for user in fake_users):
        return jsonify({'error': 'User already exists'}), 400
    
    new_user = {
        'id': str(uuid.uuid4()),
        'login': data['login'],
        'password': data['password'], 
        'role': 'user'
    }
    fake_users.append(new_user)
    return jsonify({'message': 'Registration successful'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = next((u for u in fake_users if u['login'] == data.get('login')), None)
    
    if not user or user['password'] != data.get('password'):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    return jsonify({
        'access_token': generate_token(),
        'username': user['login'],
        'role': user['role']
    }), 200


@app.route('/Departments', methods=['GET'])
def get_departments():
    return jsonify(departments), 200

@app.route('/Departments/department', methods=['POST'])
def add_department():
    data = request.json
    if not data.get('name'):
        return jsonify({'error': 'Name is required'}), 400
    
    new_dept = {
        'id': len(departments) + 1,
        'name': data['name'],
        'description': data.get('description', '')
    }
    departments.append(new_dept)
    return jsonify(new_dept), 201

@app.route('/Departments/department', methods=['PUT'])
def update_department():
    data = request.json
    department = next((d for d in departments if d['id'] == data.get('id')), None)
    
    if not department:
        return jsonify({'error': 'Department not found'}), 404
    
    department.update({
        'name': data.get('name', department['name']),
        'description': data.get('description', department['description'])
    })
    return jsonify(department), 200

@app.route('/Departments/department', methods=['DELETE'])
def delete_department():
    id_to_delete = request.args.get('id')
    if not id_to_delete:
        return jsonify({'error': 'ID is required'}), 400
    
    global departments
    departments = [d for d in departments if str(d['id']) != id_to_delete]
    return jsonify({'message': 'Department deleted'}), 200

@app.route('/getUsers', methods=['GET'])
def get_users():
    return jsonify(fake_users), 200



if __name__ == '__main__':
    app.run(port=5000, debug=True)