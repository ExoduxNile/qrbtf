import React from 'react'
import axios from 'axios';
 
class ImageUpload extends React.Component{
 
    constructor(){
        super();
        this.state = {
            selectedImage: '',
        } 
        this.onFileChange = this.onFileChange.bind(this);
    }
 
    onFileChange(e) {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
 
        fileReader.onload = (event) => {
            this.setState({
                selectedImage: event.target.result,
            })
        }
    }
 
    onSubmit(){
        const formData = { image: this.state.selectedImage }
        let endpoint = "https://tnu.ozp.mybluehostin.me";
         axios.post(endpoint, formData, {
         }).then((res) => {
            console.log('File uploaded!');
        })
    }
 
    render(){
        return(
            <div>
                
                
            </div>
        )
    }
}
 
export default ImageUpload;