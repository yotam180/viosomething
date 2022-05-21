from database import db
import math

def sum_total_incidents(phone_hash: str):
    """
    Sum the total incidents of a phone hash.
    """

    incidents = db.get_incidents()
    total_incidents = 0
    n = len(incidents[phone_hash])
    #total_incidents = sum([i['severity'] for i in incidents[phone_hash]])
    for incident in incidents[phone_hash]:
        total_incidents += incident['severity']
    m = total_incidents / n
    permute = lambda k: (math.factorial(n)) / (math.factorial(k) * math.factorial(n-k))

    subsections = sum([permute(i)*(m**i)*((-1)**(i)) for i in range(2, n+1)])
    #print([total_incidents] + [permute(i)*(m**i)*((-1)**(i+1)) for i in range(2, n+1)])

    return total_incidents - subsections


def analyze(phone_hash: str):
    """
    Analyze the new incident and return the result.
    """
    attacker_alarm_count = db.get_alert_num(phone_hash)
    alarm_threshold = 0.9 #threshold is static, can be derived from user settings
    p = sum_total_incidents(phone_hash)
    if p > alarm_threshold:
        print(f"Alert! User:{phone_hash} violated with probabilty:{p}") 
        db.set_alert_num(phone_hash, attacker_alarm_count + 1) #add alert to dataset, user will read and get notified


    