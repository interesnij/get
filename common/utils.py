import re
MOBILE_AGENT_RE = re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)


def try_except(value):
    try:
        if value:
            return True
    except:
        return False

def get_small_template(template_name, user_agent):
    if MOBILE_AGENT_RE.match(user_agent):
        template_name = "mobile/" + template_name
    else:
        template_name = "mobile/" + template_name
    return template_name
