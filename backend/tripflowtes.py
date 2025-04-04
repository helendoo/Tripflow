from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Simulated visa rules (FROM -> TO): status and message
visa_rules = {
    ("Sweden", "Japan"): "No visa required for short stays up to 90 days.",
    ("Sweden", "USA"): "ESTA required for tourism or business stays under 90 days.",
    ("USA", "Japan"): "Visa-free entry for 90 days.",
    ("India", "Germany"): "Schengen visa required before arrival.",
    ("France", "Thailand"): "Visa-free entry for up to 30 days.",
    ("Brazil", "Portugal"): "No visa required for up to 90 days.",
    ("UK", "Australia"): "Electronic Travel Authority (ETA) required before travel.",
    ("Canada", "USA"): "No visa needed for tourism, but ESTA may apply for flights.",
    ("Japan", "South Korea"): "Visa-free travel for 90 days.",
    ("Germany", "India"): "e-Tourist Visa must be obtained before travel."
}


@app.route('/api/info')
def get_info():
    from_country = request.args.get('from')
    to_country = request.args.get('to')
    info_type = request.args.get('type')

    if info_type == "visa":
        key = (from_country, to_country)
        message = visa_rules.get(key, f"No visa data available for travel from {from_country} to {to_country}.")
    else:
        message = f"{info_type.capitalize()} info is under construction."

    return jsonify({"message": message})

if __name__ == '__main__':
    app.run(debug=True)
