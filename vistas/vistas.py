from flask import request
from flask_jwt_extended import jwt_required, create_access_token
from flask_restful import Resource
from datetime import datetime
from .utilidad_reporte import UtilidadReporte
import hashlib

from modelos import \
  db, \
  Ejercicio, EjercicioSchema, \
  Persona, PersonaSchema, \
  Entrenamiento, EntrenamientoSchema, \
  Usuario, UsuarioSchema, Entrenador, Rutina, \
  ReporteGeneralSchema, ReporteDetalladoSchema, Roles, EntrenadorSchema, RutinaSchema

ejercicio_schema = EjercicioSchema()
persona_schema = PersonaSchema()
entrenamiento_schema = EntrenamientoSchema()
usuario_schema = UsuarioSchema()
reporte_general_schema = ReporteGeneralSchema()
reporte_detallado_schema = ReporteDetalladoSchema()
entrenador_schema = EntrenadorSchema()
rutina_schema = RutinaSchema()


class VistaSignIn(Resource):
  def post(self, rol):
    # Check if the user already exists
    usuario = Usuario.query.filter_by(usuario=request.json["usuario"]).first()
    if usuario is None:
      # Encrypt the password
      contrasena_encriptada = hashlib.md5(request.json["contrasena"].encode('utf-8')).hexdigest()
      nuevo_usuario = Usuario(usuario=request.json["usuario"], contrasena=contrasena_encriptada)

      if rol == Roles.ADMIN:
        nuevo_usuario.rol = Roles.ADMIN
        db.session.add(nuevo_usuario)
      elif rol == Roles.ENTRENADOR:
        nuevo_usuario.rol = Roles.ENTRENADOR
        db.session.add(nuevo_usuario)
        usuario_entrenador = Usuario.query.filter(Usuario.usuario == request.json["usuario"]).first()
        nuevo_entrenador = Entrenador(nombre=request.json["nombre"], apellidos=request.json["apellido"],
                                      usuario=usuario_entrenador.id)
        db.session.add(nuevo_entrenador)

      db.session.commit()

      return {"mensaje": "Usuario creado exitosamente", "id": nuevo_usuario.id}
    else:
      return {"mensaje": "El usuario ya existe"}, 404

  def put(self, id_usuario):
    # Update the user's password
    usuario = Usuario.query.get_or_404(id_usuario)
    usuario.contrasena = request.json.get("contrasena", usuario.contrasena)
    db.session.commit()

    return usuario_schema.dump(usuario)

  def delete(self, id_usuario):
    # Delete the user
    usuario = Usuario.query.get_or_404(id_usuario)
    db.session.delete(usuario)
    db.session.commit()

    return '', 204


class VistaSignInAdministrator(VistaSignIn):
  def post(self):
    # Call the parent class's post method with ADMIN role
    return super().post(Roles.ADMIN)


class VistaSignInTraining(VistaSignIn):
  def post(self):
    # Call the parent class's post method with ENTRENADOR role
    return super().post(Roles.ENTRENADOR)


class VistaLogIn(Resource):
  def post(self):
    # Encrypt the password
    contrasena_encriptada = hashlib.md5(request.json["contrasena"].encode('utf-8')).hexdigest()
    # Check if the user exists and the password is correct
    usuario = Usuario.query.filter(Usuario.usuario == request.json["usuario"],
                                   Usuario.contrasena == contrasena_encriptada).first()
    db.session.commit()
    if usuario is None:
      return "El usuario no existe", 404
    else:
      # Create an access token for the user
      token_de_acceso = create_access_token(identity=usuario.id)
      return {"mensaje": "Inicio de sesión exitoso", "token": token_de_acceso, "id": usuario.id,
              "rol": usuario.rol}


class VistaPersonas(Resource):
  @jwt_required()
  def get(self, id_usuario):
    entrenador = Entrenador.query.filter(Entrenador.usuario == id_usuario).first()
    return [persona_schema.dump(persona) for persona in entrenador.personas]

  @jwt_required()
  def post(self, id_usuario):
    usuario = Usuario.query.get_or_404(id_usuario)
    entrenador = Entrenador.query.filter(Entrenador.usuario == id_usuario).first()
    nueva_persona = Persona( \
      nombre=request.json["nombre"], \
      apellido=request.json["apellido"], \
      talla=float(request.json["talla"]), \
      peso=float(request.json["peso"]), \
      edad=float(request.json["edad"]), \
      ingreso=datetime.strptime(request.json["ingreso"], '%Y-%m-%d'), \
      brazo=float(request.json["brazo"]), \
      pecho=float(request.json["pecho"]), \
      cintura=float(request.json["cintura"]), \
      pierna=float(request.json["pierna"]), \
      entrenando=bool(request.json["entrenando"]), \
      razon=request.json["razon"], \
      terminado=datetime.strptime(request.json["terminado"], '%Y-%m-%d'), \
      entrenador=entrenador.id \
      )
    db.session.add(nueva_persona)
    db.session.commit()
    return persona_schema.dump(nueva_persona)


