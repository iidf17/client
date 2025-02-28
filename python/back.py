from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Static employees data
fake_employees_data = [
    {
        "id": 1,
        "lastName": "Иванов",
        "firstName": "Иван",
        "middleName": "Иванович",
        "birthDate": datetime.now().isoformat(),
        "email": "ivanov@mail.ru",
        "phoneNumber": "8-800-535-35-35"
    },
    # Add the rest of your fakeEmployeesData here
]

# API endpoint to get employees data
@app.route('/api/employees', methods=['GET'])
def get_employees():
    return jsonify(fake_employees_data)

# API endpoint for departments
@app.route('/Departments', methods=['GET'])
def get_departments():
    return jsonify({"message": "This is the departments endpoint"})

# Run the server
if __name__ == '__main__':
    app.run(debug=True, port=5000)