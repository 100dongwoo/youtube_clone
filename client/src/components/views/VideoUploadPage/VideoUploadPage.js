import React, {useState} from "react";
import {Typography, Button, Form, message, Input, Icon} from 'antd'
import Dropzone from "react-dropzone";
import Axios from "axios";

import {useSelector} from "react-redux"; //react-hook


const {TextArea} = Input
const {Title} = Typography;


const PrivateOptions = [
    {value: 0, label: "private"},
    {value: 1, label: "public"}
]

const CategoryOption = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehciles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animal"}
]


function VideoUploadPage(props) {
    const user = useSelector(state => state.user) //유저에 모든정보가  contst user에 담긴다
    const [VideoTitle, setVideostate] = useState("") //reactHook 기능
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState((0))
//private 1 public 0 ..
    const [Category, setCategory] = useState("Film&Animation")

    const [FilePath, setFilePath] = useState("");////////////////////////////////////
    const [Duration, setDuration] = useState("");
    const [ThunmbnailPath, setThunmbnailPath] = useState("");


    const onTitleChange = (e) => {  //onchage설정을안하면 input들에 키보드이벤트 사용이 불가능
        setVideostate(e.currentTarget.value)
    }
    const onDescription = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'con tent-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)

                    let variable = {
                        url: response.data.url,
                        fileName: response.data.fileName
                    }

/////////////////////////////////////////////////////////////////////////////////////////
                   setFilePath(response.data.url);


                    Axios.post('/api/video/thumbnail', variable)

                        .then(response => {
                                if (response.data.success) {

                                    console.log((response.data))
                                    setDuration(response.data.fileDuration)////
                                    setThunmbnailPath(response.data.url)

                                    //라우터를 만들어야한다 아래
                                    console.log(response.data)
                                } else {
                                    alert("썸네일생성실패")
                                }
                            }
                        )


/////////////////////////////////////////////////////////////////////////////////////////


                } else
                    alert('업로드실패')
            })
    }


    const onSubmit = (e) => {
        e.preventDefault();//클릭하려했던걸들을 방지

        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
             filePath: FilePath,
            category: Category,
             duration: Duration,
             thembnail: ThunmbnailPath
        }

        Axios.post('/api/video/uploadVideo', variables)
            .then(response => {  //req보내면 res을 받는다
                if (response.data.success) {
                    console.log(response.data)
                    message.success('성공적으로 업로드하였다')

                    setTimeout(() => {
                        props.history.push('/')
                    }, 3000)



                } else {

                    alert("비 디 오 업 로 드 실 패")
                }
            })  //이런형식의 axios를하고나선 라우터를 만들어야한다다
        // 서버 안에있는 라우터
    }


    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>Upload Video</Title>

            </div>

            <Form onSubmit={onSubmit}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {/*드랍존 (DROP -ZONE)*/}
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={10000000000000}>


                        {({getRootProps, getInputProps}) => (
                            <div style={{
                                width: '300px', height: '240px', border: '1px solid lightgray',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}{...getRootProps()}>


                                <input {...getInputProps()}/>
                                <Icon type="plus" style={{fontSize: '3rem'}}/>
                            </div>
                        )}
                    </Dropzone>


                    {/*썸네일 (Thumnail)*/}

                 {ThunmbnailPath &&  //있을떄만 랜더링되라는뜻
                    <div>
                        <img src={`http://localhost:5000/${ThunmbnailPath}`} alt="thumbnail"/>
                    </div>

                    }

                    <div>
                        <img src alt/>
                    </div>
                </div>
                <br/>
                <br/>
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br/>
                <br/>
                <label>Description</label>
                <TextArea
                    onChange={onDescription}
                    value={Description}
                />

                <br/>
                <br/>

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}</option>))}

                    {/*<option key value></option> map사용으로 없앰}
                    {/*<option key value></option>*/}


                </select>
                <br/>
                <br/>
                <select onChange={onCategoryChange}>
                    {CategoryOption.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                    {/*<option key value></option>*/}
                </select>
                <br/>
                <br/>
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage
