from database import db

def sum_total_incidents(phone_hash: str):
    """
    Sum the total incidents of a phone hash.
    """

    incidents = db.get_incidents()
    total_incidents = 0
    for incident in incidents[phone_hash]:
        total_incidents += incident['severity']
    return total_incidents


def analyze(phone_hash: dict):
    """
    Analyze the new incident and return the result.
    """
    attacker_alarm_count = db.get_alert_num(phone_hash)
    alarm_threshold = 10 * (attacker_alarm_count + 1)

    if sum_total_incidents(phone_hash) > alarm_threshold:
        print("Alert!" + phone_hash)
        db.set_alert_num(phone_hash, attacker_alarm_count + 1)


    