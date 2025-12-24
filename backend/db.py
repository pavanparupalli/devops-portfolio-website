import psycopg2

def get_connection():
    return psycopg2.connect(
        host="127.0.0.1",   # 🔥 IMPORTANT: force IPv4
        database="usersdb",
        user="postgres",
        password="postgres",
        port=5432
    )
