from database import db
from alert_manager import analyze


def add_fishy_incident(phone_hash: str, incident: float):
    db.add_incident(phone_hash, { "severity": incident })
    analyze(phone_hash)


def add_user(username: str, hashed_password: str, contact_info: dict):
    db.add_user(username, hashed_password, contact_info)
    


# # example usage
# add_fishy_incident("hash1", 0.1)
# add_fishy_incident("hash2", 0.3)
# [ add_fishy_incident("hash3", 0.5) for i in range(21)] # create an alarm

# add_user("user1", "hashed_password1", { "phone_hash": "hash1" })