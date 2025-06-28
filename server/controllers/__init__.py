from server.controllers.auth_controller import Login, Register
from server.controllers.business_controller import Dashboard, BusinessController
from server.controllers.post_controller import Post

def addResource(api):
    api.add_resource(Login, '/api/login')
    api.add_resource(Register, '/api/register')
    api.add_resource(Dashboard, '/api/dashboard')
    api.add_resource(BusinessController, '/api/business')
    api.add_resource(Post, '/api/post')