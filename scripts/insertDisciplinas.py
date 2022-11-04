import psycopg2
import random

QUANTIDADE_DE_DISCIPLINAS_POR_PROFESSOR = 0         #0 é random de 1 a 5 disciplinas para cada professor
QUANTIDADE_PROFESSOR = 5                            #Nº de professores que vão ganhar disciplinas

disciplinas = """Algebra e Teoria Elementar dos Numeros
Calculo Diferencial e Integral I
Calculo Diferencial e Integral II
Gestão de Projetos
Logica Matematica
Algoritmos e Logica de Programação
Engenharia Economica
Sistemas e Redes de Comunicação
Banco de dados
Programação de Computadores
Sistemas Computacionais de Base
Computação em Nuvem
Desenvolvimento de Software
Desenvolvimento Web Basico
Matematica Discreta
Estrutura de Dados Aplicadas
Interface Humano-Computador
Engenharia de Software
Calculo Numerico
Arquitetura de Sistemas Computacionais
Sistemas Inteligentes
Sistemas Inteligentes Avançados
Programação de Computadores Avançada
Pesquisa Aplicada e Meio Ambiente
Probabilidade e Estatistica
Programação Distribuida
Criptografia e Segurança de Sistemas Computacionais
Desenvolvimento de Aplicativos Moveis
Padroes de Projetos
Ciencias Economicas e Administrativas
Programação Concorrente
Computação Embarcada
Modelagem Computacional"""
listadisp = disciplinas.split("\n")



try:
    connection = psycopg2.connect(user="bnfepksdejvhlk",
                                  password="a0f0042e009f50ced36050064d1f560a99c905c504c3556cd6f2bffccf9c6b7b",
                                  host="ec2-34-227-135-211.compute-1.amazonaws.com",
                                  port="5432",
                                  database="d7959hnpnblal4")
    cursor = connection.cursor()


    for _ in range(QUANTIDADE_PROFESSOR):

        postgreSQL_select_Query = """select * from "colaborador" WHERE (role = 'Professor') ORDER BY random() LIMIT 2"""
        cursor.execute(postgreSQL_select_Query)
        professor = cursor.fetchone()

        if (QUANTIDADE_DE_DISCIPLINAS_POR_PROFESSOR == 0):
            numeromaterias = random.randint(1,5)
        else:
            numeromaterias = QUANTIDADE_DE_DISCIPLINAS_POR_PROFESSOR
        
        disciplinas = random.sample(listadisp,numeromaterias)

        for i in range(numeromaterias):

            postgres_insert_query = """ INSERT INTO "disciplina" (codigo_disciplina, professor_disciplina, nome) VALUES (%s,%s,%s)"""
            record_to_insert = (random.randint(1000000,2000000), professor[0], disciplinas[i])
            cursor.execute(postgres_insert_query, record_to_insert)

            connection.commit()
            count = cursor.rowcount
            print(count, "Record inserted successfully into table")

except (Exception, psycopg2.Error) as error:
    print("Failed to insert record into table", error)

finally:
    # closing database connection.
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")