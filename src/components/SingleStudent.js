import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchSingleStudent, selectStudent, stuIsLoading } from "../store/studentsSlice";
import { updateStudent } from "../store/studentsSlice";


const SingleStudent = () => {
    const dispatch = useDispatch()
    // captures id of current url
    const { stuId } = useParams()

    // state for form
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [image, setImage] = useState('')
    const [email, setEmail] = useState('')
    const [gpa, setGpa] = useState(0)

    // dispatching triggering thunk
    useEffect(() => {
        dispatch(fetchSingleStudent(stuId))
    }, [dispatch, singleStudent])

    // retrieves loading state and current student 
    const stuLoading = useSelector(stuIsLoading)
    const singleStudent = useSelector(selectStudent)


    const campus = singleStudent.campus
    const student = singleStudent.student

    // updating the students information
    async function update(x) {
        x.preventDefault()
        dispatch(updateStudent({
            stuId,
            firstName,
            lastName,
            email,
            image,
            gpa
        }))

    }

    return (
        <>
            {/* checks if the state is still loading and that the student is in state if so render info */}
            {!stuLoading && student !== undefined ?
                <div className="singleStudentView">
                    <div className="singleStudent">
                        <h2 className="studentName">{student.firstName} {student.lastName}</h2>
                        <img className="studentImg" src={student.imageUrl} />
                        <h3 className="studentEmail" >{student.email}</h3>
                        <h2 className="studentGpa" >{student.gpa} GPA</h2>
                        {student.CampusId === null ? <h2>This student does not have a campus</h2> : <Link className="campuslink" to={`/campuses/${campus.id}`}><h3 classNaem="campuslink">Campus: {campus.name}</h3></Link>}
                    </div>

                    {/* update form */}
                    <form className="updateStudentForm" onSubmit={(x) => update(x)}>
                        <label htmlFor="firstName">First Name</label>
                        <input name="firstName" value={firstName} onChange={(ch) => setFirstName(ch.target.value)}></input>
                        <label htmlFor="lastName" >Last Name</label>
                        <input name="lastName" value={lastName} onChange={(ch) => setLastName(ch.target.value)}></input>
                        <label htmlFor="email">Email</label>
                        <input name="email" value={email} onChange={(ch) => setEmail(ch.target.value)}></input>
                        <label htmlFor="image">Image Url</label>
                        <input name="image" value={image} onChange={(ch) => setImage(ch.target.value)}></input>
                        <label htmlFor="gpa">GPA</label>
                        <input name="gpa" value={gpa} onChange={(ch) => setGpa(ch.target.value)}></input>
                        <button type='submit'>Update Student</button>
                    </form>
                </div>
                : null}
        </>
    )
}



export default SingleStudent