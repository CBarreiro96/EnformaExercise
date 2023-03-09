import json
from unittest import TestCase

from faker import Faker
from app import app
from modelos import db, Rutina, Ejercicio
class TestRutina_ejercicio(TestCase):
    def setUp(self):
        self.data_factory = Faker()
        self.client = app.test_client()
        self.id_rutina =0;
        self.id_ejercicio =0;

        id_rutina = self.data_factory.random_number(digits=5)

        nombre_rutina = 'test_' + self.data_factory.name()
        descripcion_rutina = 'test_'+  self.data_factory.name()



        rutina = Rutina (id=id_rutina, nombre =nombre_rutina, descripcion = descripcion_rutina)
        db.session.add(rutina)

        id_ejercicio = self.data_factory.random_number(digits=5)
        nombre_ejercicio = 'test_' + self.data_factory.name()
        descripcion_ejercicio = 'test_' + self.data_factory.name()
        video_ejercicio = self.data_factory.image_url()

        calorias_ejercicio = self.data_factory.random_number(digits=5)

        ejercicio = Ejercicio (id=id_ejercicio,
                               nombre=nombre_ejercicio,
                               descripcion = descripcion_ejercicio,
                               video = video_ejercicio,
                               calorias = calorias_ejercicio
                               )

        db.session.add(ejercicio)
        db.session.commit()
        self.id_rutina =id_rutina
        self.id_ejercicio = id_ejercicio

    def test_agregar_ejercicio_rutina(self):

        rutina_ejercicio = {
            "id_rutina": self.id_rutina,
            "id_ejercicio": self.id_ejercicio
        }
        headers = {'Content-Type': 'application/json'}

        result_ejercicio_rutina = self.client.put(
            "/rutina-ejercicio",
            data = json.dumps(rutina_ejercicio),
            headers = headers
        )


        self.assertEqual(result_ejercicio_rutina.status_code, 201)


