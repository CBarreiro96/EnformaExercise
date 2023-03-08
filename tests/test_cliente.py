import json
import unittest


from faker import Faker

from app import app
from modelos import db, Usuario, Roles


class testEntrenador(unittest.TestCase):

    def setUp(self):
        self.data_factory = Faker()
        self.cliente = app.test_client()
        self.usuarios_creados = []

    def tearDown(self):
        for usuario_creado in self.usuarios_creados:
            usuario = Usuario.query.filter(Usuario.id == usuario_creado.id).first()
            db.session.delete(usuario)

        db.session.commit()

    def test_crear_credenciales_cliente(self):
        nombre_usuario = 'test_' + self.data_factory.name()
        contrasena = 'T1$' + self.data_factory.word()
        usuario = {
            "usuario": nombre_usuario,
            "contrasena": contrasena
        }
        cliente_signup = self.cliente.post("/signin/cliente",
                                           data=json.dumps(usuario),
                                           headers={'Content-Type': 'application/json', 'status_code': 200})
        respuesta_signup = json.loads(cliente_signup.get_data())
        usuario = Usuario.query.filter(Usuario.usuario == nombre_usuario).first()
        self.usuarios_creados.append(usuario)
        self.assertEqual(cliente_signup.status_code, 200)
        self.assertIsNotNone(respuesta_signup['id'])
        self.assertEqual(usuario.rol, Roles.CLIENTE )
        self.assertEqual(respuesta_signup['mensaje'], "usuario creado exitosamente")


