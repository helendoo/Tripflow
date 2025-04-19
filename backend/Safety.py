from flask import Flask, jsonify, request
from flask_cors import CORS
import requests



 # ------- THERE IS NO FREE API TO FETCH FROM, WHEN MAKE MONEY --> BUY API -----------#
app = Flask(__name__)
CORS(app)

@app.route('/api/safety')
def get_safety_data():
    country_code = request.args.get('countryCode')
    print("Fetching safety data for:", country_code)

    try:
        url = "https://restcountries.com/v3.1/alpha/{countryCode}"
        response = requests.get(url, verify=False)
        print("Raw response status code:", response.status_code)

        if response.status_code != 200:
            return jsonify({"error": "Upstream API error"}), 500

        data = response.json()
        info = data["data"].get(country_code)

        if not info:
            return jsonify({"error": f"No safety info for {country_code}"}), 404

        advisory = info.get("advisory", {})

        return jsonify({
            "message": advisory.get("message", "No message available"),
            "score": advisory.get("score", "N/A"),
            "source": advisory.get("source", "#")
        })

    except Exception as e:
        print("Error fetching or parsing data:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
