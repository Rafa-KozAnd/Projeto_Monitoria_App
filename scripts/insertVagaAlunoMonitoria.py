import psycopg2
from faker import Faker
from random import randint

QUANTIDADE_INSERTS = 5
STATUS = 1

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
        postgreSQL_select_Query = """select * from "aluno" WHERE (e_monitor = true) ORDER BY random() LIMIT 1"""
        cursor.execute(postgreSQL_select_Query)
        aluno = cursor.fetchone()

        postgreSQL_select_Query = """select * from "vaga_monitoria" ORDER BY random() LIMIT 1"""
        cursor.execute(postgreSQL_select_Query)
        monitoria = cursor.fetchone()

        postgres_insert_query = """ INSERT INTO "vaga_aluno_monitoria" (matricula_aluno, id_vaga, status) VALUES (%s,%s,%s)"""
        record_to_insert = (aluno[0], monitoria[0], STATUS)
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