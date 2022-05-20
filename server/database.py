import json
import os

"""
json db format:
{
    "incidents": [
        "<phone_hash>": [<incidents_data>]   // right now the incidents are: {"severity": <0-1 flat> 
    ],
    "users": [
        {
            "username": "",
            "hashed_password": "",
            "contact_info": {<contact_data>}, // right now the contact info is: {phone_hash: <phone_hash>}
        }
    ],
    "alerts": {
        "<phone_hash>": <num_of_alerts_raised> 
    }
}
"""

DB_DEFAULT_PATH = "database.json"

class JsonDB:

    def __init__(self, db_path: str = DB_DEFAULT_PATH):
        """
        Initialize the database.
        """
        self.path = db_path
        if os.path.exists(db_path):
            print("loading db from file: " + db_path)
            return 

        with open(db_path, 'w') as db_json_file:
            data = {
                "incidents": {},
                "users": [],
                "alerts": {}  
            }
            json.dump(data, db_json_file)
            print("initialized a new db at file: " + db_path)


    def add_incident(self, phone_hash: str, incident: dict):
        """
        Add an incident to the database.
        """
        with open(self.path, "r+") as db_json_file:
            data = json.load(db_json_file)
            saved_incidents = data['incidents']
            saved_attacker_incidents: list = saved_incidents.get(phone_hash)
            if not saved_attacker_incidents:
                saved_incidents[phone_hash] = [incident]
            else:
                saved_attacker_incidents.append(incident)
                saved_incidents[phone_hash] = saved_attacker_incidents # update data also

            db_json_file.seek(0)
            json.dump(data, db_json_file)



    def add_user(self, username: str, password: str, contact_info: dict):
        """
        Adding user to the database.
        """
        
        with open(self.path,'r+') as db_json_file:
            data = json.load(db_json_file)
            
            # Join new_data with file_data inside emp_details
            data["users"].append({ "username": username, "hashed_password": password, "contact_info": contact_info })
            
            # Sets file's current position at offset.
            db_json_file.seek(0)
            
            # convert back to json.
            json.dump(data, db_json_file)


    def get_incidents(self):
        """
        Get all incidents from the database.
        """
        with open(self.path, "r") as db_json_file:
            data = json.load(db_json_file)
            return data["incidents"]

    def set_alert_num(self, phone_hash: str, num: int):
        """
        Set the number of alerts for a phone hash.
        """
        with open(self.path, "r+") as db_json_file:
            data = json.load(db_json_file)
            data["alerts"][phone_hash] = num
            db_json_file.seek(0)
            json.dump(data, db_json_file)
    
    def get_alert_num(self, phone_hash: str):
        """
        Get the number of alerts for a phone hash.
        """
        with open(self.path, "r") as db_json_file:
            data = json.load(db_json_file)
            return data["alerts"].get(phone_hash) or 0

db = JsonDB()