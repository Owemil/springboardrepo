from flask import Flask, request, flash, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

responses = []
title=satisfaction_survey.title
instructions=satisfaction_survey.instructions
questions=satisfaction_survey.questions
length = range(len(questions))
curr_q_num = 0

@app.route('/')
def survey_home():
    """ home page for survey"""
    return render_template('start.html', title=title, instructions=instructions, questions=questions, length=length)

@app.route('/questions/<int:q_num>')
def question_home(q_num):
    """the main page for questions"""
    global curr_q_num
    """url check for invalid questions"""
    if len(questions) < q_num:
        curr_q_num -= 1
        flash('Please do the survey in order')
        return redirect(f'/questions/{curr_q_num}') 
    curr_q_num += 1
    """error try for when completing the survey"""
    try:
        question = questions[q_num].question
        choices = questions[q_num].choices
        allow_text = questions[q_num].allow_text
    except IndexError:
        return redirect('/thanks')
    return render_template('questions.html', question=question, q_num=q_num, choices=choices, allow_text=allow_text)

@app.route('/answer', methods=['POST'])
def answer():
    """answer post route for getting and compiling answers"""
    answer = request.form['answer']
    responses.append(answer)
    return redirect(f'/questions/{curr_q_num}')

@app.route('/thanks')
def thanks():
    """thank you page for after survey(s)"""
    return render_template('thanks.html')