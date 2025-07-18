from flask import Flask, render_template, request
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/calibrate')
def calibrate():
    mood = request.args.get('mood', '')
    return render_template('calibrate.html', mood=mood)

@app.route('/session')
def session():
    return render_template('session.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 