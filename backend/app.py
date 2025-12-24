from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2

app = Flask(__name__)

def get_connection():
    return psycopg2.connect(
        host="127.0.0.1",
        database="usersdb",
        user="postgres",
        password="postgres",
        port=5433   # IMPORTANT
    )

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "Backend running"}), 200

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    hashed_password = generate_password_hash(password)

    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO users (email, password) VALUES (%s, %s)",
            (email, hashed_password)
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "User registered successfully"}), 201

    except psycopg2.IntegrityError:
        return jsonify({"error": "User already exists"}), 409

    except Exception as e:
        print("Signup error:", e)
        return jsonify({"error": "Internal server error"}), 500

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT password FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if not check_password_hash(user[0], password):
        return jsonify({"error": "Invalid password"}), 401

    return jsonify({"message": "Login successful"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
