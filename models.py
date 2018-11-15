from .app import db

class marijuana(db.Model):
    __tablename__ = 'marijuana'
    
    id = db.Column(db.Integer, primary_key=True)
    
    
    def __repr__(self):
        return '<marijuana %r>' % (self.name)
