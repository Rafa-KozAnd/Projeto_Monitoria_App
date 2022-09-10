import psycopg2
from faker import Faker
from random import randint
import unidecode

QUANTIDADE_INSERTS = 10
SENHAALUNO = "$2a$08$5EaDiHONXtRoOrt.BVhrz.ovxPwAVDcafBebypgQy5p0tFe3Gd8QC" # 123
MONITOR = True

Faker.seed(randint(0,10000))
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
        primeiroNome = nome.split(' ')[0]
        email = nome[0:len(primeiroNome)+4]
        email = email.replace(" ","")


        postgres_insert_query = """ INSERT INTO "aluno" (matricula, nome, senha, email, telefone, e_monitor) VALUES (%s,%s,%s,%s,%s,%s)"""
        record_to_insert = (randint(10000000,99999999), nome, SENHAALUNO, email + '@' + fake.free_email_domain(), fake.msisdn(), MONITOR)
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