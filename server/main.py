from numpy import insert
from hashing import Hash
from oauth import get_current_user
from jwttoken import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI, HTTPException
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from model import User, Login, Register, Update, SpinRecord
import uvicorn

from database import (
    create_user,
    fetch_all_users,
    update_user,
    fetch_one_user,
    delete_user,
    check_user_balance,
    insert_spin_record,
    get_all_userSpinRecord
)
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost",
    "https://valerian-low.com"
]
#app.add_middleware(uvicorn.middleware.proxy_headers.ProxyHeadersMiddleware, trusted_hosts="*")
#app.add_middleware(HTTPSRedirectMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get("/api/user")
async def get_user():
    response = await fetch_all_users()
    return response


@app.post("/api/user/register/", response_model=Register)
async def post_user(userInfo: Register):
    userDetails = userInfo.dict()
    userDetails['password'] = Hash.bcrypt(userDetails['password'])
    response = await create_user(userDetails)
    if response:
        return response
    raise HTTPException(400, "Something went wrong")


@app.post("/api/user/login/", response_model=User)
async def post_loginInfo(userInfo: Login):
    response = await fetch_one_user(userInfo.email)
    if not response:
        raise HTTPException(404, f"There is no such user")
    if not Hash.verify(response["password"], userInfo.password):
        raise HTTPException(404, f"Wrong password")
    access_token = create_access_token(data={"sub": response["_id"]['$oid'] })
    #response["accessToken"] = access_token
    #response["token_type"] = "bearer"
    print(response)
    response["id"] = response["_id"]['$oid']
    print(response["id"])
    print(response)
    return response
    


@app.put("/api/user/{id}/", response_model=Update)
async def put_user(id, newValues: Update):
    response = await update_user(id, newValues.cash_balance)
    if response:
        return response
    raise HTTPException(404, f"There is no such user")


@app.post("/api/user/{id}", response_model=User)
async def get_user_by_id(id):
    response = await check_user_balance(id)
    response["id"] = response["_id"]['$oid']
    if response:
        return response
    raise HTTPException(404, f"There is no such user")


@app.delete("/api/user/{id}")
async def delete_user(id):
    response = await delete_user(id)
    if response:
        return "Successfully deleted user"
    raise HTTPException(404, f"There is no user with the email {id}")

#Spin DB

@app.post("/api/spinResults/insert/", response_model=SpinRecord)
async def post_spin_record(spinInfo: SpinRecord):
    spinDetails = spinInfo.dict()
    print(spinDetails)
    response = await insert_spin_record(spinDetails)
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.post("/api/spinResults/")
async def get_user_by_email(userInfo: User):
    email = userInfo.dict()["email"]
    response = await get_all_userSpinRecord(email)
    if response:
        return response
    raise HTTPException(404, f"There is no such user")

if __name__ == '__main__':
    uvicorn.run("main:app",
                host="0.0.0.0",
                port=8000,
                #ssl_keyfile="./mykey.pem", 
                #ssl_certfile="./mycert.pem"
                )

