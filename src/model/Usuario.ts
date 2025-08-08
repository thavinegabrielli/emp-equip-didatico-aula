import { DatabaseModel } from "./DatabaseModel.js";

const dataBase = new DatabaseModel().pool;

export class Usuario {
    private idUsuario: number = 0;
    private nome: string;
    private tipoUsuario: string;
    private contato: string;
    
    public constructor (_nome:string, _tipoUsuario:string, _contato:string){
        this.nome = _nome;
        this.tipoUsuario = _tipoUsuario;
        this.contato = _contato;
    }

    public getidUsuario(): number{
        return this.idUsuario;
    }

    public setidUsuario(_idUsuario:number):void{
        this.idUsuario = _idUsuario;
    }

 public getnome(): string{
        return this.nome;
    }

    public setnome(_nome:string):void{
        this.nome = _nome;
    }

     public gettipoUsuario(): string{
        return this.tipoUsuario;
    }

    public settipoUsuario(_tipoUsuario:string):void{
        this.nome = this.tipoUsuario;
    }

     public getcontato(): string{
        return this.contato;
    }

    public setcontato(_contato:string):void{
        this.nome = this.contato;
    }

    static async listarUsuarios(): Promise<Array<Usuario> | null> {
        // Criando lista vazia para armazenar os alunos
        let listaDeUsuarios: Array<Usuario> = [];

        try {
            // Query para consulta no banco de dados
            const querySelectUsuario = `SELECT * FROM Usuario;`;

            // executa a query no banco de dados
            const respostaBD = await dataBase.query(querySelectUsuario);    

            // percorre cada resultado retornado pelo banco de dados
            // usuario é o apelido que demos para cada linha retornada do banco de dados
            respostaBD.rows.forEach((usuario: any) => {
                
                // criando objeto usuario
                let novoUsuario = new Usuario(
                    usuario.nome,
                    usuario.tipo_usuario,
                    usuario.contato
                );
                // adicionando o ID ao objeto
                novoUsuario.setidUsuario(usuario.id_usuario);
                
                // adicionando o usuario a lista
                listaDeUsuarios.push(novoUsuario);
            });

            // retornado a lista de usuarios para quem chamou a função
            return listaDeUsuarios;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

}