class VistaPersona(Resource):
  @jwt_required()
  def get(self, id_persona):
    return persona_schema.dump(Persona.query.get_or_404(id_persona))

  @jwt_required()
  def put(self, id_persona):
    persona = Persona.query.get_or_404(id_persona)
    persona.nombre = request.json["nombre"]
    persona.apellido = request.json["apellido"]
    persona.talla = float(request.json["talla"])
    persona.peso = float(request.json["peso"])
    persona.edad = float(request.json["edad"])
    persona.ingreso = datetime.strptime(request.json["ingreso"], '%Y-%m-%d')
    persona.brazo = float(request.json["brazo"])
    persona.pecho = float(request.json["pecho"])
    persona.cintura = float(request.json["cintura"])
    persona.pierna = float(request.json["pierna"])
    persona.entrenando = bool(request.json["entrenando"])
    persona.razon = request.json["razon"]
    persona.terminado = datetime.strptime(request.json["terminado"], '%Y-%m-%d')
    db.session.commit()
    return persona_schema.dump(persona)

  @jwt_required()
  def delete(self, id_persona):
    persona = Persona.query.get_or_404(id_persona)
    if not persona.entrenamientos:
      db.session.delete(persona)
      db.session.commit()
      return '', 204
    else:
      return 'La persona tiene entrenamientos asociados', 409


class VistaEjercicios(Resource):
  @jwt_required()
  def get(self):
    ejercicios = Ejercicio.query.all()
    ejercicios_ordenados = sorted(ejercicios, key=lambda ejercicio: ejercicio.nombre.lower())
    return [ejercicio_schema.dump(ejercicio) for ejercicio in ejercicios_ordenados]

  @jwt_required()
  def post(self):
    nuevo_ejercicio = Ejercicio( \
      nombre=request.json["nombre"], \
      descripcion=request.json["descripcion"], \
      video=request.json["video"], \
      calorias=float(request.json["calorias"]),
    )
    db.session.add(nuevo_ejercicio)
    db.session.commit()
    return ejercicio_schema.dump(nuevo_ejercicio)


class VistaEjercicio(Resource):
  @jwt_required()
  def get(self, id_ejercicio):
    return ejercicio_schema.dump(Ejercicio.query.get_or_404(id_ejercicio))

  @jwt_required()
  def put(self, id_ejercicio):
    ejercicio = Ejercicio.query.get_or_404(id_ejercicio)
    ejercicio.nombre = request.json["nombre"]
    ejercicio.descripcion = request.json["descripcion"]
    ejercicio.video = request.json["video"]
    ejercicio.calorias = float(request.json["calorias"])
    db.session.commit()
    return ejercicio_schema.dump(ejercicio)

  @jwt_required()
  def delete(self, id_ejercicio):
    ejercicio = Ejercicio.query.get_or_404(id_ejercicio)
    if not ejercicio.entrenamientos:
      db.session.delete(ejercicio)
      db.session.commit()
      return '', 204
    else:
      return 'El ejercicio tiene entrenamientos asociados', 409


class VistaEntrenamientos(Resource):
  @jwt_required()
  def get(self, id_persona):
    persona = Persona.query.get_or_404(id_persona)
    entrenamiento_array = []

    for entrenamiento in persona.entrenamientos:
      ejercicio = Ejercicio.query.get_or_404(entrenamiento.ejercicio)
      entrenamiento_schema_dump = entrenamiento_schema.dump(entrenamiento)
      entrenamiento_schema_dump['ejercicio'] = ejercicio_schema.dump(ejercicio)
      entrenamiento_array.append(entrenamiento_schema_dump)
    return [entrenamiento for entrenamiento in entrenamiento_array]

  @jwt_required()
  def post(self, id_persona):
    print(datetime.strptime(request.json["fecha"], '%Y-%m-%d'))
    nuevo_entrenamiento = Entrenamiento( \
      tiempo=datetime.strptime(request.json["tiempo"], '%H:%M:%S').time(), \
      repeticiones=float(request.json["repeticiones"]), \
      fecha=datetime.strptime(request.json["fecha"], '%Y-%m-%d').date(), \
      ejercicio=request.json["ejercicio"], \
      persona=id_persona
    )
    db.session.add(nuevo_entrenamiento)
    db.session.commit()
    return ejercicio_schema.dump(nuevo_entrenamiento)


class VistaEntrenamiento(Resource):
  @jwt_required()
  def get(self, id_entrenamiento):
    return entrenamiento_schema.dump(Entrenamiento.query.get_or_404(id_entrenamiento))

  @jwt_required()
  def put(self, id_entrenamiento):
    entrenamiento = Entrenamiento.query.get_or_404(id_entrenamiento)
    entrenamiento.tiempo = datetime.strptime(request.json["tiempo"], '%H:%M:%S').time()
    entrenamiento.repeticiones = float(request.json["repeticiones"])
    entrenamiento.fecha = datetime.strptime(request.json["fecha"], '%Y-%m-%d').date()
    entrenamiento.ejercicio = request.json["ejercicio"]
    entrenamiento.persona = request.json["persona"]
    db.session.commit()
    return entrenamiento_schema.dump(entrenamiento)

  @jwt_required()
  def delete(self, id_entrenamiento):
    entrenamiento = Entrenamiento.query.get_or_404(id_entrenamiento)
    db.session.delete(entrenamiento)
    db.session.commit()
    return '', 204


