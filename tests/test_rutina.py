import hashlib
import json
from unittest import TestCase

from faker import Faker

from app import app
from modelos import db, Usuario, Entrenador, Rutina


class TestEjercicio(TestCase):

    def setUp(self):
        self.data_factory = Faker()
        self.client = app.test_client()
        nombre_usuario = 'test_' + self.data_factory.name()
        contrasena = 'T1$' + self.data_factory.word()

        nombre_entrenador = 'test_' + self.data_factory.name()
        apellido_entrenador = 'test_' + self.data_factory.name()
        contrasena_encriptada = hashlib.md5(contrasena.encode('utf-8')).hexdigest()

        self.rutinas_creadas = []
        self.listar_rutinas_creadas = []
        self.entrenador_id = -1
        # Se crea el usuario para identificarse en la aplicación
        usuario_nuevo = Usuario(usuario=nombre_usuario, contrasena=contrasena_encriptada, rol="Entrenador")
        db.session.add(usuario_nuevo)
        db.session.commit()

        usuario_login = {
            "usuario": nombre_usuario,
            "contrasena": contrasena

        }

        solicitud_login = self.client.post("/login",
                                           data=json.dumps(usuario_login),
                                           headers={'Content-Type': 'application/json'})

        respuesta_login = json.loads(solicitud_login.get_data())

        self.token = respuesta_login["token"]
        self.usuario_id = respuesta_login["id"]

        entrenador = Entrenador(nombre=nombre_entrenador, apellidos=apellido_entrenador, usuario=respuesta_login["id"])
        db.session.add(entrenador)
        db.session.commit()
        usuario = Usuario.query.filter(Usuario.usuario == nombre_usuario).first()
        self.usuario_creado = usuario
        entrenador = Entrenador.query.filter(Entrenador.nombre == nombre_entrenador).first()

        self.entrenador_id = entrenador.id;

    def tearDown(self):
        for rutina_creada in self.rutinas_creadas:
            rutina_creada = Rutina.query.get(rutina_creada.id)
            db.session.delete(rutina_creada)
            db.session.commit()
        entrenador = Entrenador.query.filter(Entrenador.id == self.entrenador_id).first()
        db.session.delete(entrenador)

        usuario = Usuario.query.filter(Usuario.id == self.usuario_id).first()
        db.session.delete(usuario)
        db.session.commit()

    def test_crear_rutina(self):
        nombre = 'test_' + self.data_factory.name()
        descripcion = "test_" + self.data_factory.text()
        # Crear el json con el ejercicio a crear
        rutina = {
            "nombre": nombre,
            "descripcion": descripcion
        }
        endpoint_ejercicios = "/rutina/" + str(self.usuario_id)
        headers = {'Content-Type': 'application/json', "Authorization": "Bearer {}".format(self.token)}
        resultado_nuevo_nueva = self.client.post(endpoint_ejercicios,
                                                 data=json.dumps(rutina),
                                                 headers=headers)

        datos_respuesta = json.loads(resultado_nuevo_nueva.get_data())
        rutina = Rutina.query.get(datos_respuesta['id'])
        self.rutinas_creadas.append(rutina)
        self.assertEqual(resultado_nuevo_nueva.status_code, 200)
        self.assertEqual(datos_respuesta['nombre'], rutina.nombre)
        self.assertEqual(datos_respuesta['descripcion'], rutina.descripcion)
        self.assertEqual(datos_respuesta["entrenador"], str(self.entrenador_id))

    def test_listar_rutinas(self):
        # Generar 10 rutinas con datos aleatorios
        for i in range(0, 10):
            # Crear los datos de la rutina
            nombre_rutina = self.data_factory.sentence()
            descripcion_rutina = self.data_factory.sentence()
            entrenador = Entrenador.query.filter(Entrenador.usuario == self.usuario_id).first()
            # Crear la rutina con los datos originales para obtener su id
            rutina = Rutina(nombre=nombre_rutina,
                            descripcion=descripcion_rutina,
                            entrenador=entrenador.id)
            db.session.add(rutina)
            db.session.commit()
            self.listar_rutinas_creadas.append(rutina)

        # Definir endpoint, encabezados y hacer el llamado
        endpoint_rutinas = "/rutinas/" + str(self.usuario_id)
        headers = {'Content-Type': 'application/json', "Authorization": "Bearer {}".format(self.token)}

        resultado_consulta_entrenadores = self.client.get(endpoint_rutinas,
                                                          headers=headers)

        # Obtener los datos de respuesta y dejarlos un objeto json
        datos_respuesta = json.loads(resultado_consulta_entrenadores.get_data())

        # Verificar que el llamado fue exitoso
        self.assertEqual(resultado_consulta_entrenadores.status_code, 200)

        # Verificar las rutinas creadas con sus datos
        for rutina in datos_respuesta:
            for rutina_creada in self.listar_rutinas_creadas:
                if rutina['id'] == str(rutina_creada.id):
                    self.assertEqual(rutina['nombre'], rutina_creada.nombre)
                    self.assertEqual(rutina['descripcion'], rutina_creada.descripcion)
                    self.assertEqual(rutina['entrenador'], str(rutina_creada.entrenador))
