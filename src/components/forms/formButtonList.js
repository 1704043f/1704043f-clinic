import React, { Component } from 'react'
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Header, Card, CardSection, Input, Button } from './common';
import { Text } from 'react-native';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';
import DoneIcon from '@material-ui/icons/Done';


class ButtonList extends Component {
    renderButtonList(field) {
        console.log("Field in button list : ", field)
        const { input: { value, onChange }, items, question, classes, meta: { pristine, touched, error } } = field
        return (
            <Card>
                <Header title='Diary' />
                {items.map((item, index) => {
                    return (
                        <Card>
                            <Button key={item.label} variant="contained" type="button" className={index === 0 ? classes.button0 : [index === 1 ? classes.button1 : [index === 2 ? classes.button2 : [index === 3 ? classes.button3 : index === 4 ? classes.button4 : null]]]} onClick={() => onChange(item.value)}>{item.label}</Button>
                            {value === item.value ? <DoneIcon /> : null}
                        </Card>

                    )
                })
                }
            </Card>
        )
    }

    render() {
        const { classes, items, name, hints, index } = this.props;
        return <Field question={name} name={index} items={items} hints={hints} component={this.renderButtonList} />
    }
}
ButtonList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ButtonList);