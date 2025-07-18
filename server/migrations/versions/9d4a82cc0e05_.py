"""empty message

Revision ID: 9d4a82cc0e05
Revises: 6887300de673
Create Date: 2025-06-27 15:27:35.606383

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9d4a82cc0e05'
down_revision = '6887300de673'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('category', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'categories', ['category_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('category_id')

    op.drop_table('categories')
    # ### end Alembic commands ###
