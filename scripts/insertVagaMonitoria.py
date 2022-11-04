import psycopg2

QUANTIDADE_INSERTS = 5
APROVADO = False
PREREQUISITO = ''

try:
    connection = psycopg2.connect(user="postgres",
                                  password="postgres",
                                  host="localhost",
                                  port="5432",
                                  database="TCC")
    cursor = connection.cursor()


    for _ in range(QUANTIDADE_INSERTS):
        postgreSQL_select_Query = """select * from "monitoria" ORDER BY random() LIMIT 1"""
        cursor.execute(postgreSQL_select_Query)
        monitoriaquery = cursor.fetchone()

        postgres_insert_query = """ INSERT INTO "vaga_monitoria"(professor_requisitante, id_monitoria, codigo_disciplina, aprovado, pre_requisito) VALUES (%s,%s,%s,%s,%s)"""
        record_to_insert = ( monitoriaquery[2], monitoriaquery[0], monitoriaquery[1], APROVADO, PREREQUISITO)
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