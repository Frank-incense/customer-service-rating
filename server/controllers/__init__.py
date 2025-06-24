from server.app import api
from server.controllers.auth_controller import Login, Register


def addResource():
    api.add_resource(Login, '/login')
    api.add_resource(Register, '/register')