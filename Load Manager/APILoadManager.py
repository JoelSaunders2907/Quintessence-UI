import pika
import time
from DBConnector import ConnectToDB


from icecream import ic

cursor = ConnectToDB()

ic.enable()

# def callback(ch, method, properties, body):
#     print(f"Received: {body.decode()}")
#     time.sleep(0.5)  # Simulate processing time
#     # exec dbo.insert {data}
#     print(f"Processed: {body.decode()}")
#     ch.basic_ack(delivery_tag=method.delivery_tag)

# RabbitMQ setup
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='task_queue', durable=True)

print('Waiting for messages. To exit, press CTRL+C')

def process_messages():
    while True:
        method_frame, header_frame, body = channel.basic_get(queue='task_queue', auto_ack=False)
        if method_frame:
            try:
                decode_body = body.decode()
                str_body = decode_body.split(";")
                
                process = str_body[0]
                context = str_body[1]
                state = str_body[2]
                sender = str_body[3]

                ic(f"Process: {process} is {state}. Sent by {sender}")

                #print(f"Received message: {body.decode()}")
                #time.sleep(0.5)  # Simulate processing time
                ic('Executing instruction')
                #insert_command = "EXEC dbo.InsertLogRecord '" + process + "','" + "ValueDate:22 Nov 2024:DateTime" + "','" + state + "'"
                insert_command = "EXEC UI.InsertLogRecord '" + process + "','" + context + "','" + state + "'"
                ic(insert_command)
                cursor.execute(insert_command)
                cursor.commit()
                ic('Execution Complete')
                #print(f"Processed message: {body.decode()}")
                channel.basic_ack(delivery_tag=method_frame.delivery_tag)
            except:
                ic('insert failure')
                channel.basic_ack(delivery_tag=method_frame.delivery_tag)
        else:
            print("No messages in the queue. Waiting...")
            time.sleep(5)  # Wait before checking again

try:
    process_messages()
except KeyboardInterrupt:
    print("Exiting...")
finally:
    connection.close()
