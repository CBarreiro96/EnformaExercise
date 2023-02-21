import hashlib
import json
import unittest

from faker import Faker

from app import app
from modelos import db,Usuario, Entrenador


class testEntrenador(unittest.TestCase):



    def setUp(self):
        self.data_factory = Faker()
        self.entrenador = app.test_client()
        self.entrenadores_creados = []
        self.usuarios_creados=[]

        self.nombre_usuario = 'test_' + self.data_factory.name()
        contrasena = 'T1$' + self.data_factory.word()
        contrasena_encriptada = hashlib.md5(contrasena.encode('utf-8')).hexdigest()

        # Se crea el usuario para identificarse en la aplicación
        usuario_nuevo = Usuario(usuario=self.nombre_usuario, contrasena=contrasena_encriptada)
        db.session.add(usuario_nuevo)
        db.session.commit()
        usuario = Usuario.query.filter(Usuario.usuario == self.nombre_usuario).first()
        self.usuarios_creados.append(usuario)

    def test_crear_entrenador (self):
        nombre_usuario = 'test_' + self.data_factory.name()
        contrasena = 'T1$' + self.data_factory.word()
        nombre_entrenador = 'test_' + self.data_factory.name()
        apllidos_entrenador = 'test_' + self.data_factory.name()
        usuario_entrenador = {
            "usuario": nombre_usuario,
            "contrasena": contrasena,
            "nombre": nombre_entrenador,
            "apellidos": apllidos_entrenador
        }

        entrenador_signup = self.entrenador.post("/signin",
                                           data=json.dumps(usuario_entrenador),
                                           headers={'Content-Type': 'application/json','status_code':200})


        respuesta_signup = json.loads(entrenador_signup.get_data())

        usuario_id = respuesta_signup["id"]

        usuario_entrenador = Usuario.query.filter(Usuario.usuario == nombre_usuario).first()


        self.usuarios_creados.append(usuario_entrenador)
        self.assertEqual(entrenador_signup.status_code, 200)
        self.assertIsNotNone(respuesta_signup['id'])
        self.assertEqual(respuesta_signup['mensaje'],"usuario creado exitosamente")

    def test_crear_entrenador_existente(self):
        nombre_usuario = self.nombre_usuario
        contrasena = 'T1$' + self.data_factory.word()
        nombre_entrenador = 'test_' + self.data_factory.name()
        apllidos_entrenador = 'test_' + self.data_factory.name()
        usuario_entrenador = {
            "usuario": nombre_usuario,
            "contrasena": contrasena,
            "nombre": nombre_entrenador,
            "apellidos": apllidos_entrenador
        }

        entrenador_signup = self.entrenador.post("/signin",
                                                 data=json.dumps(usuario_entrenador),
                                                 headers={'Content-Type': 'application/json'})

        respuesta_signup = json.loads(entrenador_signup.get_data())
        self.assertEqual(entrenador_signup.status_code, 404)
        self.assertEqual(respuesta_signup['mensaje'], "El usuario ya existe")
    def tearDown(self):
        for usuario_creado in self.usuarios_creados:
            usuario = Usuario.query.filter(Usuario.id == usuario_creado.id).first()
            db.session.delete(usuario)

        db.session.commit()
if __name__ == '__main__':
    unittest.main()
