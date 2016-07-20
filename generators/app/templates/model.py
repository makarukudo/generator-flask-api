from lib import db
from lib.core.db_audit_mixin import AuditMixin
from lib.core.db_base import BaseMixin

class Base(AuditMixin, BaseMixin, db.Model):
    __abstract__ = True


class <%= name_upper %>(Base):
    __bind_key__    = 'default'
    __tablename__   = '<%= name %>s'
    id              = db.Column(db.Integer, db.Sequence('<%= name %>_seq'), primary_key=True, nullable=False)
    name            = db.Column(db.String(80), nullable=False, server_default=db.text("''"))

    def __init__(self, name):
        self.name = name

    def serialize(self):
        return {
          'name': self.name
        }
