from datetime import date
from tokenize import Number
from xmlrpc.client import DateTime
from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: str
    firstName: str
    lastName: str
    email: str
    age: str
    gender: str    
    cash_balance: int

class Login(BaseModel):
    email: str  
    password: str

class Register(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str
    age: str
    gender: str   
    cash_balance: int

class Update(BaseModel):  
    cash_balance: int

class TokenData(BaseModel):
    username: Optional[str] = None

class SpinRecord(BaseModel):
    email: str
    result: str
    amount: int
    date: str