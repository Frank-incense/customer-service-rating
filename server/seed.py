from server.models import User, Business, Category, Post
from server.app import app, db
from faker import Faker


with app.app_context():
    fake = Faker()
    db.drop_all()
    db.create_all()

    logos ={
        'airtel': '/airtel-seeklogo.png',
        'carrefour': '/carrefour-seeklogo.png',
        'doubletree': '/doubletree-by-hilton-seeklogo.png',
        'emirates': '/emirates-airline-seeklogo.png',
        'kfc': '/kfc-new-seeklogo.png',
        'equity': '/equity-bank-seeklogo.png',
        'm-pesa': '/mpesa-seeklogo.png',
        'safaricom': '/safaricom-new-seeklogo.png',
        'naivas-supermarket': '/naivas-supermarket-seeklogo.png',
        'qatar-airways': '/qatar-airways-seeklogo.png',
        'kcb-group': '/kcb-group-plc-seeklogo.png',
        'jw-marriott': '/jw-marriott-hotel-resorts-seeklogo.png',
        'shell': '/shell-seeklogo.png',
        'turkish-airlines': '/turkish-airlines-seeklogo.png',
        'stanbic': '/stanbic-bank-seeklogo.png',
        'standard-chartered': '/standard-chartered-bank-seeklogo.png',
        'standard-group': '/standard-group-plc-seeklogo.png',
        'quickmart-supermarket': '/quickmark-supermarket-seeklogo.png',

    }

    categories = ['Banking and Financial Services',
                        'Food & Beverage',
                        'Retail & Shops',
                        'Health & Wellness',
                        'Telecommunication',
                        'Transport and logistics',
                        'Hotel & Hospitality']
    
    cats = [Category(category=c)for c in categories]

    db.session.add_all(cats)
    db.session.commit()
    user1 = User(email="frank@frank.com")
    user1.password_hash = 'test1234'

    db.session.add(user1)
    db.session.commit()

    users = [User(email=fake.email()) for i in range(10)]
    for user in users:
        user.password_hash = fake.password()

    db.session.add_all(users)
    db.session.commit()

    businesses = [Business(slug=name, logo_url=logos[name]) for name in logos.keys()]

    db.session.add_all(businesses)
    db.session.commit()

    posts = []
    for business in businesses:
        for _ in range(5):
            post = Post(
                rating=fake.random_int(min=1, max=5),
                content=fake.text(),
                location=fake.city(),
                business_id=business.id,
                user_id=fake.random_element(users).id
            )
            posts.append(post)
    db.session.add_all(posts)
    db.session.commit()