import psycopg2
from faker import Faker
from random import randint
import unidecode

QUANTIDADE_INSERTS = 10
SENHACOLABORADOR = '$2a$08$6nt80mNogAPtAMBtAlrUIeqUzykE/PEnZk1b6t10n1hFdqDkXmToy' # 123456
TIPOCOLABORADOR = 'Professor'

Faker.seed(randint(10000,20000))
fake = Faker('pt_BR')

try:
    connection = psycopg2.connect(user="bnfepksdejvhlk",
                                  password="a0f0042e009f50ced36050064d1f560a99c905c504c3556cd6f2bffccf9c6b7b",
                                  host="ec2-34-227-135-211.compute-1.amazonaws.com",
                                  port="5432",
                                  database="d7959hnpnblal4")
    cursor = connection.cursor()


    for _ in range(QUANTIDADE_INSERTS):
        nome = fake.name()
        if "." in nome: 
            nome = nome.split(" ",1)[1]
        nome = unidecode.unidecode(nome)
        ultimoNome = nome.split(' ')[-1]
        email = nome.replace(" ","")


        postgres_insert_query = """ INSERT INTO "colaborador" (nome, cpf, email, senha, role) VALUES (%s,%s,%s,%s, %s)"""
        record_to_insert = (nome, fake.cpf(), nome[0:4] + ultimoNome + '@up.edu.br', SENHACOLABORADOR, TIPOCOLABORADOR)
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