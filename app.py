from flask import Flask, render_template, jsonify, request
from tree import TaskNode

app = Flask(__name__)

# Dummy data
root = TaskNode("GrowList")
log = TaskNode("Log Tasks")
log.add_child(TaskNode("Kumpulkan kayu"))
log.add_child(TaskNode("Potong batang"))
root.add_child(log)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/tasks")
def get_tasks():
    return jsonify(root.to_dict())

@app.route("/add-task", methods=["POST"])
def add_task():
    data = request.get_json()
    new_task = TaskNode(data["title"])
    root.add_child(new_task)
    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
