from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api

from modelos import db
from vistas import \
  VistaSignInTraining, VistaLogIn, \
  VistaPersona, VistaPersonas, \
  VistaEjercicio, VistaEjercicios, \
  VistaEntrenamiento, VistaEntrenamientos, VistaRutina, \
  VistaReporte, VistaEntrenadores, VistaRutinas, VistaEjercicioRutina, VistaCliente, VistaUsuarioPersona

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:admin@localhost:5432/enForma'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'frase-secreta'
app.config['PROPAGATE_EXCEPTIONS'] = True

app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

cors = CORS(app)

api = Api(app)
api.add_resource(VistaSignInTraining, '/signinTraining')
api.add_resource(VistaLogIn, '/login')
api.add_resource(VistaPersonas, '/personas/<int:id_usuario>')
api.add_resource(VistaPersona, '/persona/<int:id_persona>')
api.add_resource(VistaEjercicios, '/ejercicios')
api.add_resource(VistaEjercicio, '/ejercicio/<int:id_ejercicio>')
api.add_resource(VistaEntrenamientos, '/entrenamientos/<int:id_persona>')
api.add_resource(VistaEntrenamiento, '/entrenamiento/<int:id_entrenamiento>')
api.add_resource(VistaReporte, '/persona/<int:id_persona>/reporte')
api.add_resource(VistaEntrenadores, '/entrenadores')
api.add_resource(VistaRutina, '/rutina/<int:id_usuario>')
api.add_resource(VistaRutinas, '/rutinas/<int:id_usuario>')
api.add_resource(VistaCliente, '/signin/persona/<int:id_persona>')

api.add_resource(VistaEjercicioRutina, '/rutina-ejercicio')

api.add_resource(VistaUsuarioPersona, '/usuario/cliente/<int:id_usuario>')

jwt = JWTManager(app)

if __name__ == "__main__":
    app.run(debug=False)
