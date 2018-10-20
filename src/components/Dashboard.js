import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Scene , Router, Actions, Stack } from 'react-native-router-flux';
import { Header, Card, CardSection, Input, Button } from './common';
import { Text, TouchableOpacity } from 'react-native';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import { fetchUserDetails } from '../actions/UserAction';
import { fetchPatientData } from '../actions/PatientAction';

class DashboardComponent extends Component {
    submit(values) {
        //console.log("props : " , this.props);
        console.log("Submitted values: ", values);
        let webURL = window.location.href;
        //console.log("URL : " + webURL);
        let episodeEntry, episode, patientDataID, entry, data = {};
        let objSubmit = {}
        objSubmit.data = [];
        objSubmit.valid = true;
        objSubmit.actual_datetime = moment().format();

        objSubmit.patient_comments = values.comment;
        let numQuestions = this.props.patientData.currentEpisode.num_questions;
        patientDataID = this.props.patientData.patientDataID;
        //console.log("num questions : ", numQuestions);
        for (let i = 0; i < numQuestions; i++) {
            data.question_number = i;
            data.question_answers = [];
            //console.log(data.question_number);
            for (let j = 0; j <= 4; j++) {

                data.question_number = Object.keys(values)[i];
                if (values[data.question_number] === j) {
                    data.question_answers.push(true);
                } else {
                    data.question_answers.push(false);
                }
            }
            objSubmit.data.push(data);
        }
        /* pull this from dataEntry
        _id, 
        day, 
        time, 
        scheduled_datetime, 


        */


        if (webURL.includes("/patient/history")) {
            episodeEntry = webURL.split('/patient/history/').pop();
            episode = episodeEntry.substr(0, episodeEntry.indexOf("/"));
            objSubmit.episode = episode;
            entry = episodeEntry.split('/').pop();
            objSubmit.record_number = entry
            objSubmit.late = true;
        } else {
            objSubmit.episode = this.props.patientData.episodes[this.props.patientData.episodes.length - 1];
            objSubmit.late = false;
            objSubmit.record_number = this.props.patientData.closest.record_number;
            objSubmit._id = this.props.patientData.closest._id;
            objSubmit.scheduled_datetime = this.props.patientData.closest.scheduled_datetime;


        }
        //console.log("episode and entry = ", episode, entry);
        this.props.submitForm(patientDataID, objSubmit);
        /*
        record_number: { type: Number, required: [true, "No record number"] },
    valid: { type: Boolean, default: false },
    day: { type: Number, required: [true, "No record day"] },
    time: { type: String, required: [true, "No record time"] },

    scheduled_datetime:  {type: Date, required: true},
    actual_datetime: Date,

    medication_adherance: { type: String, enum: ["yes", "no", "no meds", "unanswered", "not asked"] },

    data: [{
        question_number: Number,
        question_answers: [{type: Boolean }]
    }],
    late: {type: Boolean, default: false},
    patient_comments: String
        */


    }
    componentDidMount() {
        //console.log("fetching user details...", this.props);
        const { sub } = this.props.auth;
        { sub ? this.props.fetchUserDetails(sub): null };
        { this.props.fetchPatientData() };
        //this.props.fetchPatientData();
    }
    renderQuestion = () => {
        let arrQuestions = this.props.patientData.currentEpisode ? this.props.patientData.currentEpisode.questions : null 
        return arrQuestions.map((item, index) => {
            console.log(item);
            const radioItems = [];
            let objRadioItems = {};
            item.answers.map((answer, i) => {
                console.log(answer);
                objRadioItems = {};
                objRadioItems.value = i;
                objRadioItems.label = answer;
                radioItems.push(objRadioItems);
                console.log(radioItems);
            })
            return (
                <Card>
                    <FormButtonList
                        hints={item.hints}
                        items={radioItems}
                        name={item.question}
                        index={index}

                    />
                </Card>

            )
        });
    }
    render(){
        const { handleSubmit, classes, pristine, submitting } = this.props;
        //console.log("Props in dashboard : ", this.props.patientData.closest);
        return (
            <Card>
                <Header title='Diary' />

                <CardSection>
                    <Text>
                       Entry for DATE TIME 
                    </Text>
                </CardSection>
                
                    <CardSection>
                        <Text>
                            {this.props.arrQuestions ? this.renderQuestion() : null }
                        </Text>
                    </CardSection>
                    <CardSection>
                        <Input
                            placeholder='enter comment here..'
                            name='comment'
                            label='comment'
                            value=''
                            secureTextEntry={false}
                        />
                    </CardSection>
                    <CardSection>
                    <TouchableOpacity onPress={handleSubmit(this.submit.bind(this))}>
                        <Text>Submit!</Text>
                    </TouchableOpacity>
                    </CardSection>
                
            </Card>
        )
    }
}


function validate(values) {
    console.log("Error values: ", values)
    const errors = {};
    if (!values.id) {
        errors.id = "error!";   // message to be displayed if invalid
    }
    return errors;
}
const  mapStatsToProps = state => {
    //console.log("state in Dashboard :", state);
    return (state);
}

export default reduxForm({
    validate,
    form: 'PatientQuestionnaire',
})(connect(mapStatsToProps, { fetchUserDetails, fetchPatientData })(DashboardComponent));