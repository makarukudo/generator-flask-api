from lib import db
from lib.core.db_audit_mixin import AuditMixin
from lib.core.db_base import BaseMixinNoId

class Base(AuditMixin, BaseMixinNoId, db.Model):
    __abstract__ = True


class <%= model %>(Base):
    __bind_key__    = 'default'
    __tablename__   = '<%= name.plural %>'
    <%- createSchemaFields(fields) %>

    def __init__(self, <%- createParamFields(fields) %>):
        <%- createInitFields(fields) %>

    def serialize(self):
        <%- createSerializeFields(fields) %>
