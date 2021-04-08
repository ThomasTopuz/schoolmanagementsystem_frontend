import React, {isValidElement, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Calendar} from 'primereact/calendar';
import Person from "../models/Person";
import {Button} from "primereact/button";
import axios from "axios";

interface props {
    onClose: Function,
    isOpen: boolean,
    onModalSubmit: Function
}

type formInput = {
    name: string,
    surname: string,
    email: string,
    dob: any
}

const CreatePersonModal: React.FC<props> = ({onClose, isOpen, onModalSubmit}) => {
    const methods = useForm<formInput>();
    const {handleSubmit, register, control, formState: {errors}} = methods;
    const onSubmit = (data: formInput) => {
        data.dob = getFormattedDate(data.dob);
        onModalSubmit(data);
    };


    return (
        <Dialog className="w-50" header="Create new teacher" visible={isOpen} style={{width: '35vw'}}
                onHide={() => onClose()}>
            <div className="">
                <h5>
                    Fill the form
                </h5>
            </div>
            <div className="mr-2 container">
                <div className={"row"}>
                    <div className="mb-2 col-sm-12 col-md-6 p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{required: true, minLength: 3, maxLength: 255}}
                            render={({field}) => <InputText {...field} inputRef={register("name")} name={"name"}
                                                            placeholder="Name"/>}
                        />
                    </div>
                    <div className="mb-2 col-sm-12 col-md-6 p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                        <Controller
                            name="surname"
                            control={control}
                            defaultValue=""
                            rules={{required: true, minLength: 3, maxLength: 255}}
                            render={({field}) => <InputText {...field} name={"surname"} placeholder="Surname"/>}/>
                    </div>
                    <div className="mb-2 col-12 p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-globe"></i>
                            </span>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{required: true, minLength: 3, maxLength: 255}}
                            render={({field}) => <InputText {...field} name={"email"} placeholder="Email"/>}/>
                    </div>
                    <div className="mb-2 col-12 p-inputgroup">
                        <span className="p-inputgroup-addon">
                                <i className="pi pi-calendar"></i>
                            </span>
                        <Controller
                            name="dob"
                            control={control}
                            defaultValue=""
                            rules={{required: true, valueAsDate: true}}
                            render={({field}) => <Calendar {...field} name={"dob"} placeholder={"Date of birth"}
                                                           id="navigators" monthNavigator
                                                           yearNavigator yearRange="1900:2021"/>}/>
                    </div>
                </div>

            </div>
            <Button onClick={handleSubmit(onSubmit)} className="p-button-primary float-right" type="button">
                Submit
            </Button>
        </Dialog>);
}

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
}

export default CreatePersonModal;
