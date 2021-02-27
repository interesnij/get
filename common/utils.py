import re
MOBILE_AGENT_RE = re.compile(r".*(iphone|mobile|androidtouch)",re.IGNORECASE)


def try_except(value):
    try:
        if value:
            return True
    except:
        return False

def get_small_template(template, user_agent):
    if MOBILE_AGENT_RE.match(user_agent):
        template_name = template_name
    else:
        template_name = template_name
    return template_name
