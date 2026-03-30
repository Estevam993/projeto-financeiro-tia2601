from repositories.UsuarioRepo import UsuarioRepo


class UsuarioService():
    def __init__(self, session):
        self.session = session

    def criar_usuario(self, nome, email, ):
        if not self.exist_user(email):
            usuario = UsuarioRepo.criar_usuario(nome, email)

            return usuario

        return "Email já existe"

    @staticmethod
    def exist_user(email):
        usuario = UsuarioRepo.procurar_usuario(email)
        return usuario is not None

    @staticmethod
    def get_usuario(email):
        usuario = UsuarioRepo.procurar_usuario(email)
        return usuario
