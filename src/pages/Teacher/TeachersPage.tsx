import React, { useEffect, useState } from 'react';
import BASE_URL from "../../config/ApiConfig";
import axios, { AxiosResponse } from "axios";
import Person from "../../models/Person";
import { useHistory } from "react-router-dom";
import BoxedPage from "../../components/common/BoxedPage";
import PersonCard from "../../components/UICards/PersonCard";
import { Button } from "primereact/button";
import CreatePersonModal from "../../components/modal/CreatePersonModal";
import PersonCreate from "../../models/PersonCreateDTO";
import Alert from '../../components/common/Alert';

const TeachersPage = () => {
    const [teachers, setTeachers] = useState<Person[]>([]);
    let history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        // fetch all teachers
        axios.get(`${BASE_URL}/teacher`)
            .then((res: AxiosResponse<Person[]>) => {
                setTeachers(res.data);
            })
            .catch(err => console.log(err));
    });

    function toDetails(id: number) {
        history.push(`teachers/${id}`);
    }

    function createTeacher(data: PersonCreate) {
        axios.post(`${BASE_URL}/teacher`, data)
            .then((res) => {
                setTeachers([...teachers, res.data]);
                setIsModalOpen(false);
            }).catch(err => console.log(err));
    }

    return (
        <BoxedPage>
            <div className={"mb-2 container"}>
                <div className={" row justify-content-between"}>
                    <h2 className={""}>Teachers</h2>
                    <Button onClick={() => setIsModalOpen(true)} label="Create" icon="pi pi-plus-circle"
                        className="p-button-primary p-button" iconPos="right" />
                </div>

                <CreatePersonModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}
                    onModalSubmit={(data: PersonCreate) => createTeacher(data)} />
            </div>
            {teachers.length > 0 ? <>{teachers.map((teacher: Person) => {
                return <div key={teacher.id}>
                    <PersonCard person={teacher} actionButton={{
                        click: toDetails,
                        label: 'Details',
                        icon: 'pi pi-arrow-circle-right',
                        className: 'p-button-info'
                    }} /></div>
            })}</> :
                <Alert message="no teachers" />
            }


        </BoxedPage>
    );
}


export default TeachersPage;