class VistaReporte(Resource):

  @jwt_required()
  def get(self, id_persona):
    reporte = []
    reporte_entrenamiento = []
    utilidad = UtilidadReporte()
    data_persona = Persona.query.get_or_404(id_persona)
    imc_calculado = utilidad.calcular_imc(data_persona.talla, data_persona.peso)
    clasificacion_imc_calculado = utilidad.dar_clasificacion_imc(imc_calculado)

    reporte_persona = dict(persona=data_persona, imc=imc_calculado, clasificacion_imc=clasificacion_imc_calculado)
    reporte_persona_schema = reporte_general_schema.dump(reporte_persona)

    for entrenamiento in data_persona.entrenamientos:
      data_entrenamiento = dict(fecha=entrenamiento.fecha, repeticiones=entrenamiento.repeticiones, calorias=1)
      reporte_entrenamiento.append(reporte_detallado_schema.dump(data_entrenamiento))

    reporte_persona_schema['resultados'] = utilidad.dar_resultados(data_persona.entrenamientos)

    return reporte_persona_schema


class VistaEntrenadores(Resource):

  @jwt_required()
  def get(self):
    entrenadores = Entrenador.query.all()
    entrenadores_ordenados = sorted(entrenadores, key=lambda entrenador: entrenador.nombre.lower())
    return [entrenador_schema.dump(entrenador) for entrenador in entrenadores_ordenados]


class VistaEntrenador(Resource):
  @jwt_required()
  def delete(self, id_entrenador):
    entrenador = Entrenador.query.get_or_404(id_entrenador)
    if not entrenador.personas:
      db.session.delete(entrenador)
      db.session.commit()
      return '', 204
    else:
      return 'La entrenador tiene entrenamientos personas', 409


class VistaRutina(Resource):
  @jwt_required()
  def post(self, id_usuario):

    entrenador = Entrenador.query.filter(Entrenador.usuario == id_usuario).first()
    if entrenador is None:
      return {"message:": "el entrenador no existe"}, 404
    elif self.validarNombreRutinaRepetido(request.json["nombre"]):
      return {"message:": "el nombre de rutina ya existe"}, 404
    else:
      rutina = Rutina(nombre=request.json["nombre"], descripcion=request.json["descripcion"],
                      entrenador=entrenador.id)
      db.session.add(rutina)
      db.session.commit()
      return rutina_schema.dump(rutina);

  @staticmethod
  def validarNombreRutinaRepetido(nombre):
    rutina = Rutina.query.filter(Rutina.nombre == nombre).first()
    if rutina is None:
      return False
    else:
      return True


class VistaEjercicioRutina(Resource):
  def put(self):
    id_rutina = request.json["id_rutina"]
    id_ejercicio = request.json["id_ejercicio"]
    rutina = Rutina.query.get_or_404(id_rutina)
    cantidad_ejercicios = len(rutina.ejercicios)
    if cantidad_ejercicios < 5:
      ejercicio = Ejercicio.query.get_or_404(id_ejercicio)
      rutina.ejercicios.append(ejercicio)
      db.session.commit()
      return rutina_schema.dump(rutina), 201
    else:
      return {"message": "no se pueden agregar mas de 5 ejercicios"}, 404


class VistaRutinas(Resource):
  @jwt_required()
  def get(self, id_usuario):
    rutinas = Rutina.query.all()
    rutinas_ordenadas = sorted(rutinas, key=lambda rutina: rutina.nombre.lower())
    return [rutina_schema.dump(rutina) for rutina in rutinas_ordenadas]


class VistaCliente(Resource):

  def post(self, id_persona):
    persona = Persona.query.filter(Persona.id == id_persona).first()
    if persona and persona.usuario: return {"mensaje": "La persona ya tiene asociado un usuario"}, 409
    usuario = Usuario.query.filter(Usuario.usuario == request.json["usuario"]).first()
    if usuario is None:
      nuevo_usuario = self.crear_usuario_persona(persona)
      return {"mensaje": "usuario creado exitosamente", "id": nuevo_usuario.id}
    else:
      return {"mensaje": "El usuario ya existe"}, 404

  def crear_usuario_persona(self, persona):
    contrasena_encriptada = hashlib.md5(request.json["contrasena"].encode('utf-8')).hexdigest()
    nuevo_usuario = Usuario(usuario=request.json["usuario"], contrasena=contrasena_encriptada,
                            rol=Roles.CLIENTE)
    db.session.add(nuevo_usuario)
    db.session.commit()
    persona.usuario = nuevo_usuario.id
    db.session.commit()

    return nuevo_usuario


class VistaUsuarioPersona(Resource):
  def get(self, id_usuario):
    persona = Persona.query.filter(Persona.usuario == id_usuario).first()
    return persona_schema.dump(persona);
