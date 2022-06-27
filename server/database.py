import motor.motor_asyncio
from model import User, SpinRecord
import json
from bson import json_util
from bson.objectid import ObjectId

client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://vlql:LVoHnIutdgZs3pZl@cluster0.hzb03.mongodb.net/?retryWrites=true&w=majority")

db = client.myDB
collection = db.myCollection

async def fetch_all_users():
    print(collection)
    users = []
    cursor = collection.find({})
    async for document in cursor:
        users.append(User(**document))
    return users

async def create_user(user):
    document = user
    result = await collection.insert_one(document)
    return document


async def update_user(id, newValues):
    print(newValues)
    await collection.update_one({"_id": ObjectId(id)}, {"$set": {"cash_balance": newValues}})
    document = await collection.find_one({"_id": ObjectId(id)})
    return document

async def check_user_balance(id):
    document = await collection.find_one({"_id": ObjectId(id)})
    return json.loads(json_util.dumps(document))
    return document

async def fetch_one_user(email):
    document = await collection.find_one({"email": email})
    return json.loads(json_util.dumps(document))
    return document


async def delete_user(email):
    document = await collection.delete_one({"email": email})
    return document

spinCollection = db.spinCollection

async def insert_spin_record(spinInfo):
    document = spinInfo
    result = await spinCollection.insert_one(document)
    return document

async def get_all_userSpinRecord(email):
    spins = []
    cursor = spinCollection.find({"email": email})
    async for document in cursor:
        spins.append(SpinRecord(**document))    
    return spins