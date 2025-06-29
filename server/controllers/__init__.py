from server.controllers.auth_controller import Login, Register, UserProfile, Logout
from server.controllers.business_controller import Dashboard, BusinessController, BusinessDetail, BusinessById
from server.controllers.post_controller import Posts

def addResource(api):
    api.add_resource(Login, '/api/login')
    api.add_resource(Register, '/api/register')
    api.add_resource(Dashboard, '/api/dashboard')
    api.add_resource(BusinessController, '/api/business')
    api.add_resource(BusinessDetail, '/api/business/<string:slug>')
    api.add_resource(Posts, '/api/posts')
    api.add_resource(UserProfile, '/api/user/profile')
    api.add_resource(Logout, '/api/logout')
    api.add_resource(BusinessById, '/api/business/<int:id>')