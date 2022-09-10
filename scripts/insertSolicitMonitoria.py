import psycopg2
from faker import Faker
from random import randint

QUANTIDADE_INSERTS = 5
STATUS = 0

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

        postgreSQL_select_Query = """select * from "aluno" ORDER BY random() LIMIT 1"""
        cursor.execute(postgreSQL_select_Query)
        matricula_aluno = cursor.fetchone()

        postgreSQL_select_Query = """select * from "disciplina" ORDER BY random() LIMIT 1"""
        cursor.execute(postgreSQL_select_Query)
        codigo_disciplina = cursor.fetchone()

        postgres_insert_query = """ INSERT INTO "solicitacao_monitoria"(codigo_disciplina, status, matricula_aluno) VALUES (%s,%s,%s)"""
        record_to_insert = (codigo_disciplina[0], STATUS, matricula_aluno[0])
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