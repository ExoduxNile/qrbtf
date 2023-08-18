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
                <div className="form-group mb-3">
                    <label className="text-white">Select File</label>
                    <input type="file" className="form-control" name="image" onChange={this.onFileChange} />
                </div>
                
                <div className="d-grid">
                   <button type="submit" className="btn btn-outline-primary" onClick={()=>this.onSubmit()}>Store</button>
                </div>
                
            </div>
        )
    }
}
 
export default ImageUpload;