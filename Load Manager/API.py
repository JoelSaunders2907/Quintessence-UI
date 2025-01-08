from flask import Flask, request, jsonify
import pika
from icecream import ic

ic.enable()

app = Flask(__name__)

# RabbitMQ connection setup
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='task_queue', durable=True)

@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        # Extract message details from the request
        data = request.json
        process_name = data.get('ProcessName')
        context = data.get("Context")
        state = data.get('State')
        sender = data.get('Sender', 'Unknown Sender')

        # Validate required fields
        if not process_name or not state:
            return jsonify({"error": "ProcessName and State are required"}), 400

        # Construct the message
        message = f"{process_name};{context};{state};{sender}"
        
        # Send the message to RabbitMQ
        channel.basic_publish(
            exchange='',
            routing_key='task_queue',
            body=message,
            properties=pika.BasicProperties(delivery_mode=2)  # Make message persistent
        )
        ic(f"Message sent sucessfully: {message}")
        return jsonify({"message": "Message sent successfully", "content": message}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
