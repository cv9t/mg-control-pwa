import paho.mqtt.client as mqtt
import time
import random
from enum import Enum

class ControlCommand(Enum):
    LIGHT_ON = "light_on"
    LIGHT_OFF = "light off"

control_topic = "/isu/mg-control/devices/6440030a6661e89b4496461a/control"
data_topic = "/isu/mg-control/devices/6440030a6661e89b4496461a/data"

state = {"light_on": False}

def on_connect(client, data, flags, rc):
    global control_topic
    print(f"Connected with result code {rc}")
    client.subscribe(control_topic)

def on_message(client, data, msg):
    global state
    payload = msg.payload.decode("utf-8")
    if payload == ControlCommand.LIGHT_ON.value:
        state["light_on"] = True
    elif payload == ControlCommand.LIGHT_OFF.value:
        state["light_on"] = False

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("broker.hivemq.com")
client.loop_start()

while True:
    temperature = round(20 + random.uniform(-5, 5), 2)
    humidity_air = round(50 + random.uniform(-10, 10), 2)
    humidity_soil = round(40 + random.uniform(-5, 5), 2)
    is_light_on = str(state["light_on"]).lower()
    is_dry = str(humidity_soil > 40).lower()

    data = f'{{"air": {{"temp": {temperature}, "humidity": {humidity_air}}}, "soil": {{"isDry": {is_dry}}}, "isLightOn": {is_light_on}}}'

    client.publish(data_topic, data)
    time.sleep(2)
