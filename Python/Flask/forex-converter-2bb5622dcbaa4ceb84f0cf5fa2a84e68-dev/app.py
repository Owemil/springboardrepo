from flask import Flask, render_template, redirect,request
from babel import numbers
from helpers import code_check, conversion, forex_data

app=Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"


@app.route('/')
def forex_home():
    """
    home view for loading main conversion form
    """
    global forex_data
    forex_data.clear()
    return render_template('forexHome.html')

@app.route('/convert', methods=["GET","POST"])
def convert():
    """
    conversion view for sending and handling data routes to final results or back to main conversion form if improper codes are entered
    """
    global forex_data
    from_code = request.form['currcode1']
    to_code = request.form['currcode2']
    conv_amount = request.form['amount']
    forex_data.append(conv_amount)
    code_check(from_code)
    code_check(to_code)
    if len(forex_data) < 3:
        return redirect('/')
    else:
        return redirect('/answer')

@app.route('/answer')
def answer():
    """
    answer view handles final conversion and rendering answers
    """
    global forex_data
    data = conversion(forex_data)
    from_symbol = numbers.get_currency_symbol(data[0]['from'])
    to_symbol = numbers.get_currency_symbol(data[0]['to'])
    result = round(data[1], 2)

    return render_template('answer.html', from_code=data[0]['from'], to_code=data[0]['to'], amount=data[0]['amount'], result=result, from_symbol=from_symbol, to_symbol=to_symbol)


