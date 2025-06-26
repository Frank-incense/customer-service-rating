from server.controllers.auth_controller import Login, Register


def addResource(api):
    api.add_resource(Login, '/api/login')
    api.add_resource(Register, '/api/register')